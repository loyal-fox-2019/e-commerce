<template>
  <div class="col-4">
    <div>
      <div class="card mt-3 shadow p-3 mb-3 bg-white rounded" style="width: 20rem;">
        <div class="d-flex justify-content-center">
          <img class="card-img-top gambar" :src="item.file" alt="Card image cap" />
        </div>
        <div class="card-body">
          <h5>{{ item.name }}</h5>
          <div class="desc overflow-auto">
            <p>{{ item.description }}</p>
          </div>
          <div class="row justify-content-center">
            <h5>{{convertRupiah}}</h5>
          </div>
          <div v-if="owner" class="d-flex justify-content-start my-3">
            <i class="fas fa-md fa-store"></i>
            <p class="ml-2">{{owner}}</p>
          </div>
          <div class="d-flex justify-content-around">
            <div class="col-6">
              <h6>Stock: {{item.stock}}</h6>
            </div>
            <div class="col-6">
              <h6>
                <router-link :to="`/detail/${item._id}`">View Detail</router-link>
              </h6>
              <div class="h" v-if="statusMilikku">
                <div class="d-flex mx-auto justify-content-between">
                  <div class="btn btn-primary" v-b-modal="item._id">
                    <i class="fas fa-lg fa-edit"></i>
                  </div>
                  <div class="btn btn-danger" v-on:click="deleteProduct">
                    <i class="fas fa-lg fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :id="item._id" title="Edit" hide-footer>
      <form class="center">
        <div class="form-group">
          <!-- <div class="d-flex"> -->
          <label for="name" class="mr-3">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter product's name"
            v-model="item.name"
          />
          <!-- </div> -->
        </div>

        <!-- <div class="d-flex"> -->
        <!-- <div class="col-6"> -->
        <label for="stock" class="mr-3">
          <h4>Stock</h4>
        </label>
        <b-form-input id="stock" type="number" min="0" style="width: 100%" v-model="item.stock"></b-form-input>
        <!-- </div> -->
        <!-- <div class="col-6"> -->
        <label for="price">
          <h4>Price</h4>
        </label>

        <b-form-input id="price" type="number" min="0" style="width: 100%" v-model="item.price"></b-form-input>
        <!-- </div> -->
        <!-- </div> -->
        <!-- <b-form-group> -->
        <!-- <div class="d-flex my-3 form-group"> -->
        <label for="desc" class="mr-3">
          <h4>Description</h4>
        </label>
        <br />
        <textarea id="desc" style="width: 100%" rows="3" v-model="item.description"></textarea>
        <br />
        <!-- </div> -->
        <!-- </b-form-group> -->
        <label for="file" class="mt-3">
          <h4>Picture</h4>
        </label>
        <b-form-file
          id="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          name="file"
          v-on:change="uploadGambar"
        ></b-form-file>
        <div class="d-flex justify-content-end">
          <div
            class="btn btn-primary my-2"
            @click="$bvModal.hide(item._id)"
            v-on:click="edit(item._id)"
          >Save Change</div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "productList",
  props: ["item"],
  data() {
    return {
      statusMilikku: false,
      baseUrl: "http://localhost:3000",
      owner: null
    };
  },
  computed: {
    convertRupiah() {
      let angka = this.item.price;
      var rupiah = "";
      var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return (
        "Rp. " +
        rupiah
          .split("", rupiah.length - 1)
          .reverse()
          .join("") +
        ",00"
      );
    }
  },
  created() {
    let idTosearch;
    if (this.item.ownerId._id) {
      idTosearch = this.item.ownerId._id;
    } else {
      idTosearch = this.item.ownerId;
    }
    axios({
      method: "get",
      url: `${this.baseUrl}/user/${idTosearch}`
    })
      .then(({ data }) => {
        if (data.lastName) {
          this.owner = `${data.firstName} ${data.lastName} shop`;
        } else {
          this.owner = `${data.firstName} shop`;
        }
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err
        });
        // console.log(this.item.ownerId._id, "ini kalo ownerid masih objek");
      });

    let idOwnerOnCardMyProducts = this.item.ownerId._id;
    let idUserLogged = localStorage.getItem("userId");
    if (idOwnerOnCardMyProducts == idUserLogged) {
      this.statusMilikku = true;
    }
  },
  methods: {
    deleteProduct() {
      let baseUrl = this.baseUrl;
      axios({
        method: "DELETE",
        url: `${baseUrl}/product/${this.item._id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    edit(id) {
      let url = this.baseUrl;
      let name = this.item.name;
      let file = this.item.file;
      let description = this.item.description;
      let price = this.item.price;
      let stock = this.item.stock;
      let formData = new FormData();
      formData.append("formData", formData);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("file", file);
      axios({
        method: "PUT",
        url: `${url}/product/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Your Product has been successfully edited!",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    uploadGambar(e) {
      this.item.file = e.target.files[0];
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 350px;
  max-height: 450px;
  min-width: 350px;
  min-height: 450px;
}

.gambar {
  max-width: 200px;
  max-height: 150px;
  min-width: 200px;
  min-height: 150px;
}

h5 {
  font-weight: bold;
}

.desc {
  max-height: 50px;
  height: 50px;
}
</style>
