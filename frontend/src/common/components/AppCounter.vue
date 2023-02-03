<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="computedCount === 0"
      @click="decrement(ingredientType)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="computedCount"
      @input="updateInput($event, ingredientType)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="computedCount === MAX_INGREDIENT_COUNT"
      @click="() => increment(ingredientType)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
   
<script setup>
import { computed } from "vue";

import { MAX_INGREDIENT_COUNT } from "@/common/constants";

const props = defineProps ({
    ingredientType: {
          type: Object,
          required: true,
      },
      ingredientsFilter: {
        type: Array
      },
      computedCount: {
        type: Number,
      }
  })

const emits = defineEmits(['updateFilter']);

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
    console.log(props.computedCount)
  emits('updateFilter', {ingredient, count: props.computedCount + 1});
}

const decrement =(ingredient)=>{
  emits('updateFilter', {ingredient, count: props.computedCount - 1})
}

</script>
   
   <style>
</style>