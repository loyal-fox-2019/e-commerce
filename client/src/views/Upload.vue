<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Upload Makanan</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form @submit.prevent="upload">
                    <v-text-field label="Nama" name="title" prepend-icon="local_dining" type="text" v-model="name"></v-text-field>
                    <v-text-field label="Harga" name="price" prepend-icon="attach_money" type="number" v-model="price"></v-text-field>
                    <v-select
                      prepend-icon="layers"
                      :items="kategoris"
                      :menu-props="{ top: true, offsetY: true }"
                      label="Kategori"
                      v-model="category"
                    ></v-select>
                    <v-text-field label="Stock" name="stock" prepend-icon="local_shipping" type="number" v-model="stock"></v-text-field>
                    <v-textarea
                      v-model="description"
                      auto-grow
                      filled
                      label="Keistimewaan :"
                      outlined
                      rounded
                      row-height=3
                    ></v-textarea>
                    <!-- <v-file-input
                      label="Foto Makanan"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="image"
                    ></v-file-input> -->
                    <v-file-input
                      label="Foto Makanan"
                      filled
                      prepend-icon="mdi-camera"
                      v-model="image"
                    ></v-file-input>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="upload">Upload</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'UploadPage',
  data () {
    return {
      name: '',
      description: '',
      price: 100,
      stock: 1,
      category: '',
      image: null,
      kategoris: ['lauk', 'sayur', 'minum', 'spesial'],
      errors: []
    }
  },
  methods: {
    upload () {
      this.errors = []
      const formData = new FormData()
      formData.set('name', this.name)
      formData.set('description', this.description)
      formData.set('price', this.price)
      formData.set('stock', this.stock)
      formData.set('category', this.category)
      formData.set('image', this.image)
      axios({
        method: 'POST',
        url: `/products`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
        .then(({ data }) => {
          this.name = ''
          this.description = ''
          this.price = 100
          this.stock = 1
          this.category = ''
          this.image = null
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Upload Sukes',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchProducts')
          this.$router.push('/')
        })
        .catch(err => {
          this.errors.push(err.response.data.message)
        })
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>
</style>
