<template>
  <div>
    <b-modal id="modal-edit" size="lg" title="Large Modal" hide-footer>
      <form action="/upload-single" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <label for="itemName">Item Name</label>
          <input
            type="text"
            class="form-control"
            id="itemName"
            placeholder="Item Name"
            v-model="form.name"
          />
        </div>
        <div class="form-group">
          <label for="itemDescription">Description</label>
          <input
            type="textarea"
            class="form-control"
            id="itemDescription"
            placeholder="Item Description"
            v-model="form.description"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="Number only without ."
            v-model="form.price"
          />
        </div>
        <div class="form-group">
          <label for="stocks">Stocks</label>
          <input
            type="number"
            class="form-control"
            id="stocks"
            placeholder="Stocks"
            v-model.number="form.stocks"
          />
        </div>
        <b-form-group id="category" label="Category:" label-for="inputCategory">
          <b-form-select
            id="inputCategory"
            v-model="form.category"
            :options="categoryList"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-file
          id="image"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

        <b-button type="button" variant="primary" @click.prevent="editItem(id)"
          >Submit</b-button
        >
        <b-button type="button" variant="danger" @click.prevent="resetForm"
          >Reset</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'AddItem',
  data() {
    return {
      categoryList: ['Brass', 'Battery', 'Front Ensemble']
    }
  },
  computed: {
    form() {
      return this.$store.state.editItem
    },
    file() {
      return this.$store.state.editItem.image
    },
    id() {
      return this.$store.state.editItem._id
    }
  },
  methods: {
    editItem(id) {
      Swal.showLoading()
      let formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('description', this.form.description)
      formData.append('price', this.form.price)
      formData.append('stocks', this.form.stocks)
      formData.append('category', this.form.category)
      formData.append('image', this.file)

      axios
        .put(`${this.$store.state.baseUrl}/item/${id}`, formData, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.close()
          this.resetForm()
          this.$bvModal.hide('modal-edit')
          Swal.fire('Success', 'Item updated', 'success')
          this.$store.dispatch('FETCH_ALL_ITEM')
        })
        .catch(err => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: err.response.status,
            text: err.response.data.message
          })
        })
    },
    resetForm() {
      this.form.name = ''
      this.form.description = ''
      this.form.price = null
      this.form.stocks = null
      this.form.category = ''
      this.file = null
      document.getElementById('image').value = ''
    }
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      if (vm.$store.state.isAdmin === true) {
        next()
      } else {
        next('/')
      }
    })
  }
}
</script>

<style>
.myContainer {
  min-height: calc(100vh - 8vh);
}
.shoes {
  overflow: scroll;
  height: 80vh;
  width: 100%;
}
.box:hover {
  cursor: pointer;
}
</style>
