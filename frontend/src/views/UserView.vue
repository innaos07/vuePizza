<template>
  <sidebar-layout>
    <template #sidebar>
      <router-link 
        class="layout__link" 
        :to="{name: 'order'}"
        :class="{'layout__link--active' : routeName === 'order' }"
        >
          История заказов
        </router-link
      >
      <router-link 
        class="layout__link" 
        :to="{name: 'profile'}"
        :class="{'layout__link--active' : routeName === 'profile' }"
        >
          Мои данные
      </router-link>
    </template>
    <router-view ></router-view>
  </sidebar-layout>
</template>

<script setup>
import SidebarLayout from "../layouts/SidebarLayout.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const routeName = computed(()=>route.name);

</script>

<style>
</style>