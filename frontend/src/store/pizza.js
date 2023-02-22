import { defineStore } from "pinia";
import { useDataStore } from "./data";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: null,
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
      return data.doughs.find(item => item.id === state.doughId) ?? data.doughs[0];
    },
    sauce: (state) => {
      const data = useDataStore();
      return data.sauces.find(item => item.id === state.sauceId) ?? data.sauces[0];
    },
    size: (state) => {
      const data = useDataStore();
      return data.sizes.find(item => item.id === state.sizeId) ?? data.sizes[0];
    },
    ingredientValue: (state) => {
      const data = useDataStore();
      return (ID)=> {
        return data.ingredients.find(item => item.id === ID)?.value ?? null
    };

    },
    totalCost: (state) => {
      const data = useDataStore();
      const { doughs, sizes, ingredients, sauces } = data;
      const sizeMultiplier = sizes.find((item) => item.id === state.sizeId)?.multiplier ?? 1;

      const soucePrice = sauces.find((item) => item.id === state.sauceId)?.price ?? 0;
      const doughPrice = doughs.find((item) => item.id === state.doughId)?.price ?? 0;

      const ingredientsPrice=(ID)=> {
        return ingredients.find(i=> i.id === ID)?.price ?? 0
      }
      const ingredientsTotalPrice = state.ingredients.reduce((sum, current) => {
        sum += current?.count * ingredientsPrice(current.ingredientId);
          return sum;
      }, 0);
      return (soucePrice  +  doughPrice + ingredientsTotalPrice) * sizeMultiplier;
    },
    computedCount: (state) => {
      return (ID) => {
       let index = state.ingredients.findIndex(i=> i.ingredientId === ID);
       return state.ingredients[index]?.count ?? 0
      }
    }
  },
  actions: {
    setIncrement({ID, value}) {
      console.log('setIncrement',ID, value)
      let index = this.ingredients.findIndex(item => item.ingredientId === ID)
      console.log('indez increment', index)
      ~index ?  this.ingredients[index].count = value
      : this.ingredients.push({ ingredientId: ID, count: 1 })

      console.log('END INC', this.ingredients)
    },
    setDecrement({ID, value}) {
      let index = this.ingredients.findIndex(item => item.ingredientId === ID)

      ~index ?  
      this.ingredients[index].count > 1 ? 
      this.ingredients[index].count = value 
      : this.ingredients.splice(index, 1) 
      : false 
            
      console.log('end dec', this.ingredients)

    },
    setInput({ID, value}) {
      let index = this.ingredients.findIndex(item => item.ingredientId === ID)
      
      ~index ?  value > 0 ? 
        this.ingredients[index].count = value
      : this.ingredients.splice(index, 1)
      :  value > 0 ? this.ingredients.push({ ingredientId: ID, count: value }) : false
      console.log('end dec', this.ingredients)
    },
    setDoughId(value) {
      const data = useDataStore();
      this.doughId= data.doughs.find(item=> item.value === value)?.id ?? data.doughs[0].id
    },
    setSizeId(value) {
      const data = useDataStore();
      this.sizeId= data.sizes.find(item=> item.value === value)?.id ?? data.sizes[0].id
    },
    setSauceId(value) {
      const data = useDataStore();
      this.sauceId= data.sauces.find(item=> item.value === value)?.id ?? data.sizes[0].id
    },
    updateDropIngredient(data) {
      console.log('datadrop', data)
        let index = this.ingredients.findIndex((i) => i.ingredientId === data.id) ;
      
        ~index
          ? this.ingredients[index].count += 1
          : this.ingredients.push({ ingredientId: data.id , count: 1 });
          console.log(this.ingredients)
    },
    changeOrder(pizza) {
      console.log('changeOrder',pizza)
      this.id = pizza.id;
      this.index = null;
      this.name = pizza.name;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.ingredients = pizza.ingredients;
      this.sauceId =  pizza.sauceId;
    },
  },
});
