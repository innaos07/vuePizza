<template>
    <div
      :draggable="draggable"
      @dragstart="onDrag"
      @dragover.prevent
      @dragenter.prevent
    >
      <slot />
    </div>
  </template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from '@/common/constants';

const props = defineProps({
  transferData: {
    type: Object,
    required: true
  },
  draggable: {
    type: Boolean,
    default: false,
  }
})

function onDrag({ dataTransfer }) {
  if(props.draggable) {

  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
  }
  
}
</script>

