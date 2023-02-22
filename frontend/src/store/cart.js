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
       let index = state.pizzas.findIndex(i=> i.id === ID);
       return state.pizzas[index]?.count ?? 1
      }
    },
    computedCountForMisc: (state) => {
      return (ID) => {
       let index = state.misc.findIndex(i=> i.miscId === ID);
       return state.misc[index]?.count ?? 0
      }
    },
    
    totalCost: (state) => {
      let costPizzas = state.pizzas.reduce((sum,current)=> {
        return sum += current?.cost * current.count
      },0)
      const dataStore = useDataStore()
      const miscPrice=(ID)=> {
        return dataStore.misc.find(i=> i.id === ID)?.price ?? 0
      }
      let costMisc = state.misc.reduce((sum,current)=>{
       return sum += current?.count * miscPrice(current?.miscId)
      }, 0)
    
      return costPizzas + costMisc ?? 0
    }

  },
  actions: {
    // setPhone(value) {
    //   console.log(value)
    //   this.phone = value;
    // },
    // setAddressStreet(value) {
    //   this.address.street = value;
    // },
    setInfoAboutOrder(orderInfo) {
      console.log(orderInfo)
      this.phone = orderInfo?.tel;
      this.address.street = orderInfo?.street;
      this.address.building = orderInfo?.building;
      this.address.flat = orderInfo?.flat;
      this.address.comment = orderInfo?.comment;

    },
    setIncrement({ID, value}) {
      let index = this.pizzas.findIndex(item => item.id === ID)
      this.pizzas[index].count +=1;
    },
    setDecrement({ID, value}) {
      let index = this.pizzas.findIndex(item => item.id === ID)
      this.pizzas[index].count > 1 ? 
      this.pizzas[index].count -=1  
      : this.pizzas.splice(index, 1)
    },
    setInput({ID, value}) {
      console.log('setInput', value)
      let index = this.pizzas.findIndex(item => item.id === ID)
      
      value > 0 ? 
      this.pizzas[index].count = value
      :false
      
      console.log('end dec', this.pizzas)
    },
    setIncrementForMisc({ID, value}) {
      console.log(ID, value)
      let index = this.misc.findIndex(item => item.miscId === ID)
      console.log('misc misc', index)
      ~index ?  this.misc[index].count = value
      : this.misc.push({ miscId: ID, count: 1 })
     
      console.log('END INC', this.misc)
    },
    setDecrementForMisc({ID, value}) {
      let index = this.misc.findIndex(item => item.miscId === ID)

      ~index ?  
      this.misc[index].count > 1 ? 
      this.misc[index].count = value 
      : this.misc.splice(index, 1) 
      : false 
      console.log('END INC', this.miscId)
    },
    setInputForMisc({ID, value}) {
      let index = this.misc.findIndex(item => item.miscId === ID)
      
      ~index ?  value > 0 ? 
        this.misc[index].count = value
      : this.misc.splice(index, 1)
      :  value > 0 ? this.misc.push({ miscId: ID, count: value }) : false
      console.log('end dec', this.misc)
    },
    addPizza() {
      console.log("add pizza");
      const pizzaStore = usePizzaStore();
      let newPizza = {
        id: pizzaStore.id ? pizzaStore.id : null,
        name: pizzaStore.name.length ? pizzaStore.name : `my pizza №${this.pizzas.length + 1}`,
        doughId: pizzaStore.doughId,
        sizeId: pizzaStore.sizeId,
        ingredients: pizzaStore.ingredients,
        sauceId: pizzaStore.sauceId,
        cost: pizzaStore.totalCost,
        count: 1,
      }
      console.log(newPizza)

      let index = this.pizzas.findIndex(item => item.id === pizzaStore.id)
      console.log('index addPizza', index)
     ~index ? this.pizzas.splice(index, 1, newPizza )  : this.pizzas.push({ ...newPizza, id: this.pizzas.length + 1 })
      // this.pizzas.push({
      //   id: this.pizzas.length + 1,
      //   name: pizzaStore.name.length ? pizzaStore.name : `my pizza №${this.pizzas.length + 1}`,
      //   doughId: pizzaStore.doughId,
      //   sizeId: pizzaStore.sizeId,
      //   ingredients: pizzaStore.ingredients,
      //   sauceId: pizzaStore.sauceId,
      //   cost: pizzaStore.totalCost,
      //   count: 1,
      // });
      pizzaStore.id = null,
      pizzaStore.name = ""
      pizzaStore.doughId = 1;
      pizzaStore.sizeId = 1;
      pizzaStore.ingredients = [];
      pizzaStore.sauceId = 1;
    },
  },
});
