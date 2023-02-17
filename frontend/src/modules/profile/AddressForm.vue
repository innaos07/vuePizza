<template>
  <div class="layout__address">
    <form
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>Адрес № {{ addresToEdit?.id ?? profileStore.addresses.length+1 }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              name="addr-name"
              v-model="addres.name"
              placeholder="Введите название адреса"
              required
              ref="addresName"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="addr-street"
              v-model="addres.street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="addr-house"
              v-model="addres.building"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="addr-apartment"
              v-model="addres.flat"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              v-model="addres.comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button 
          type="button" 
          class="button button--transparent"
          @click="deleteAddres(addres.id)">
          Удалить
        </button>
        <button type="submit" class="button"  @click.prevent="submit(addres)">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/store';
import {  ref, onMounted } from "vue";
import { cloneDeep } from 'lodash'

const profileStore = useProfileStore();

const props = defineProps({
  addresToEdit: {
    type: Object,
    default: null
  }
})
const addresName = ref(null)
const createNewAddres =() => ({
  userId: null,
  id: null,
  name: '',
  street: '',
  building: '',
  flat: '',
  comment: '', 
})

onMounted(() => {
  console.log(addresName.value)
  addresName.value.focus()
})
const addresToWork = props.addresToEdit ? cloneDeep(props.addresToEdit): createNewAddres()
const addres = ref(addresToWork)


const deleteAddres =(ID)=> {
  if(!props.addresToEdit){
    console.log('delete adres', addres)
    profileStore.closeAddForm()

  } else {
    profileStore.deleteAddres(ID)
  }
}

const submit =(addres)=> {
  if(!props.addresToEdit){
  profileStore.addAddres(addres)
} else {
  profileStore.editAddres(addres)
}
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
.address-form {
  $bl: &;
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }
  small {
    @include l-s11-h13;
    display: block;
    padding: 0 16px;
  }
}
.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  padding: 16px;
}
.address-form__input {
  width: 100%;
  margin-bottom: 16px;
  &--size {
    &--normal {
      width: 60.5%;
    }
    &--small {
      width: 18%;
    }
  }
}
.address-form__buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
.address-form__header {
  @include b-s14-h16;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba($green-500, 0.1);
}
.icon {
  display: block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    box-shadow: $shadow-light;
  }
  &:active {
    box-shadow: $shadow-large;
  }
  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>