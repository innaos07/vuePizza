<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select name="test" class="select" v-model="addressSelect">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
          <option value="3">Дом</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input type="text" v-model="orderInfo.tel" name="tel" placeholder="+7 999-999-99-99" />
      </label>

      <div class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input type="text" name="street" v-model="orderInfo.street" :disabled="addressSelect==='1'"/>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input type="text" name="house" v-model="orderInfo.building" :disabled="addressSelect==='1'"/>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input type="text" name="apartment" v-model="orderInfo.flat" :disabled="addressSelect==='1'"/>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  ref, onMounted, watch } from "vue";
import { useProfileStore, useCartStore } from '@/store';
const cartStore = useCartStore();
const profileStore = useProfileStore();

const addressSelect = ref('1'); 
console.log('addressSelect',addressSelect.value , typeof(addressSelect.value ))
const createOldAddress =()=> ({
  tel: profileStore.tel,
  street: profileStore.addresses[0].street,
  building: profileStore.addresses[0].building,
  flat: profileStore.addresses[0].flat
})

const createOnlyPhone =()=> ({
  tel: '',
})
const createNewAddress =()=> ({
  tel: '',
  street: '',
  building: '',
  flat: '',
})
const orderInfo = ref(createOnlyPhone());

watch(addressSelect, ()=> {
  console.log('watch')
  orderInfo.value = addressSelect.value === '1' ? createOnlyPhone()  
: addressSelect.value === '2' ? createNewAddress() 
:  createOldAddress()
})

</script>