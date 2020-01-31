<template>
    <div class="p-3 fade-in">
        <div class="alert alert-primary" role="alert" v-if="searchItemArray.length>0">
           showing {{ searchItemArray.length }} result
         </div>
        <div class="alert alert-danger mx-4 my-2" role="alert" v-if="searchItemArray.length === 0">
           no result
         </div>

        <!-- start of div content small card -->
            <div id="divSmallCardContainer" class="p-3">
                <div id="divSmallCardContent" class="row row-cols-1 row-cols-md-5" >

                    <div v-for="(itemDetail, index) in searchItemArray" :key="index">
                        <smallCard :itemDetail="itemDetail"/>
                    </div>

                </div>
            </div>
        <!-- end of div content small card -->


    </div>
</template>




<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'
import { mapGetters } from 'vuex'

import smallCard from '../components/smallCard'

export default {
    name:'filterResultPage',
    components:{
        smallCard
    },
    computed:{
        ...mapGetters([
            'searchItemArray'
        ])
    }

}
</script>




<style scoped>
#divSmallCardContainer{
    /* border: 2px solid red; */
    
    height: 85%;
    overflow: hidden;
}
#divSmallCardContent{
    /* border:2px solid blue; */
    
    width: 100%;
    height: 85vh;
    overflow: scroll;
}
#divSmallCardContent::-webkit-scrollbar{
    display: none;
}


</style>