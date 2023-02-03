<template>
     <div class="sheet__content dough">
      <label
        v-for="doughType in doughItems"
        :key="doughType.id"
        class="dough__input"
      >
        <input
          type="radio"
          name="dought"
          :value="doughType.value"
          :checked="doughType.value === modelValue"
          @input="$emit('update:modelValue', doughType.value)"
          class="visually-hidden"
          
        />
        <img :src="getImage(doughType.image)" :alt="doughType.name" />
        <b>{{ doughType.name }}</b>
        <span>{{ doughType.description }}</span>
      </label>
    </div>
</template>

<script setup>
import { getImage } from '@/common/helpers/index.js';

defineProps ({
    doughItems: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: "",
  },
})
defineEmits(["update:modelValue"])
</script>

<style>
</style>