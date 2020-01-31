<template>
  <div class='fade-in'>
      <!-- <h4>myShopPage</h4>  -->
<!-- {{ userDetail._id }} -->
<!-- {{ loggedInUserDetail._id }} -->
       <div id="divMasterContainer" class="row">
            <div id="divUserProfileContainer" class="col-3">
                <div class="card" style="width: 100%; text-align:center">
                    <img v-if=" userDetail.profilePicture " :src="userDetail.profilePicture" alt="" class="card-img-top userProfilePicture">
                    <img v-if=" !userDetail.profilePicture " src="../assets/blankProfilePicture/default-profile.png" class="card-img-top userProfilePicture" alt="...">
                    <div class="card-body">
                    <h4 class="card-title" >{{ userDetail.fullName}}</h4>
                    <p class="card-text">{{ userDetail.description }}</p>
                    <p class="card-text"><small class="text-muted">{{ userDetail.email }}</small></p>
                    </div>
                </div>
                <div id="divExtraButton" v-if="userDetail._id === loggedInUserDetail._id">
                    <button type="button" 
                        class="btn btn-outline-success btn-large" 
                        @click.prevent="goToProductPage">Add Product
                    </button>
                </div>
            </div>


            <div id="divUserDataContainer" class="col-8">
            <div class="card-columns" id="divCardColumn">
                <div v-for="item in userShopItem" :key="item._id">
                    <smallCard :itemDetail="item"/>
                </div>
            </div>
            </div>
            
        </div>

  </div>
</template>

<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'

import smallCard from '../components/smallCard'

export default {
    name: 'userShopPage',
    components:{
        smallCard
    },
    data(){
        return {
            userDetail:{},
            userShopItem: []
        }
    },
    methods:{
        setAllToDefault(){
            this.userDetail = {}
            this.userShopItem = []
        },
        goToProductPage(){
            this.$router.push('/product/create')
        },
        queryUserDetail(){
            axios({
                method: 'get',
                url: `/users/${this.$route.params.sellerId}`
            })
            .then( ({data}) =>{
                this.userDetail = data
            })
            .catch( ({response}) =>{
                console.log(' error @queryUserDetail-userShopPage \n======================\n', response.data)
                swal.fire(
                    'Error Getting User Detail',
                    response.data.message
                )
            })
        },
        queryUserItems(){
            axios({
                method: 'get',
                url: `/items/all/${this.$route.params.sellerId}`,
            })
            .then( ({data}) =>{
                this.userShopItem = data
            })
            .catch( ({response}) =>{
                console.log(' error @queryUserItems-userShopPage \n======================\n', response.data)
                swal.fire(
                    'Error Getting User Item',
                    response.data.message
                )
            })
        }
    },
    created(){
        this.setAllToDefault()
        this.queryUserDetail()
        this.queryUserItems()
    },
    computed:{
        ...mapGetters([
            'loggedInUserDetail'
        ])
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

    margin-top: 5%;
    width: 100%;
    height: 85vh;
}

.userProfilePicture{
    width: 100%;
    height: auto;
}

</style>