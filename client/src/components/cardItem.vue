<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div v-for="(item, i) in allItems" :key="i" class="col-md-3 mt-2">
        <div class="card">
          <img :src="item.image" class="card-img-top mt-3" />
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <p class="card-text">{{item.description}}</p>
            <div class="detailProduct mt-3">
              <div class="card-text">stock: {{item.stock}}</div>
              <a @click="addCart(item._id)" class="btn btn-success">Rp.{{item.price}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cardItem",
  data() {
    return {
      allItems: []
    };
  },
  created() {
    this.getAllItem();
  },
  methods: {
    getAllItem() {
      axios({
        url: `http://localhost:3000/items`,
        method: "get"
      })
        .then(({ data }) => {
          this.allItems = [];
          this.allItems = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCart(payload) {
      axios({
        url: `http://localhost:3000/users/carts`,
        method: "patch",
        data: {
          itemId: payload,
          quantity: 1
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.detailProduct {
  display: flex;
  justify-content: space-evenly;
}
.card p {
  margin-top: -10px;
  margin-bottom: 1px;
}

.row .card:hover {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4) !important;
  transform: scale(1.02);
}
.card-img,
.card-img-bottom,
.card-img-top {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  max-height: 180px;
  max-width: 250px;
  padding-left: 29px;
}
</style>