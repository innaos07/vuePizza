<template>
  <ul class="ingredients__list">
    <constructor-ingredient-item v-for="ingredientType in ingredientsItems"
      :key="ingredientType.id"
      :ingredientType="ingredientType"
      :ingredientsFilter="ingredientsFilter"
      @update-filter="$emit('updateFilter', $event)"

      class="ingredients__item">
    </constructor-ingredient-item>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import { getImage } from '@/common/helpers/index.js';
import ConstructorIngredientItem from '@/modules/constructor/ConstructorIngredientItem.vue';

  const props = defineProps ({
      ingredientsItems: {
          type: Object,
          required: true,
      },
      ingredientsFilter: {
        type: Array,
        required: true,
      },
  })

 defineEmits(['addIngredients', 'deleteIngredient', 'updateFilter']);

</script>

<style>
</style>