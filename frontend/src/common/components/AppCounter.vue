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
   
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.counter__button {
  $el: &;
  $size_icon: 50%;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  &--minus {
    background-color: $purple-100;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $black;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }
    &:active:not(:disabled) {
      background-color: $purple-300;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      &::before {
        opacity: 0.1;
      }
    }
  }
  &--plus {
    background-color: $green-500;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $white;
    }
    &::after {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      transform: translate(-50%, -50%) rotate(90deg);
      border-radius: 2px;
      background-color: $white;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }
    &:active:not(:disabled) {
      background-color: $green-600;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  &--orange {
    background-color: $orange-200;
    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }
    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}
.counter__input {
  @include r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>