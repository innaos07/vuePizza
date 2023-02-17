import { defineStore } from "pinia";
import {
    normalizeDough,
    normalizeIngredient,
    normalizeSauces,
    normalizeSize,
  } from "@/common/helpers/normalize";
  
  import saucesJSON from "@/mocks/sauces.json";
  import doughsJSON from "@/mocks/dough.json";
  import sizesJSON from "@/mocks/sizes.json";
  import ingredientsJSON from "@/mocks/ingredients.json";
  import miscJSON from '@/mocks/misc.json';

export const useDataStore = defineStore('data', {
    state: ()=> ({
        doughs: doughsJSON.map(normalizeDough),
        sizes: sizesJSON.map(normalizeSize),
        ingredients: ingredientsJSON.map(normalizeIngredient),
        sauces: saucesJSON.map(normalizeSauces),
        misc: miscJSON
    }),
    getters: {},
    actions: {},
})