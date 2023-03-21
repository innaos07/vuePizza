<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <constructor-dough
          v-model="doughId"
          :doughItems="dataStore.doughs"
       />
        
        <constructor-sizes
          v-model="sizeId"
          :sizesItems="dataStore.sizes"
        />
        

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <constructor-sauces
              v-model="sauceId"
                :saucesItems="dataStore.sauces"
              />
              

              <div class="ingredients__filling">
                <p>Начинка:</p>
                <constructor-ingredients
                  :ingredientsItems="dataStore.ingredients"
                  
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
            :pizzaStore="pizzaStore"
            @drop="pizzaStore.incrementIngredientQuantity"
          ></constructor-pizza>

          <div class="content__result">
            <p>Итого: {{ pizzaStore.totalCost }} ₽</p>
            <button 
              type="button" 
              class="button"  
              @click="addToCart"
              :disabled=" !pizzaStore.ingredients.length">
              Готовьте!
            </button>
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
import { useRouter } from "vue-router";
import { useDataStore, usePizzaStore, useCartStore } from '@/store';
const router = useRouter();
const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const name  = computed({
  get() {
    return pizzaStore.name;
  },
  set(value) {
    pizzaStore.setName(value)
  }
});

const doughId  = computed({
  get() {
    return pizzaStore.doughId;
  },
  set(value) {
    pizzaStore.setDough(value)
  }
});

const sizeId  = computed({
  get() {
    return pizzaStore.sizeId;
  },
  set(value) {
    pizzaStore.setSize(value)
  }
});

const sauceId  = computed({
  get() {
    return pizzaStore.sauceId;
  },
  set(value) {
    pizzaStore.setSauce(value)
  }
})

const addToCart = async()=> {
  cartStore.savePizza(pizzaStore.$state, pizzaStore.totalCost)
  await router.push({ name: "cart" });
  resetPizza()
}

const resetPizza =()=> {
  pizzaStore.setName(""),
  pizzaStore.setDough(dataStore.doughs[0].id),
  pizzaStore.setSauce(dataStore.sauces[0].id),
  pizzaStore.setSize(dataStore.sizes[0].id),
  pizzaStore.setIngredients([])
}
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