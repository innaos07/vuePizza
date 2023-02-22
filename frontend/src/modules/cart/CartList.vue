<template>
  <ul class="cart-list sheet" v-if="cartStore.pizzas.length">
    <li class="cart-list__item" v-for="pizza in cartStore.pizzas" :key="pizza.id">
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
            <li>{{pizzaSizes(pizza.sizeId)}}, {{ pizzaDough(pizza.sauceId) }}</li>
            <li>Соус: {{ pizzaSauce(pizza.sauceId) }}</li>
            <li>Начинка: <span v-for="ingredient in pizza.ingredients">{{ pizzaIngredients(ingredient.ingredientId) }},{{' '}}  </span> </li>
          </ul>
        </div>
      </div>

      <app-counter 
        :itemForCounter="pizza"  
        :computedCount="cartStore.computedCount"
        @setInput="cartStore.setInput"
        @setIncrement="cartStore.setIncrement"
        @setDecrement="cartStore.setDecrement">
      </app-counter>

      <div class="cart-list__price">
        <b>{{ pizza.cost }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit" @click="changePizza(pizza)">Изменить</button>
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


const pizzaSauce =(ID)=> {
 return dataStore.sauces.find(item=> item.id === ID)?.name.toLowerCase()
}

const pizzaSizes =(ID)=> {
  return dataStore.sizes.find(item=> item.id === ID)?.name.toLowerCase()
}

const pizzaDough =(ID)=> {
  return ID === 1 ? 'на тонком тесте' : 'на толстом тесте';
}

const pizzaIngredients =(ID)=> {
  return dataStore.ingredients.find(item =>  item.id === ID)?.name.toLowerCase()

}

const changePizza =(pizza)=> {
  pizzaStore.changeOrder(pizza)
  router.push('/')

}

</script>