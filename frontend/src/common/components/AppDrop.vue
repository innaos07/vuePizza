<template>
    <div
      @drop.stop="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <slot />
    </div>
  </template>

<script setup>
import { DATA_TRANSFER_PAYLOAD } from '../constants';
import { usePizzaStore } from '@/store';
const pizzaStore = usePizzaStore();

const emit = defineEmits(['drop'])

function onDrop({ dataTransfer }) {
  if (!dataTransfer) {
    return;
  }
  const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
  if (payload) {
    const transferData = JSON.parse(dataTransfer.getData(DATA_TRANSFER_PAYLOAD));
    console.log(transferData)
    emit('drop', transferData)
  }
}
</script>

