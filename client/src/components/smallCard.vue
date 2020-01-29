<template>
  <div class='japSmallCardDiv'>
<!-- <p> {{ loggedInUserDetail._id }}</p> -->
<!-- <p> {{ itemDetail.SellerId._id }} </p> -->

      <div class="div-hover">
        <b-card 
            img-alt="Image" 
            img-top
            >
            
            <div v-if="itemDetail.SellerId._id === loggedInUserDetail._id" style="width:8%; height:15%; position:absolute; top:4%; right:4%; ">
                <div class="edit-hover">
                <button 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" aria-label="Close"
                    @click.prevent="goToProductEdit">
                    <font-awesome-icon icon="edit" class="edit-hover" />
                </button>
                </div>
            </div>
            
            <div  @click.prevent="goToProductViewer">
                <div style="width:auto; height:20vh; border-bottom:dotted 1px grey; overflow:hidden">
                    

                    <img v-if="itemDetail.image" :src="itemDetail.image" style="width:auto; height:20vh" alt="">
                    <img v-if="!itemDetail.image" src="../assets/blankItemPicture/no-image-icon-13.png" style=" width:auto; height:100%" alt="">
                </div>
                <b-card-text>
                    <h5>{{ itemDetail.name }}</h5>
                </b-card-text>
                <b-card-text>
                    Rp. {{itemDetail.price.toLocaleString('id')}}
                </b-card-text>
            </div>

            <template v-slot:footer>
                <a href="#">
                    <small style="color:#c61bf5" @click.prevent="goToUserAllProduct"> @{{ itemDetail.SellerId.username}}</small>
                </a>
            </template>

        </b-card>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
    name: 'comp-SmallCard',
    props:[
        'itemDetail'
    ],
    methods:{
        goToProductViewer(){
            this.$router.push(`/product/purchase/${this.itemDetail._id}`)
        },
        goToProductEdit(){
            this.$router.push(`/product/edit/${this.itemDetail._id}`)
        },
        goToUserAllProduct(){
            this.$router.push(`/userShop/${this.itemDetail.SellerId._id}`)
        },
        
    },
    computed:{
        ...mapGetters([
            'loggedInUserDetail'
        ])
    }

}
</script>




<style scoped>
.japSmallCardDiv{
    margin:1%
}
.edit-hover 
{
    visibility: hidden;
    /* visibility: visible; */
}
.div-hover:hover .edit-hover
{
    visibility: visible
}


</style>