<template>
    <li
    >
    <app-drag :transferData="ingredientType" :draggable="computedCount < MAX_INGREDIENT_COUNT ">
        <div class="filling">
        <img :src="getImage(ingredientType.image)" :alt="ingredientType.name" />
        {{ ingredientType.name }}
      </div>
    </app-drag>
      

      <div class="counter counter--orange ingredients__counter" >
        <button
          type="button"
          class="counter__button counter__button--minus"
          :disabled="computedCount === 0"
          @click="decrement(ingredientType)"
  
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" :value="computedCount" @input="updateInput($event, ingredientType)"/>
        <button 
          type="button" class="counter__button counter__button--plus" 
          :disabled="computedCount === MAX_INGREDIENT_COUNT"
          @click="()=>increment(ingredientType)">
          <span class="visually-hidden">Больше</span>
        </button>
      </div>
    </li>
  
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AppDrag from '@/common/components/AppDrag.vue';
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

import { getImage } from '@/common/helpers/index.js';
const props = defineProps ({
    ingredientType: {
          type: Object,
          required: true,
      },
      ingredientsFilter: {
        type: Array
      }
  })
 const emits = defineEmits(['updateFilter']);

 const computedCount = computed(() => {

  const index = props.ingredientsFilter.findIndex(i => i.id === props.ingredientType.id);
  return ~index ? props.ingredientsFilter[index].count : 0;

 });
 console.log('dropp',computedCount > MAX_INGREDIENT_COUNT,computedCount.value ,MAX_INGREDIENT_COUNT)


  const updateInput =(e, ingredient)=> {

    let newCount = e.target.value.trim();
    let validate = Number.isNaN( Math.min(MAX_INGREDIENT_COUNT, Number(newCount)));

    if(!validate && Number(newCount) <= MAX_INGREDIENT_COUNT) {
      emits('updateFilter', {ingredient, count:  Math.min(MAX_INGREDIENT_COUNT, Number(newCount))})
    } else if (Number.isNaN(Number(newCount))) {
      console.log('not valid')
    } else if( Number(newCount) <= MAX_INGREDIENT_COUNT ) {
      console.log('not valid , max ingredients are 3')
    }
  }
  const increment =(ingredient)=> {
    emits('updateFilter', {ingredient, count: computedCount.value + 1});
  }

  const decrement =(ingredient)=>{
    emits('updateFilter', {ingredient, count: computedCount.value - 1})
  }

  // const onCount = (e) => console.log('count input ', e.target.value);

  // watch(computedCount, () => {
  //   count.value = computedCount.value;
  // })
</script>

<style>

</style>