import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
console.log(addressesJSON)

export const useProfileStore = defineStore('profile', {
    state: () => ({
        editedAddresId: null,
        isOpenForm: false,
        isEditAddres: false,
        id: 'gjfk8',
        name: 'Василий Ложкин',
        image: 'img/users/user5@2x.jpg',
        tel: '+7 999-999-99-99',
        addresses: addressesJSON,
    }),
    getters: {},
    actions: {
      openedAddresForm() {
        this.isOpenForm = true;
      },
      openedEditForm(ID){
        this.editedAddresId = this.addresses.find(item=> item.id === ID).id
        this.isEditAddres = true;
      },
      addAddres(addres) {
        console.log(addres)
        addres.id = this.addresses.length + 1;
        this.addresses = [...this.addresses, addres];
        this.isOpenForm = false;
      },
      editAddres(addres) {
        let index = this.addresses.findIndex(i=> i.id === addres.id);
        this.addresses.splice(index, 1, addres);
        this.isEditAddres = false;
        this.editedAddresId = null;
      },
      deleteAddres(ID) {
        console.log('DELE', ID)
        this.addresses = this.addresses.filter(item => item.id !== ID);
        this.isEditAddres = false;
        this.editedAddresId = null;
      },
      closeAddForm() {
        this.isOpenForm = false;
      }

    },
})