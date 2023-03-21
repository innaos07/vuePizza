<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li class="additional-list__item sheet" v-for="product in dataStore.misc" :key="product.id">
        <p class="additional-list__description">
          <img
          :src="getImage(`${product.image}.svg`)"
            width="39"
            height="60"
            :alt="product.name"
          />
          <span>{{ product.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          
          <div class="additional-list__price">
            <b>× {{ product.price }} ₽</b>
          </div>

          <!-- <app-counter 
            :itemForCounter="product"  
            :computedCount="cartStore.computedCountForMisc"
            @setInput="cartStore.setInputForMisc"
            @setIncrement="cartStore.setIncrementForMisc"
            @setDecrement="cartStore.setDecrementForMisc">
        </app-counter> -->
        </div>
      </li>
      
    </ul>
  </div>
</template>
<script setup>
import { getImage } from "@/common/helpers/index.js";
import { useCartStore, useDataStore } from '@/store';

import AppCounter from '@/common/components/AppCounter.vue';
const cartStore = useCartStore();



const dataStore = useDataStore();

</script>