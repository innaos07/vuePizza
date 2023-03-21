<template>
    <li>
      <app-drag :transferData="ingredientType" :draggable="values[ingredientType.id] < MAX_INGREDIENT_COUNT ">
        <div class="filling">
        <img :src="getImage(ingredientType.image)" :alt="ingredientType.name" />
        {{ ingredientType.name }}
      </div>
    </app-drag>
    <!-- <app-counter
     :itemForCounter="ingredientType"
     :items="pizzaStore.ingredients"
     :value="pizzaStore.ingredientQuantities[ingredientType.id]"
     :computedCount="pizzaStore.computedCount"
     :MAX_INGREDIENT_COUNT="MAX_INGREDIENT_COUNT"
     @setInput="pizzaStore.setInput"
     @setIncrement="pizzaStore.setIncrement"
     @setDecrement="pizzaStore.setDecrement"
     @update = "pizzaStore.setIngredientQuantity"
    > -->

    <!-- </app-counter> -->
    <app-counter
      :value="values[ingredientType.id]"
      :min="0"
      :max="MAX_INGREDIENT_COUNT"
    
     @input = "setValue(ingredientType.id, $event)"
    />

    </li>
  
</template>

<script setup>
import { computed } from "vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";
import AppDrag from '@/common/components/AppDrag.vue';
import AppCounter from '@/common/components/AppCounter.vue';
import { usePizzaStore } from '@/store';
import { getImage } from '@/common/helpers/index.js';
const pizzaStore = usePizzaStore();
const props = defineProps ({
    ingredientType: {
      type: Object,
      required: true,
    },
    values: {
       type: Object,
      required: true,
    }
  })
console.log(props.values)
const setValue =(ingredient, count)=> {
  console.log('set value', ingredient, count)
  pizzaStore.setIngredientQuantity(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)))
}
</script>

<style>

</style>