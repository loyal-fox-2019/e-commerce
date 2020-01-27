<template>
  <div>
      <h1>Ongoing Carts</h1>

      <div id="divCartContainer">
            <div class="japCart" v-for="x in 4" :key="x">
                <cart/>
            </div>
      </div>
      
      
  </div>
</template>

<script>
import cart from '../components/cart'

export default {
    name: 'myCartsPage',
    components:{
        cart
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