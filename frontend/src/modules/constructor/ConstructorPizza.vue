<template>
  <div class="content__constructor">
    <div class="pizza"
    :class="`pizza--foundation--${filterPizza.sizes[0]}-${filterPizza.sauce[0]}`">
      <div class="pizza__wrapper">
        <div v-for="ingredient in filterPizza.ingredients" :key="ingredient.id" 
        class="pizza__filling" :class="`pizza__filling--${ingredient.value}`"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps ({
  filterPizza: {
        type: Object,
        required: true,
    }
})
console.log(props.filterPizza)
</script>

<style>
</style>