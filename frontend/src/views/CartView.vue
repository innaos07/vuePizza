<template>
   <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div
          v-if="cartStore.pizzaExtended.length === 0"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>
        <cart-list v-else></cart-list>
        
        <additional-list></additional-list>
        <!-- <cart-form></cart-form> -->

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
        <input type="text" v-model="orderInfo.tel"  name="tel" placeholder="+7 999-999-99-99"  />
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
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link :to="{ name: 'home' }" class="button button--border button--arrow">Хочу еще одну</router-link>
      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalCost }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" 
        @click.prevent="submit"
        :disabled="cartStore.totalCost === 0">
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
// import CartForm from '@/modules/cart/CartForm.vue'
import CartList from '@/modules/cart/CartList.vue'
import AdditionalList from '../modules/cart/AdditionalList.vue';
import { getImage } from "@/common/helpers/index.js";

import {  ref, onMounted, watch } from "vue";
import { useProfileStore, useCartStore } from '@/store';
const cartStore = useCartStore();
const profileStore = useProfileStore();


const addressSelect = ref('1'); 

console.log('addressSelect',addressSelect.value , typeof(addressSelect.value ))
const createOldAddress =()=> ({
  tel: profileStore.tel,
  street: profileStore.addresses[profileStore.addresses.length - 1].street,
  building: profileStore.addresses[profileStore.addresses.length - 1].building,
  flat: profileStore.addresses[profileStore.addresses.length - 1].flat,
  comment: profileStore.addresses[profileStore.addresses.length - 1].comment
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

const submit =()=> {
  cartStore.setInfoAboutOrder(orderInfo.value)  
}



</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.cart__title {
  margin-bottom: 15px;
}
.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
.cart__empty {
  padding: 20px 30px;
}
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;
  span {
    margin-right: 16px;
  }
}
.cart-form__label {
  @include b-s16-h19;
  white-space: nowrap;
}
.cart-form__address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.cart-form__input {
  flex-grow: 1;
  margin-bottom: 20px;
  margin-left: 16px;
  &--small {
    max-width: 120px;
  }
}
.cart-list {
  @include clear-list;
  padding: 15px 0;
}
.cart-list__item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  border-bottom: 1px solid rgba($green-500, 0.1);
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}
.cart-list__product {
  flex-grow: 1;
  margin-right: auto;
}
.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}
.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;
  text-align: right;
  b {
    @include b-s16-h19;
  }
}
.cart-list__edit {
  @include l-s11-h13;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;
  &:hover {
    color: $green-500;
  }
  &:active {
    color: $green-600;
  }
  &:focus {
    color: $green-400;
  }
}
.product {
  display: flex;
  align-items: center;
}
.product__text {
  margin-left: 15px;
  h2 {
    @include b-s18-h21;
    margin-top: 0;
    margin-bottom: 10px;
  }
  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
.footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba($green-500, 0.1);
}
.footer__more {
  width: 220px;
  margin-right: 16px;
  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
.footer__text {
  @include l-s11-h13;
  color: rgba($black, 0.5);
}
.footer__price {
  @include b-s24-h28;
  margin-right: 12px;
  margin-left: auto;
}
.footer__submit {
  button {
    padding: 16px 14px;
  }
}
.additional-list {
  @include clear-list;
  display: flex;
  flex-wrap: wrap;
}
.additional-list__description {
  display: flex;
  align-items: flex-start;
  margin: 0;
  margin-bottom: 8px;
}
.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  img {
    margin-right: 10px;
    margin-left: 15px;
  }
  span {
    @include b-s14-h16;
    display: inline;
    width: 100px;
    margin-right: 15px;
  }
}
.additional-list__wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;
  border-top: 1px solid rgba($green-500, 0.1);
}
.additional-list__counter {
  width: 54px;
  margin-right: auto;
}
.additional-list__price {
  @include b-s16-h19;
}
.select {
  @include r-s16-h19;
  display: block;
  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;
  cursor: pointer;
  transition: 0.3s;
  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  font-family: inherit;
  appearance: none;
  &:hover {
    border-color: $orange-100;
  }
  &:focus {
    border-color: $green-500;
  }
}
</style>