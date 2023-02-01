<template>
  <div class="sheet__content diameter">
    <label 
      v-for="sizeType in sizesItems" 
      :key="sizeType.id" 
      class="diameter__input"
      :class="`diameter__input--${sizeType.value}`"
      >
      <input 
        type="radio" 
        name="diameter" 
        :value="sizeType.value" 
        @change="$emit('update:modelValue', $event.target.value)"
        class="visually-hidden"
      >
      <span>{{ sizeType.name }}</span>
    </label>
  </div>

</template>

<script setup>
defineProps ({
    sizesItems: {
        type: Object,
        required: true,
    },
})

defineEmits(["update:modelValue"])


</script>

<style>

</style>