<template>
  <div>
    <br />
    <center>
      <h1>Data Items</h1>
    </center>
    <br />
    <center>
      <h5>
        <button @click="gotoAdd">Add Item</button>
      </h5>
    </center>
    <br />
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">image</th>
          <th scope="col">Item Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-for="(item, i) in items" :key="i">
        <tr>
          <td>{{item._id}}</td>
          <td>
            <img :src="item.image" style="max-width=20px" />
          </td>
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.price}}</td>
          <td>{{item.stock}}</td>
          <td>
            <a href="/" @click.prevent="update(item)">edit</a> |
            <a href="/" @click.prevent="deleteItem(item._id)">delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    getItem() {
      axios({
        url: `http://localhost:3000/items`,
        method: "GET"
      })
        .then(({ data }) => {
          this.items = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoAdd() {
      this.$emit("gotoAdd");
    },
    deleteItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            return axios({
              url: `http://localhost:3000/items/${id}`,
              method: "DELETE",
              headers: {
                token: localStorage.getItem("token")
              }
            });
          }
        })
        .then(() => {
          this.getItem();
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        });
    },
    update(payload) {
      this.$emit("updateItem", payload);
    }
  },
  created() {
    this.getItem();
  }
};
</script>

<style scoped>
img {
  max-width: 60px;
}
</style>