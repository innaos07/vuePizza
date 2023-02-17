import { defineStore } from "pinia";
import { useDataStore } from "./data";

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

      const ingredientsPrice = state.ingredients.reduce((sum, current) => {
        sum += current?.count * current?.price;
          return sum;
      }, 0);
      console.log(soucePrice, doughPrice, sizeMultiplier)
      return (soucePrice  +  doughPrice) * sizeMultiplier;
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
    }
  },
});
