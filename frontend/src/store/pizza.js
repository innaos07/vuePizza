import { defineStore } from "pinia";

export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        index: null,
        name: '',
        doughId: 0,
        sizeId: 0,
        ingredients: [],
        sauceId: 0,
    }),
    getters: {},
    actions: {},
})