<template>
  <ul class="cart-list sheet" v-if="cartStore.pizzas.length">
    <li class="cart-list__item" v-for="(pizza, i)  in cartStore.pizzaExtended" :key="pizza.id">
      <div class="product cart-list__product">
        <img
          :src="getImage('product.svg')"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>{{pizza.name}}</h2>
          <ul>
            <li>{{pizza.size.name.toLowerCase() }}, {{ pizza.dough.name.toLowerCase() }} тесто</li>
            <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
            <li>Начинка: {{ pizza.ingredients.map((i) => i.name.toLowerCase()).join(", ") }} </li>
          </ul>
        </div>
      </div>

      <app-counter
        :value="pizza.quantity"
        :max="10"
        accent
        @input="cartStore.setPizzaQuantity(i, $event)"
      />
      <div class="cart-list__price">
        <b>{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit" @click="editPizza(i)">Изменить</button>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { getImage } from "@/common/helpers/index.js";
import { useCartStore, useDataStore, usePizzaStore } from '@/store';
import AppCounter from '@/common/components/AppCounter.vue';
import { useRouter } from 'vue-router'


const dataStore = useDataStore();
const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const router = useRouter()

const editPizza = async (index)=> {
  pizzaStore.loadPizza({
    index,
    ...cartStore.pizzas[index]
  })
  await router.push('/')

}
</script>