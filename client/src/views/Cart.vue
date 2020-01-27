<template>
    <div class="container">
        <div class="row">
            <div class="col-8" v-if="flag">
                <div v-for="item in allCart" :key="item._id" class="m-3">
                <b-card no-body class="overflow-hidden p-3 border-0" style="max-width: 540px;">
                    <b-row no-gutters>
                    <b-col md="6">
                        <b-card-img :src="item.item_id.image" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6" class="text-left">
                        <b-card-body :title="item.item_id.name" style="color:black;">
                        <b-card-text style="color:#F95A3B;font-weight: 500;">
                            Rp{{item.item_id.price}}
                        </b-card-text>
                        <b-card-text>
                            qyt: {{item.quantity}}
                        </b-card-text>
                        <b-card-footer>
                            <a style="cursor: pointer;" @click.prevent="deleteCart(`${item._id}`)"> <i class="fa fa-trash-o" style="font-size:24px"></i></a>
                        </b-card-footer>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
                <hr>
                </div>                
            </div>
            <div class="col-4">
<div>
  <b-card
    title="Ringkasan Belanja"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 text-dark text-left" 
  >
    <hr>
    <b-card-text>
      Total Harga <strong style="float:right;">Rp{{getTotal}}</strong>
    </b-card-text>

     <button  class="js__continue-login-form unf-user-btn unf-user-btn--medium unf-user-btn--primary unf-user-btn--block">Beli ({{getQyt}})</button>                
  </b-card>
</div>               
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'

export default {
  name: 'userCart',
   data() {
      return {
     flag: false
      }
    },
  components: {
    
  },
  computed:{
    ...mapGetters({
      allCart: 'cart/getCart'
    }),
    getTotal(){
        let total = 0
        this.allCart.forEach(element => {
            total = total + (element.item_id.price * element.quantity)
        });
        return total
    },
    getQyt(){
        let temp = 0
        this.allCart.forEach(element => {
            temp = temp + element.quantity
        });
        return temp
    }
  },
  methods:{
    ...mapActions({
      fetchAction: 'cart/fetchAction'
    }),
    getAmount(price,count){
        return price * count
    },
    img(str){
        return str
    },
    deleteCart(id){
        axios({
            url:'http://localhost:3000/carts',
            method: 'delete',
            headers:{
                token: localStorage.getItem('token')
            },
            data:{
                cart_id: id
            }
        })
        .then(respone=>{
            this.fetchAction()
        })
        .catch(err =>{
            console.log(err)
        })
    }
  },
  created(){
    if(localStorage.getItem('token')){
        this.fetchAction()
        this.flag = true
    }else{
        this.flag = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.unf-user-btn--primary {
    border: 0;
    background: #F95A3B;
    color: #fff;
    border-radius: 5px;
    padding: 8px;
    font-size: 15px;
    font-weight: 500;
}
.unf-user-btn--block {
    display: block;
    width: 100%;
}
</style>