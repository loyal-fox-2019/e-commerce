<template>
  <b-container fluid="sm" class="home">
    <b-row cols="3">
      <b-col v-for="item in listOfProducts" :key="item._id" class="mt-3">
        <b-card
          :title="item.title"
          :img-src="item.image"
          img-alt="Image"
          img-top
          class="mb-2"
        >
          <div class="d-flex">
            <b-button :to="`/items/${item._id}`" variant="primary"
              >Read More</b-button
            >
            <b-button
              v-if="userProfile.role === 'customer'"
              :id="`addToCart-${item._id}`"
              class="ml-2"
              @click="addItemToCart(item)"
              variant="primary"
              >Add to Cart</b-button
            >
            <!-- @click="removeItem(item)" -->
            <b-button
              v-if="userProfile.role === 'admin'"
              :id="`addToCart-${item._id}`"
              class="ml-auto"
              @click="removeItem(item)"
              variant="danger"
              ><b-icon-trash></b-icon-trash
            ></b-button>
          </div>
          <b-tooltip
            disabled
            ref="needSignIn"
            :show.sync="showWarning.userNeedSignIn"
            :target="`addToCart-${item._id}`"
          >
            You need to <strong>sign in first!</strong>
          </b-tooltip>

          <b-tooltip
            disabled
            ref="needSignIn"
            :show.sync="showWarning.itemSuccessAddToCart"
            :target="`addToCart-${item._id}`"
          >
            Barang sukses masuk keranjang!
          </b-tooltip>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      listOfItem: null,
      showWarning: {
        userNeedSignIn: false,
        itemSuccessAddToCart: false
      }
    };
  },
  computed: {
    ...mapState(['userProfile', 'listOfProducts'])
  },
  methods: {
    addItemToCart(newItem) {
      if (this.$store.getters.getUserProfile) {
        this.showWarning.itemSuccessAddToCart = true;
        const currList = this.$store.getters.getItemsInCart;
        const temp = currList.find(item => item.product._id === newItem._id);

        if (!temp) {
          this.$store.commit('addItemInCart', { product: newItem, total: 1 });
        } else {
          const updatedList = currList.map(item => {
            // eslint-disable-next-line prefer-const
            let { product, total } = item;
            if (product._id === newItem._id) {
              total += 1;
            }

            return { product, total };
          });

          this.$store.commit('updateItemInCart', updatedList);
        }
        setTimeout(() => {
          this.showWarning.itemSuccessAddToCart = false;
        }, 1000);
      } else {
        this.showWarning.userNeedSignIn = true;
        setTimeout(() => {
          this.showWarning.userNeedSignIn = false;
        }, 1000);
      }
    },
    removeItem(item) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            return axios.delete(`http://localhost:3000/products/${item._id}`, {
              headers: { token: localStorage.getItem('token') }
            });
          }
          throw new Error(`action got canceled!`);
        })
        .then(() => axios.get('http://localhost:3000/products'))
        .then(() => {
          this.$store.dispatch('getProductList');
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          // this.listOfItem = data.data;
        })
        .catch(err => console.error(err));

      // axios
      //   .delete(`http://localhost:3000/products/${item._id}`, {
      //     headers: { token: localStorage.getItem('token') }
      //   })
      //   .then(() => axios.get('http://localhost:3000/products'))
      //   .then(() => {
      //     this.$store.dispatch('getProductList');
      //     // this.listOfItem = data.data;
      //   })
      //   .catch(err => console.error(err));
    }
  },
  created() {
    this.$store.dispatch('getProductList');
    // axios
    //   .get('http://localhost:3000/products')
    //   .then(({ data }) => {
    //     this.listOfItem = data.data;
    //   })
    //   .catch(err => console.error(err));
  }
};
</script>
