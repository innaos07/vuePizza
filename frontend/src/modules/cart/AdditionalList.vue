<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li class="additional-list__item sheet" v-for="misc in cartStore.miscExtended" :key="misc.id">
        <p class="additional-list__description">
          <img
          :src="getImage(`${misc.image}.svg`)"
            width="39"
            height="60"
            :alt="misc.name"
          />
          <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <app-counter 
            class="additional-list__counter"
            :value="misc.quantity"
            accent
            :max="100"
            @input="cartStore.setMiscQuantity(misc.id, $event)"
          />

          <div class="additional-list__price">
            <b>× {{ misc.price }} ₽</b>
          </div>
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