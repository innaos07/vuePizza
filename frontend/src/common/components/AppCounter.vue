<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value === min"
      @click="emit('input', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="emit('input', Number($event.target.value))"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': accent }"
      :disabled="value === max"
      @click="emit('input', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>


<!-- <template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="computedCount(itemForCounter.id) === 0"
      @click="decrement(itemForCounter.id)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="computedCount(itemForCounter.id)"
      @input="updateInput($event, itemForCounter.id)"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="computedCount(itemForCounter.id) === MAX_INGREDIENT_COUNT"
      @click="increment(itemForCounter.id)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template> -->
   
<script setup>
import { computed, ref, watch } from "vue";


// import { MAX_INGREDIENT_COUNT } from "@/common/constants";
import { usePizzaStore } from '@/store';
const pizzaStore = usePizzaStore();


const props =defineProps({
  value: {
    type: Number,
    required: true,
  },
  accent: {
    type: Boolean,
    default: false, 
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 3,
  }
})
// console.log('props', props.value)
const emit = defineEmits(['input'])



// const count = ref(0);
// const props = defineProps ({
//       itemForCounter: {
//           type: Object,
//           required: true,
//       },
//       computedCount: {
//         type: Function,
//         default: ()=> 0
//       },
//       MAX_INGREDIENT_COUNT: {
//         type: Number,
//         default: null,
//       },
//       // items: {
//       //   type: Array,
//       //   default: ()=> []
//       // }
//   })

//   const emit = defineEmits(['setIncrement', 'setDecrement', 'setInput'])
//   // const computedCount = computed(()=> {
      
//   //      let index = props.items.findIndex(i=> i.ingredientId === props.itemForCounter.id);
//   //      return  props.items[index]?.count ?? 0
//   // })

// const updateInput =(e, ID)=> {
// console.log('INPUT', e.target.value.trim(), )
// let newCount
// props.MAX_INGREDIENT_COUNT ?  
// newCount =  Math.min(props.MAX_INGREDIENT_COUNT, Number(e.target.value.trim())) 
// : newCount = Number(e.target.value);
//   console.log('newCount',newCount)
//   let validate = Number.isNaN(newCount);
// console.log('validate', validate)

//   if(!validate ) {
//     count.value = newCount
//       console.log('count.value ', count.value )

//     // console.log('COUN T NEW', Math.min(props.MAX_INGREDIENT_COUNT, Number(newCount)))

//     emit('setInput',{ ID, value: count.value })
//     // (Number(newCount) > 0 ? 
//     // props.productForFilter[index].count = Math.min(MAX_INGREDIENT_COUNT, Number(newCount)) 
//     // : props.productForFilter.splice(index, 1))
//     // :( Number(newCount) > 0 ? 
//     //  props.productForFilter.push({ ingredientId: ID, count: Math.min(MAX_INGREDIENT_COUNT, Number(newCount)) }) 
//     //  : false )
//     // console.log('END INput', props.productForFilter)

//   }  else {
//   count.value = 0
//   console.log('count.value else ', count.value )}

// }

//   const increment =(ID)=> {
//     emit('setIncrement', { ID, value: count.value +=1 })
//   }

//   const decrement =(ID)=> {
//     emit('setDecrement', { ID, value: count.value -=1 })  
//   }



//  watch(count, (oldwal, newval) => {
//   // console.log('watch')
//   })

</script>
   
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.counter__button {
  $el: &;
  $size_icon: 50%;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  &--minus {
    background-color: $purple-100;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $black;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }
    &:active:not(:disabled) {
      background-color: $purple-300;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      &::before {
        opacity: 0.1;
      }
    }
  }
  &--plus {
    background-color: $green-500;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $white;
    }
    &::after {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      transform: translate(-50%, -50%) rotate(90deg);
      border-radius: 2px;
      background-color: $white;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }
    &:active:not(:disabled) {
      background-color: $green-600;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  &--orange {
    background-color: $orange-200;
    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }
    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}
.counter__input {
  @include r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>