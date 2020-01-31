<template>
  <div>
    <b-card
      :img-src="good.image"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 20rem; height: 35rem;"
      class="mb-2 itm animated fadeInUp"
    >
    <span class="tex">
      <h3>{{good.name}}</h3>
      <b-card-text>
        Rp. {{rupiah}},-
      </b-card-text>
      <span id="stock">Stock: {{good.stock}}</span>
      <span class="addto"
      @click="$bvModal.show(good['_id'])"
      >
      <b-icon id="cart" icon="bucket-fill"></b-icon>Add to Cart
      </span>
      <br><br>
      <router-link :to="rut">
      <p>Detail</p>
      </router-link>
    </span>
    </b-card>

    <b-modal
    ref="mod"
    :id="good['_id']"
    title="Add to Cart"
    hide-footer
    header-bg-variant="light"
    body-bg-variant="dark"
    body-text-variant="light"
    header-text-variant="black"
    >
      <b-form
      v-if="loginuser">
        <img class="picmodal" :src="good.image" alt="">
        <h4 class="my-4">{{ good.name }}</h4>
        <p>{{good.description}}</p>
        <p>Quantity: </p>
        <b-form-input type="number" v-model="quan"></b-form-input>
        <b-button variant="light" type="submit" class="addtocart" @click.prevent="additem">Add to Cart</b-button>
      </b-form>
      <span v-else>Please Login first</span>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['good'],
  data () {
    return {
      quan: 1,
      inventoryid: this.good['_id'],
      loginuser: localStorage.getItem('token') || false
    }
  },
  methods: {
    additem: function () {
      let data = {
        inventory: this.inventoryid,
        amount: this.quan
      }
      axios({
        url: 'http://localhost:3000/carts',
        method: 'POST',
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((data) => {
          this.$refs['mod'].hide()
        })
    }
  },
  computed: {
    rut: function () {
      let root = '/' + this.$route.params.id + '/' + this.good._id
      return root
    },
    rupiah: function () {
      let result = []
      let params = this.good['price'].toString()
      let key = 1
      for (let i = params.length - 1; i >= 0; i--) {
        if (key % 3 === 0 && params.length !== key) {
          result.unshift(`.${params[i]}`)
        } else (result.unshift(params[i]))
        key++
      }
      return result.join('')
    }
  }

}
</script>
<style>
#stock{
    position: relative;
    float: left;
}

.itm{
  cursor: pointer;
}
.itm:hover{
  transform: scale(1.1);
  transition: 500ms;
}

#cart{
    color: rgb(11, 156, 11);
    margin-left: 25px;
}
.addtocart{
  margin-top: 7%;
}

.picmodal{
  width: 100%;
}

.addto:hover{
  cursor: pointer;
}

.tex{
  position: absolute;
  bottom: 15px;
  left: 70px;
}

</style>
