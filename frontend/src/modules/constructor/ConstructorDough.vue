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
          @change="$emit('update:modelValue', $event.target.value)"
          class="visually-hidden"
          checked
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
        type: Object,
        required: true,
    }
})
defineEmits(["update:modelValue"])
</script>

<style>
</style>