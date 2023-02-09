<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <constructor-dough
          :doughItems="state.doughItems"
          v-model="state.filterPizza.dough"
        >
        </constructor-dough>

        <constructor-sizes
          :sizesItems="state.sizesItems"
          v-model="state.filterPizza.sizes"
        >
        </constructor-sizes>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <constructor-sauces
                :saucesItems="state.saucesItems"
                v-model="state.filterPizza.sauce"
              >
              </constructor-sauces>

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <constructor-ingredients
                  :ingredientsItems="state.ingredientsItems"
                  :ingredientsFilter="state.filterPizza.ingredients"
                  @update-filter="updateFilter"
                >
                </constructor-ingredients>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <constructor-pizza
            :filterPizza="state.filterPizza"
            @drop="updateDropIngredient"
          ></constructor-pizza>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from "vue";

import { getImage } from "@/common/helpers/index.js";
import ConstructorDough from "@/modules/constructor/ConstructorDough.vue";
import ConstructorSizes from "@/modules/constructor/ConstructorSizes.vue";
import ConstructorSauces from "@/modules/constructor/ConstructorSauces.vue";
import ConstructorIngredients from "@/modules/constructor/ConstructorIngredients.vue";
import ConstructorPizza from "@/modules/constructor/ConstructorPizza.vue";

import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

import sauces from "@/mocks/sauces.json";
import doughs from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import ingredients from "@/mocks/ingredients.json";

const state = reactive({
  doughItems: doughs.map(normalizeDough),
  saucesItems: sauces.map(normalizeSauces),
  sizesItems: sizes.map(normalizeSize),
  ingredientsItems: ingredients.map(normalizeIngredient),
  filterPizza: {
    sizes: "small",
    dough: "light",
    sauce: "tomato",
    ingredients: [],
  },
});

const updateDropIngredient = (transferData) => {
  console.log("click");
  let filterPizza = state.filterPizza.ingredients;
  let index = filterPizza.findIndex((i) => i.id === transferData.id);

  ~index
    ? filterPizza[index].id === transferData.id
      ? (filterPizza[index].count += 1)
      : false
    : filterPizza.push({ ...transferData, count: 1 });
};

const updateFilter = ({ ingredient, count }) => {
  console.log("count", count);
  let filterPizza = state.filterPizza.ingredients;

  let index = state.filterPizza.ingredients.findIndex(
    (i) => i.id === ingredient.id
  );

  ~index
    ? filterPizza[index].id === ingredient.id && count > 0
      ? (filterPizza[index].count = count)
      : filterPizza[index].id === ingredient.id && count == 0
      ? (filterPizza.splice(index, 1), console.log("cut", count))
      : false
    : count != 0
    ? filterPizza.push({ ...ingredient, count: count })
    : false;

  console.log(state.filterPizza.ingredients);
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  p {
    @include b-s24-h28;
    margin: 0;
  }
  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>