<template>
  <div class='fade-in'>
      <!-- <h4>myShopPage</h4>  -->

       <div id="divMasterContainer" class="row">
            <div id="divUserProfileContainer" class="col-3">
                <div class="card" style="width: 100%; text-align:center">
                    <img src="../assets/personFace/5db1b5caadcfe2faf915c392_hero-hp - crop.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title" >anna de armas</h4>
                    <p class="card-text">lalilala</p>
                    <p class="card-text"><small class="text-muted">anadearmas@mail.com</small></p>
                    </div>
                </div>
                <div id="divExtraButton">
                    <button type="button" 
                        class="btn btn-outline-success btn-large" 
                        @click.prevent="goToProductPage">Add Product
                    </button>
                </div>
            </div>


            <div id="divUserDataContainer" class="col-8">
            <div class="card-columns" id="divCardColumn">
                <div v-for="x in 20" :key="x">
                    <smallCard/>
                </div>
            </div>
            </div>
            
        </div>

  </div>
</template>

<script>
import smallCard from '../components/smallCard'
export default {
    name: 'myShopPage',
    components:{
        smallCard
    },
    methods:{
        goToProductPage(){
            this.$router.push('/product/create')
        }
    }

}
</script>

<style scoped>
#divMasterContainer{
    /* border: dashed 2px grey; */

    margin:auto;
    width: 95%;
    height: 90vh;
    overflow: hidden;
}

#divUserProfileContainer{
    /* border: solid 2px blue; */

    display: inline-block;
    margin-left: 1%;
    margin-right: 1%;
    height:100%;
    width: auto;
}

#divUserDataContainer{
    /* border: solid 2px purple; */

    width: 100%;
    height: 90vh;
    overflow: scroll;
}
#divUserDataContainer::-webkit-scrollbar {
    display: none;
}

#divExtraButton{
    /* border: solid 2px red; */

    width: 100%;
    height: 85vh;
}
</style>