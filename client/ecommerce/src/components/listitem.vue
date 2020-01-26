<template>
  <div>
    <b-row class="animated fadeInUp">
      <b-col cols="1">
        {{data.stock}}
      </b-col>
      <b-col cols="2">
        {{data.name}}
      </b-col>
      <b-col cols='3'>
        {{data.description}}
      </b-col>
      <b-col cols="1">
        {{data.price}}
      </b-col>
      <b-col cols="2">
          {{data.admin.first_name}}
      </b-col>
      <b-col cols="1">
        <i class="fas fa-external-link-alt delete" @click="$bvModal.show(data._id)"></i>
        <!-- modal update -->
        <b-modal :id="data._id" title="Update Item" hide-footer ref="my-modal3">
            <b-form @submit.prevent="update">
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
                <b-button variant="dark" class="mb-2" type="submit">update Inventory
                </b-button>
            </b-form >
        </b-modal>
      </b-col>
      <b-col cols="1">
        <i class="fas fa-trash delete" :id="data['_id']" @click="del"></i>
         <!-- <b-popover :target="data['_id']" triggers="click">
         <template v-slot:title>Are you sure?</template>
         <b-button size="sm" @click="hidepop" class="mar">No</b-button>
         <b-button size="sm" variant="primary" @click="del">Yes</b-button>
         </b-popover> -->
      </b-col>
    </b-row>
    <hr>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  props: ['data'],
  data () {
    return {
      name: '',
      stock: '',
      description: '',
      category: '',
      image: '',
      price: '',
      options: [
        { value: 'guitar', text: 'guitar' },
        { value: 'piano', text: 'piano' },
        { value: 'drum', text: 'drum' },
        { value: 'mixer', text: 'mixer' }
      ]
    }
  },
  created () {
    this.name = this.data.name
    this.stock = this.data.stock
    this.description = this.data.description
    this.category = this.data.category
    this.image = this.data.image
    this.price = this.data.price
  },
  methods: {
    hidepop () {
      this.$refs['mod'].hide()
    },
    del: function () {
      let tmp = this.data._id
      Axios({
        url: 'http://localhost:3000/inventories/' + this.data._id,
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.$emit('del', tmp)
        })
    },
    uploadimage: function () {
      this.image = event.target.files[0]
    },
    update: function () {
      let input = new FormData()
      input.append('name', this.name)
      input.append('description', this.description)
      input.append('stock', this.stock)
      input.append('price', this.price)
      input.append('category', this.category)
      input.append('image', this.image)
      Axios({
        url: 'http://localhost:3000/inventories/' + this.data._id,
        data: input,
        method: 'PUT',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.$refs['my-modal3'].hide()
          this.$emit('upt', data.data)
        })
    }
  }
}
</script>

<style>
.delete{
  cursor: pointer;
  font-size: 20px;
}

.delete:hover{
  color: black;
  transform: scale(1.3);
  transition: 400ms
}

</style>
