<template>
    <li
    >
      <div class="filling">
        <img :src="getImage(ingredientType.image)" :alt="ingredientType.name" />
        {{ ingredientType.name }}
      </div>

      <div class="counter counter--orange ingredients__counter" >
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="decrement(ingredientType)"
  
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" :value="count" @input="updateInput($event, ingredientType)"/>
        <button type="button" class="counter__button counter__button--plus" @click="()=>increment(ingredientType)">
          <span class="visually-hidden">Больше</span>
        </button>
      </div>
    </li>
  
</template>

<script setup>
import { ref, computed } from "vue";

import { getImage } from '@/common/helpers/index.js';
const props = defineProps ({
    ingredientType: {
          type: Object,
          required: true,
      },
     
  })
 const emits = defineEmits(['addIngredients', 'deleteIngredients', 'updateFilter']);

  const count = ref(0);

  const updateInput =(e, ingredient)=> {
    console.log(e, ingredient)
    let newCount = e.target.value.trim();
    if(!Number.isNaN(Number(newCount))) {
        count.value = +newCount;
        emits('updateFilter', {ingredient, count: count.value})
    } else if (Number.isNaN(Number(newCount))) {
        count.value = 0;
    }
  }

  const increment =(ingredient)=> {
    console.log(ingredient)
     count.value = count.value + 1;
     emits('updateFilter', {ingredient, count: count.value})
  }

  const decrement =(ingredient)=>{
    console.log(ingredient, 'decrement')
    count.value > 0 ?
    (count.value = count.value - 1, emits('updateFilter', {ingredient, count: count.value})
) 
    : false    
  }
</script>

<style>

</style>