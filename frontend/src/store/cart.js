import { defineStore } from "pinia";
import { usePizzaStore } from "./pizza";
import { useDataStore } from "./data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    computedCount: (state) => {
      
      return (ID) => {
        console.log('cart id', ID)
       let index = state.pizzas.findIndex(i=> i.id === ID);
       console.log('index id', index)
       return state.pizzas[index]?.count ?? 1
      }
    }
  },
  actions: {
    setIncrement({ID, value}) {
      let index = this.pizzas.findIndex(item => item.id === ID)
      this.pizzas[index].count +=1;
     
      console.log('END INC', this.pizzas)
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
    addPizza() {
      console.log("add pizza");
      const pizzaStore = usePizzaStore();
      this.pizzas.push({
        id: this.pizzas.length + 1,
        name: pizzaStore.name.length ? pizzaStore.name : `my pizza №${this.pizzas.length + 1}`,
        doughId: pizzaStore.doughId,
        sizeId: pizzaStore.sizeId,
        ingredients: pizzaStore.ingredients,
        sauceId: pizzaStore.sauceId,
        cost: pizzaStore.totalCost,
        count: 1,
      });
      pizzaStore.doughId = 1;
      pizzaStore.sizeId = 1;
      pizzaStore.ingredients = [];
      pizzaStore.sauceId = 1;
    },
  },
});
