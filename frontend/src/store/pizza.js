import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";
import { ingredientsQuantity } from "@/common/helpers/ingredientQuantity.js";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    doughId: 1,
    sizeId: 1,
    ingredients: [],
    sauceId: 1,
  }),
  getters: {
    dough: (state) => {
      const data = useDataStore();
      return (
        data.doughs.find((item) => item.id === state.doughId) ?? data.doughs[0]
      );
    },
    sauce: (state) => {
      const data = useDataStore();
      return (
        data.sauces.find((item) => item.id === state.sauceId) ?? data.sauces[0]
      );
    },
    size: (state) => {
      const data = useDataStore();
      return (
        data.sizes.find((item) => item.id === state.sizeId) ?? data.sizes[0]
      );
    },
    ingredientValue: (state) => {
      const data = useDataStore();
      return (ID) => {
        return data.ingredients.find((item) => item.id === ID)?.value ?? null;
      };
    },
    totalCost: (state) => {
      const data = useDataStore();
      const { doughs, sizes, ingredients, sauces } = data;
      const sizeMultiplier =
        sizes.find((item) => item.id === state.sizeId)?.multiplier ?? 1;

      const saucePrice =
        sauces.find((item) => item.id === state.sauceId)?.price ?? 0;
      const doughPrice =
        doughs.find((item) => item.id === state.doughId)?.price ?? 0;

      const ingredientsPrice = (ID) => {
        return ingredients.find((i) => i.id === ID)?.price ?? 0;
      };
      const ingredientsTotalPrice = state.ingredients.reduce((sum, current) => {
        sum += current?.quantity * ingredientsPrice(current.ingredientId);
        return sum;
      }, 0);
      return (saucePrice + doughPrice + ingredientsTotalPrice) * sizeMultiplier;
    },

    ingredientQuantities: (state) => {
      return ingredientsQuantity(state);
    },
  },
  actions: {
    setName(name) {
      this.name = name;
    },
    setDough(doughId) {
      this.doughId = doughId;
    },
    setSize(sizeId) {
      this.sizeId = sizeId;
    },
    setSauce(sauceId) {
      this.sauceId = sauceId;
    },
    setIngredients(ingredients) {
      this.ingredients = ingredients;
    },
    addIngredient(ingredientId, count) {
      this.ingredients.push({
        ingredientId,
        quantity: count,
      });
      console.log("add ing", this.ingredients);
    },
    setIngredientQuantity(ingredientId, count) {
      console.log("set quan", ingredientId, count);
      const indexIngredient = this.ingredients.findIndex(
        (i) => i.ingredientId === ingredientId
      );

      ~indexIngredient
        ? count > 0
          ? (this.ingredients[indexIngredient].quantity = count)
          : this.ingredients.splice(indexIngredient, 1)
        : count > 0
        ? this.addIngredient(ingredientId, count)
        : false;
      console.log("ing", this.ingredients);
    },
    incrementIngredientQuantity(data) {
      console.log("datadrop", data);
      let index = this.ingredients.findIndex((i) => i.ingredientId === data.id);

      ~index
        ? (this.ingredients[index].quantity += 1)
        : this.addIngredient(data.id);
      console.log(this.ingredients);
    },
    loadPizza(pizza) {
      console.log("load", pizza);

      this.index = pizza.index;
      this.name = pizza.name;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
      this.sauceId = pizza.sauceId;
    },
  },
});
