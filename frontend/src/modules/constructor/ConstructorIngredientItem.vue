<template>
    <li>
      <app-drag :transferData="ingredientType" :draggable="pizzaStore.computedCount(ingredientType.id) < MAX_INGREDIENT_COUNT ">
        <div class="filling">
        <img :src="getImage(ingredientType.image)" :alt="ingredientType.name" />
        {{ ingredientType.name }}
      </div>
    </app-drag>
    <app-counter
     :itemForCounter="ingredientType"
     :items="pizzaStore.ingredients"
     :computedCount="pizzaStore.computedCount"
     :MAX_INGREDIENT_COUNT="MAX_INGREDIENT_COUNT"
     @setInput="pizzaStore.setInput"
     @setIncrement="pizzaStore.setIncrement"
     @setDecrement="pizzaStore.setDecrement"
    >
    </app-counter>

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
  })

</script>

<style>

</style>