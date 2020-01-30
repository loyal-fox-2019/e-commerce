<template>
  <div class="page">
    <div class="p-5 d-flex align-items-center justify-content-center">
      <div class="card p-3" style="width: 50rem;">
        <h3 class="text-center">Add Gold Data</h3>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Insert name">
          </div>
          <div class="row">
            <div class="col form-group">
              <label>Weight</label>
              <input v-model="weight" type="number"
              class="form-control" placeholder="Insert weight">
            </div>
            <div class="col form-group">
              <label>Quantity</label>
              <input v-model="quantity" type="number"
              class="form-control" placeholder="Insert quantity">
            </div>
            <div class="col form-group">
              <label>Price</label>
              <input v-model="price" type="number"
              class="form-control" placeholder="Insert price">
            </div>
            <div class="col form-group">
              <label>Category</label>
              <select class="form-control" v-model="category">
                <option>Emas Batangan</option>
                <option>Emas Series</option>
              </select>
            </div>
          </div>
          <label>Image</label>
          <b-form-file type="file" v-model="image" ref="file"/>
          <button type="submit" class="btn btn-info mt-3">Add Gold Data</button>
        </form>
      </div>
    </div>
    <div class="d-flex flex-row bd-highlight">
      <div class="bd-highlight w-50 p-2 pr-4">
        <h3 class="title">Database Gold Bars :</h3>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bars, index) in fetchBars" :key="bars._id">
                <th scope="row">{{index + 1}}</th>
                <td> <img :src="bars.image" alt="loading..." style="height:4rem "></td>
                <td> {{ bars.name }} - {{ bars.weight }} </td>
                <td> {{ bars.price }} </td>
                <td> {{ bars.quantity }} </td>
                <td><a @click.prevent="destroyBars(bars)" ><i class="fas fa-trash"></i></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bd-highlight w-50 p-2 pr-4">
        <h3 class="title">Database Series Batik :</h3>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bars, index) in fetchSeries" :key="bars._id">
                <th scope="row">{{index + 1}}</th>
                <td> <img :src="bars.image" alt="loading..." style="height:4rem "></td>
                <td> {{ bars.name }} - {{ bars.weight }} </td>
                <td> {{ bars.price }} </td>
                <td> {{ bars.quantity }} </td>
                <td><a @click.prevent="destroyBars(bars)" ><i class="fas fa-trash"></i></a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      name: '',
      price: '',
      quantity: '',
      weight: '',
      category: 'Emas Batangan',
      image: null,
    };
  },
  computed: {
    fetchBars() {
      return this.$store.state.barsGold;
    },
    fetchSeries() {
      return this.$store.state.seriesGold;
    },
  },
  created() {
    this.$store.dispatch('fetchBarsGold');
    this.$store.dispatch('fetchSeriesGold');
  },
  methods: {
    destroyBars(val) {
      swal.fire({
        title: 'Are you sure to Deleted image?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteGold', val._id)
            .then(() => {
              swal.fire({
                title: 'Success!',
                text: 'Image success to delete',
                icon: 'success',
                confirmButtonText: 'Oke',
              });
              this.$store.dispatch('fetchBarsGold');
              this.$store.dispatch('fetchSeriesGold');
            })
            .catch((err) => {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
              });
            });
        }
      });
    },
    submit() {
      let categories;
      if (this.category === 'Emas Batangan') {
        categories = 'EB';
      } else {
        categories = 'SB';
      }
      const formData = new FormData();
      formData.append('image', this.image);
      formData.set('name', this.name);
      formData.set('weight', this.weight);
      formData.set('price', this.price);
      formData.set('quantity', this.quantity);
      formData.set('category', categories);

      this.$store.dispatch('createGold', formData)
        .then(() => {
          swal.fire({
            icon: 'success',
            title: 'Successful to Add Gold',
            showConfirmButton: false,
            timer: 1500,
          });
          this.name = '';
          this.price = '';
          this.quantity = '';
          this.weight = '';
          this.category = 'Emas Batangan';
          this.image = null;
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          });
        });
    },
  },
};
</script>

<style scoped>
  .page {
    height: 98vh;
    overflow: scroll;
  }
  .card {
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  a {
  cursor: pointer;
  color: #6f6f6f
  }
</style>
