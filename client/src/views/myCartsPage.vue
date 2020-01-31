<template>
  <div>
      <h1>Ongoing Carts</h1>
      <!-- {{ myCarts }} -->
<!-- {{ cartData }} -->
      <div id="divCartContainer">
            <div class="japCart" v-for="(cart, index) in myCarts" :key="index">
                <cart :cart="cart"/>
            </div>
      </div>
      
      
  </div>
</template>

<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'

import cart from '../components/cart'

export default {
    name: 'myCartsPage',
    components:{
        cart
    },
    data(){
        return{
            cartData: []
        }
    },
    methods:{

    },
    created(){
        this.$store.dispatch('fetchMyCarts')
    },
    computed:{
        ...mapGetters([
            'myCarts'
        ])
    }


}
</script>

<style scoped>
.japCart{
    /* border: solid 2px red; */

    /* margin-left:10%; */
    margin:auto;
    margin-top: 2%;
    width: 70%;
}

#divCartContainer{
    /* border: solid 2px red; */
    
    width:80%;
    height: 90vh;
    margin: auto;
    overflow: scroll;
}
#divCartContainer::-webkit-scrollbar{
    display: none;
}
</style>