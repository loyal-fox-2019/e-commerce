<template>
 <b-container id="productDetails" class="mt-3">
     <b-row align-h="center">
         <h1>{{detailProduct[0].category}}</h1>
     </b-row>
     <b-row class="mt-4">
         <b-col>
         <b-row id="prodImg">
             <img class="productImage" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5360/5360401_sd.jpg" alt="">
         </b-row>
         <b-row align-h="center">
            <router-view/>
         </b-row>
         </b-col>
         <b-col id="productSlot">
             <b-row class="productRow" align-h="center">
                 <b-col>
                 <b-row class="detailHead">
                     Product Name:
                 </b-row>
                 <b-row align-v="center" align-h="center" class="detailValue">
                     {{detailProduct[0].productName}}
                 </b-row>
                 </b-col>
             </b-row>
             <b-row class="productRow">
                 <b-col>
                 <b-row class="detailHead">
                     Price:
                 </b-row>
                 <b-row align-v="center" align-h="center" class="detailValue">
                     {{detailProduct[0].price}}
                 </b-row>
                 </b-col>
             </b-row>
             <b-row class="productRow">
                 <b-col>
                 <b-row class="detailHead">
                     Stock: {{detailProduct[0].stock}}
                 </b-row>
                 <b-row align-v="center" class="detailValue">
                    <p style="float:left;margin-right:3%;">QTY to buy :</p>
                    <b-button pill variant="outline-warning" @click="minAmount"><i class="fas fa-minus"></i></b-button>
                    <p class="mx-2" style="margin-bottom:0px;">{{qty}}</p>
                    <b-button pill variant="outline-warning" @click="maxAmount"><i class="fas fa-plus"></i></b-button>
                 </b-row>
                 </b-col>
             </b-row>
             <b-row id="prodDesc">
                 <b-col>
                 <b-row class="detailHead">
                     Product Description:
                 </b-row>
                 <b-row align-v="center" class="detailValue">
                     {{detailProduct[0].description}}
                 </b-row>
                 </b-col>
             </b-row>
             <b-row id="addToCartButton" v-if="logStatus">
                <router-link :to="{ name: 'MiniCart', params: {productId: detailProduct[0]._id,totalAmount: totalPrice  } }"><b-button @click="addCart" block variant="warning">Add To Cart</b-button></router-link>
             </b-row>
         </b-col>
     </b-row>
 </b-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'ProductDetails',
  data () {
    return {
      amount: 1,
      total: 0
    }
  },
  props: {
    products: {
      type: Array
    },
    logStatus: {
      type: Boolean
    }
  },
  computed: {
    detailProduct () {
      return this.products.filter(element =>
        element._id === this.$route.params.productId
      )
    },
    totalPrice () {
      return this.amount * this.detailProduct[0].price
    },
    qty () {
      return this.amount
    }
  },
  methods: {
    minAmount () {
      if (this.amount <= 1) {
        this.amount = 1
      } else {
        this.amount -= 1
      }
    },
    maxAmount () {
      if (this.amount >= this.detailProduct[0].stock) {
        this.amount = this.detailProduct[0].stock
      } else {
        this.amount += 1
      }
    },
    addCart () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId: this.detailProduct[0]._id,
          qty: this.amount
        }
      })
        .then(sucess => {
          Swal.fire({
            icon: 'success',
            title: 'Item successfully added to cart',
            text: 'Cart updated'
          })
        })
    }
  }
}
</script>

<style scoped>
#productDetails {
    height: 94vh;
    color: white;
}
#productSlot {
    box-shadow: 0px 1px 10px 0px rgba(255, 255, 255, 0.75);
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    padding-top: 1%;
}
#prodImg {
    height: 50vh;
    object-fit: contain;
    padding: 0;
}
.productImage {
    width: 75% ;
    height: 100% ;
}
.productRow {
    height: 15vh;
}
#addToCartButton {
    height: 5vh;
}
#prodDesc {
    height: 25vh;
}
.detailValue {
    height: 75%;
}
.detailHead {
    border-bottom: rgba(251, 200, 60, 0.719) solid 2px;
}
</style>
