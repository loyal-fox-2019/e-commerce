<template>
  <table class="table border-0">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Total price</th>
        <th scope="col">Amount</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in items" :key="item._id">
        <td width="10%">
          <img
            :src="item.product.image"
            class="rounded mx-auto"
            alt="image-file"
            height="100"
            width="100"
          />
        </td>
        <td>
          {{ item.product.name }}
        </td>
        <td>{{ item.totalPrice }}</td>
        <td width="15%">
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon1"
                @click="lessAmount(i)"
              >
                -
              </button>
            </div>
            <input
              type="number"
              class="form-control"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              v-model="item.amount"
              readonly
              max="item.product.stock"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="addAmount(i)"
              >
                +
              </button>
            </div>
          </div>
        </td>
        <td>
          <button
            class="btn btn-outline-secondary btn-sm"
            type="button"
            id="button-addon2"
            @click="preDeleteCart(item._id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TableCart',
  props: ['items'],
  data() {
    return {};
  },
  methods: {
    ...mapActions('Cart', ['deleteCart']),
    addAmount(i) {
      if (this.items[i].product.stock > this.items[i].amount) {
        this.items[i].amount += 1;
        this.items[i].totalPrice = this.items[i].product.price * this.items[i].amount;
      }
    },
    lessAmount(i) {
      if (this.items[i].amount > 1) {
        this.items[i].amount -= 1;
        this.items[i].totalPrice = this.items[i].product.price * this.items[i].amount;
      }
    },
    preDeleteCart(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.value) {
            this.deleteCart(id);
          }
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
