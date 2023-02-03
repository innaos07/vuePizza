<template>
  <div class="content__constructor">
  <app-drop @drop="$emit('drop', $event)">
    <div class="pizza"
      :class="`pizza--foundation--${filterPizza.sizes}-${filterPizza.sauce}`">
      <div class="pizza__wrapper">
        <div 
          v-for="ingredient in filterPizza.ingredients" 
          :key="ingredient.id" 
          class="pizza__filling" 
          :class="[`pizza__filling--${ingredient.value}`,
              ingredient.count === TWO_INGREDIENTS && 'pizza__filling--second',
              ingredient.count === THREE_INGREDIENTS && 'pizza__filling--third']"></div>
      </div>
    </div>
  </app-drop>
  </div>
</template>

<script setup>
import AppDrop from '@/common/components/AppDrop.vue';
const TWO_INGREDIENTS = 2;
const THREE_INGREDIENTS = 3;

const props = defineProps ({
  filterPizza: {
        type: Object,
        required: true,
    }
})
defineEmits(['drop'])
</script>

<style>
</style>