<template>
  <div class="home">
    <div class="container">
      <div class="row mt-5">
        <div v-for="item in items" :key="item._id" class="col-3 pt-4">
          <div class="card">
            <img src="https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="product-name">{{ item.name }}</h3>
              <p class="price">Rp. {{ item.price }}</p>
              <p class="stock">Stock: {{ item.stock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get('http://localhost:3000/items')
      .then((items) => {
        this.items = items.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.card .product-name {
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  color: rgba(49, 53, 59, 0.96);
  max-height: 38px;
  margin-bottom: 5px;
  overflow: hidden;
}
.card .price {
  font-size: 14px;
  font-weight: 700;
  color: #fa591d;
  margin-bottom: 5px;
}
.card .stock {
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
  color: #03AC0E;
}
</style>
