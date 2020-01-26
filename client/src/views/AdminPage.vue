<template>
  <div>
    <div class="container-fluid mt-4">
      <nav class="nav nav-pills nav-fill mb-3">
        <a
          class="nav-item nav-link btn btn-primary"
          href="#"
          @click.prevent="allItem"
          >All Item</a
        >
        <a
          class="nav-item nav-link btn btn-success"
          href="#"
          @click.prevent="addItem"
          >Add New Item</a
        >
        <a
          class="nav-item nav-link btn btn-warning"
          href="#"
          @click.prevent="transaction"
          >Transactions</a
        >
      </nav>
      <div v-show="products">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Stocks</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allProduct" :key="product._id">
              <td>
                <img :src="product.image" alt="img" width="70" height="50" />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stocks }}</td>
              <td>{{ product.category }}</td>
              <td>
                <a
                  href="#"
                  class="btn btn-warning mr-2"
                  v-b-modal.modal-edit
                  @click.prevent="editItem(product)"
                  >Edit</a
                >
                <a
                  href="#"
                  class="btn btn-danger"
                  @click.prevent="deleteItem(product._id)"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container mt-5">
      <!-- FORM -->
      <ModalEdit></ModalEdit>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import ModalEdit from '@/components/ModalEdit.vue'

export default {
  name: 'AdminPage',
  data() {
    return {
      products: true
    }
  },
  components: {
    ModalEdit
  },
  methods: {
    addItem() {
      this.$router.push('/4dm1n/add-item')
      this.products = false
    },
    transaction() {
      this.products = false
      this.$store.dispatch('FETCH_TRANSACTION')
      this.$router.push('/4dm1n/transaction')
    },
    allItem() {
      this.products = true
      this.$router.push('/4dm1n')
      this.fetchProduct()
    },
    editItem(data) {
      console.log('masuk editItem')
      this.$bvModal.show('modal-edit')
      this.$store.commit('CHANGE_EDIT', data)
    },
    deleteItem(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete(`${this.$store.state.baseUrl}/item/${id}`, {
              headers: { token: localStorage.getItem('token') }
            })
            .then(() => {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
              this.fetchProduct()
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...' + err.response.status,
                text: err.response.data.message
              })
            })
        }
      })
    }
  },
  computed: {
    allProduct() {
      return this.$store.state.allItem
    },
    fetchProduct() {
      return this.$store.dispatch('FETCH_ALL_ITEM')
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
  },
  created() {
    this.products = true
    this.$store.dispatch('FETCH_ALL_ITEM')
    this.$store.dispatch('FETCH_TRANSACTION')
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
.nav a {
  font-weight: 600;
}
</style>
