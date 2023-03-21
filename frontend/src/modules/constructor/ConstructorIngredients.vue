<template>
  <ul class="ingredients__list">
    <constructor-ingredient-item v-for="ingredientType in ingredientsItems"
      :key="ingredientType.id"
      :ingredientType="ingredientType"
      :values="pizzaStore.ingredientQuantities"

      class="ingredients__item">
    </constructor-ingredient-item>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import { getImage } from '@/common/helpers/index.js';
import ConstructorIngredientItem from '@/modules/constructor/ConstructorIngredientItem.vue';

import { usePizzaStore } from '@/store';
const pizzaStore = usePizzaStore();

  const props = defineProps ({
      ingredientsItems: {
          type: Object,
          required: true,
      },
  
  })


</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;
  img {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    padding: 4px;
    border-radius: 50%;
  }
}
</style>