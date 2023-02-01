<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauceType in saucesItems"
      :key="sauceType.id"
      class="radio ingredients__input"
    >
      <input 
        type="radio"
        name="sauce" 
        :value="sauceType.value" 
        @change="$emit('update:modelValue', $event.target.value)"
         
      />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps ({
    saucesItems: {
        type: Object,
        required: true,
    }
})

defineEmits(["update:modelValue"])

</script>

<style>
</style>