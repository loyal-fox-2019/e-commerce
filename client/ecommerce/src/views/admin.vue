<template>
  <div>
    <b-button variant="dark" class="mb-2" v-b-modal.modal-9>
      Add Item<b-icon icon="plus"></b-icon>
    </b-button>
    <b-button variant="dark" class="history" v-if="!historyItem" @click="histo">
      History
    </b-button>
    <b-button variant="dark" class="history" v-if="historyItem" @click="historyItem = false">
      Inventory List
    </b-button>

    <!-- modal -->
    <b-modal id="modal-9" title="Add Item" hide-footer ref="my-modal">
        <b-form @submit.prevent="add">
            <b-form-group
              id="input-group-1"
              label="Product Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="text"
                required
                placeholder="Product Name"
                v-model="name"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Description:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="text"
                required
                placeholder="product description"
                v-model="description"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Stock:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="number"
                required
                placeholder="product stock"
                v-model="stock"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Price:" label-for="input-5">
              <b-form-input
                id="input-5"
                type="number"
                required
                placeholder="product price"
                v-model="price"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Category:" label-for="input-5">
            <b-form-select v-model="category" :options="options"></b-form-select>
            </b-form-group>
            <b-form-group label="image">
            <b-form-file v-on:change="uploadimage"></b-form-file>
            </b-form-group>
            <b-button variant="dark" class="mb-2" type="submit">Add Inventory
            </b-button>
        </b-form >
    </b-modal>
    <b-container>
      <span v-if="historyItem">
        <b-row>
          <b-col cols="2">
            Customer Name
          </b-col>
          <b-col cols="2">
            Inventory Code
          </b-col>
          <b-col cols="1">
            Amount
          </b-col>
          <b-col cols="3">
            Date Add to Cart
          </b-col>
          <b-col cols="3">
            Date Checkout
          </b-col>
          <b-col cols="1">
            Status
          </b-col>
        </b-row>
        <br>
        <history v-for="(his, i) in historyBuy" :key="i" :historycus="his"></history>
      </span>
      <span v-if="!historyItem">
        <b-row>
          <b-col cols="1">
            Stock
          </b-col>
          <b-col cols="2">
            Product Name
          </b-col>
          <b-col cols="3">
            Desciption
          </b-col>
          <b-col cols="1">
            Price
          </b-col>
          <b-col cols="2">
            Admin Name
          </b-col>
          <b-col cols="1">
            Update
          </b-col>
          <b-col cols="1">
            Delete
          </b-col>
        </b-row>
        <br>
        <itemlist v-for="(item, i) in items"
        :key="i"
        :data="item"
        @del="deleteinventory"
        @upt="updateinventory"></itemlist>
      </span>
    </b-container>
  </div>
</template>

<script>
import itemlist from '../components/listitem'
import axios from 'axios'
import history from '../components/history'
export default {
  components: {
    itemlist,
    history
  },
  methods: {
    deleteinventory: function (params) {
      let tmp = this.items.filter(Element => Element._id !== params)
      this.items = tmp
      this.$bvToast.toast(`inventory with code ${params} deleted`, {
        title: 'Delete Inventory',
        autoHideDelay: 4000,
        variant: 'danger'
      })
    },
    updateinventory: function (params) {
      this.patch()
      this.$bvToast.toast(`inventory with code ${params._id} updated`, {
        title: 'Update Inventory',
        autoHideDelay: 4000,
        variant: 'success'
      })
    },
    uploadimage: function () {
      this.image = event.target.files[0]
    },
    add: function () {
      let input = new FormData()
      input.append('name', this.name)
      input.append('description', this.description)
      input.append('stock', this.stock)
      input.append('price', this.price)
      input.append('category', this.category)
      input.append('image', this.image)
      axios({
        url: 'http://localhost:3000/inventories',
        method: 'POST',
        data: input,
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.$refs['my-modal'].hide()
          this.patch()
          this.$bvToast.toast(`inventory Added`, {
            title: 'Add Inventory',
            autoHideDelay: 4000,
            variant: 'primary'
          })
        })
    },
    patchHistory: function () {
      axios({
        url: 'http://localhost:3000/carts/history',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((data) => {
          this.historyBuy = data.data
        })
    },
    patch: function () {
      axios({
        url: 'http://localhost:3000/inventories/admin',
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((data) => {
          this.items = data.data
        })
    },
    histo: function () {
      this.historyItem = true
      this.patchHistory()
    }
  },
  data () {
    return {
      name: '',
      description: '',
      stock: '',
      price: '',
      category: '',
      image: '',
      items: '',
      historyBuy: '',
      historyItem: false,
      options: [
        { value: 'guitar', text: 'guitar' },
        { value: 'piano', text: 'piano' },
        { value: 'drum', text: 'drum' },
        { value: 'mixer', text: 'mixer' }
      ]
    }
  },
  created () {
    this.patch()
    this.patchHistory()
  }
}
</script>

<style>

.history{
  position: absolute;
  float: right;
  right: 25%;
}

</style>
