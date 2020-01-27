<template>
  <div class="container my-2">
    <h1 v-if="$route.name == 'addProduct'">Add Product</h1>
    <h1 v-if="$route.name == 'editProduct'">Edit Product</h1>
    <form>
      <div class="form-group">
        <label for="productName">Product Name</label>
        <input type="text" class="form-control" id="productName" v-model="productName">
      </div>
      <div class="form-group">
        <label for="description">Designer Name</label>
        <input type="text" class="form-control" id="designerName" v-model="designerName">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea type="text" class="form-control" id="description" v-model="description"></textarea>
      </div>
      <div class="row">
        <div class="form-group col-6">
          <label for="Price">Price</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Amount (to the nearest dollar)"
              v-model="price"
            >
          </div>
        </div>
        <div class="form-group col-6">
          <label for="stock">Stock</label>
          <input type="text" class="form-control" id="inputStock" v-model="stock">
        </div>
        <div class="input-group">
          <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            v-on:change="getImage"
          >
          <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
        </div>
        </div>
      </div>
      <button v-if="$route.name == 'addProduct'" @click.prevent="addProduct" type="submit" class="btn btn-success mt-4">Create</button>
      <button v-else-if="$route.name == 'editProduct'" @click.prevent="editProduct" type="submit" class="btn btn-success mt-4">Edit</button>
    </form>
  </div>
</template>

<script>
import axios from '@/api/server.js'

export default {
  name: "FormProduct",
  data() {
    return {
      productName: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      designerName:""
    };
  },
  methods:{
      getImage(event) {
            this.image = event.target.files[0];
      },
      addProduct(){
           const Fdata = new FormData();
           Fdata.append("name", this.productName);
           Fdata.append("price",this.price)
           Fdata.append("stock", this.stock);
           Fdata.append("image", this.image);
           Fdata.append("designer", this.designerName);
           Fdata.append("description", this.description);
           console.log(Fdata)
           axios
            .post(`/products`, Fdata, { 
                headers: { "access-token": localStorage.getItem("token") }
            })
            .then(({ data }) => {
                console.log(data);
                this.$swal("New Product Added!");
                this.productName = "",
                this.description = "",
                this.price = 0,
                this.stock = 0,
                this.image = "",
                this.designerName = ""
            })
            .catch(err => {
                this.$swal("Failed to create Product, All Field is required!");
                console.log(err);
            });
      },
      editProduct(){
        const Fdata = new FormData();
        Fdata.append("name", this.productName);
        Fdata.append("price",this.price)
        Fdata.append("stock", this.stock);
        Fdata.append("image", this.image);
        Fdata.append("designer", this.designerName);
        Fdata.append("description", this.description);
        console.log(Fdata)
        axios
          .put(`/products/${this.$route.params.id}`, Fdata, {
            headers: { "access-token": localStorage.getItem("token") }
          })
          .then(({ data }) => {
                console.log(data);
                this.$swal("Product Has been edited!");
                this.productName = "",
                this.description = "",
                this.price = 0,
                this.stock = 0,
                this.image = "",
                this.designerName = ""
                this.$router.push('/admin/overview')
           })
           .catch(err => {
                this.$swal("Failed to edit Product, All Field is required!");
                console.log(err);
            });
      }
  },
  created(){
    if(this.$route.name == 'editProduct'){
      axios
        .get(`/products/${this.$route.params.id}`,{ 
          headers: { "access-token": localStorage.getItem("token") }
        })
        .then(({data}) => {
          this.productName = data.name,
          this.description = data.description,
          this.price = data.price,
          this.stock = data.stock,
          this.image = data.image,
          this.designerName = data.designer
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
};
</script>
