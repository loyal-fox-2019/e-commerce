<template>
  <div class='japSmallCardDiv'>
        <b-card 
            title="Title" 
            img-src="https://picsum.photos/300/300/?image=41"
            img-alt="Image" 
            img-top
            @click.prevent="goToProductViewer">
            <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
            </b-card-text>
            <template v-slot:footer>
            <small class="text-muted">Last updated 3 mins ago</small>
            </template>
        </b-card>
  </div>
</template>



<script>
export default {
    name: 'comp-SmallCard',
    methods:{
        goToProductViewer(){
            this.$router.push('/product/purchase')
        }
    }

}
</script>




<style scoped>
.japSmallCardDiv{
    margin:1%
}


</style>