<template>
  <div class="app_layout">
    <default-header />
    <slot />
  </div>
</template>

<script setup>
import DefaultHeader from "./DefaultHeader.vue";
</script>

<style lang="scss" scoped>
.app_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>