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
    pizzaExtended: (state) => {
      const data = useDataStore();

      return state.pizzas.map((pizza) => {
        const pizzaIngredientsIds = pizza.ingredients.map(
          (i) => i.ingredientId
        );
        return {
          id: pizza.id,
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((i) => i.id === pizza.doughId),
          size: data.sizes.find((i) => i.id === pizza.sizeId),
          sauce: data.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: data.ingredients.filter((i) =>
            pizzaIngredientsIds.includes(i.id)
          ),
          price: pizza.price,
        };
      });
    },
    miscExtended: (state) => {
      const data = useDataStore();
      return data.misc.map((misc) => {
        return {
          ...misc,
          quantity: state.misc.find((i) => i.miscId === misc.id)?.quantity ?? 0,
        };
      });
    },
    totalCost: (state) => {
      let costPizzas = state.pizzas.reduce((sum, current) => {
        return (sum += current?.price * current.quantity);
      }, 0);
      const dataStore = useDataStore();
      const miscPrice = (ID) => {
        return dataStore.misc.find((i) => i.id === ID)?.price ?? 0;
      };
      let costMisc = state.misc.reduce((sum, current) => {
        return (sum += current?.quantity * miscPrice(current?.miscId));
      }, 0);

      return costPizzas + costMisc ?? 0;
    },
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
      console.log(orderInfo);
      this.phone = orderInfo?.tel;
      this.address.street = orderInfo?.street;
      this.address.building = orderInfo?.building;
      this.address.flat = orderInfo?.flat;
      this.address.comment = orderInfo?.comment;
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        count > 0
          ? (this.pizzas[index].quantity = count)
          : this.pizzas.splice(index, 1);
      }
    },
    addMisc(miscId, count) {
      this.misc.push({
        miscId,
        quantity: count,
      });
    },
    setMiscQuantity(miscId, count) {
      console.log("adf", miscId, count);
      const indexMisc = this.misc.findIndex((i) => i.miscId === miscId);
      ~indexMisc
        ? count > 0
          ? (this.misc[indexMisc].quantity = count)
          : this.misc.splice(indexMisc, 1)
        : count > 0
        ? this.addMisc(miscId, count)
        : false;
      console.log("mics", this.misc);
    },
    savePizza(pizza, price) {
      console.log("add pizza");
      const { index, ...pizzaData } = pizza;
      if (index !== null) {
        this.pizzas[index] = {
          quantity: this.pizzas[index].quantity,
          id: this.pizzas[index].id,
          price: price,
          ...pizzaData,
        };
      } else {
        this.pizzas.push({
          quantity: 1,
          id: this.pizzas.length + 1,
          price: price,
          ...pizzaData,
        });
      }

      console.log("save ", this.pizzas);
    },
  },
});
