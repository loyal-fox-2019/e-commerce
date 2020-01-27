<template>
    <div class="p-3 fade-in">
        <div class="alert alert-primary" role="alert" v-if="">
           showing 10 result
         </div>
        <div class="alert alert-danger mx-4 my-2" role="alert" v-if="filterResult.length === 0">
           no result
         </div>

        <!-- start of div content small card -->
            <div id="divSmallCardContainer" class="p-3">
                <div id="divSmallCardContent" class="row row-cols-1 row-cols-md-5" >

                    <div v-for="x in 20" :key="x">
                        <smallCard />
                    </div>

                </div>
            </div>
        <!-- end of div content small card -->


    </div>
</template>




<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import smallCard from '../components/smallCard'

export default {
    name:'filterResultPage',
    components:{
        smallCard
    },
    data(){
        return{
            filterResult:{}
        }
    },
    methods:{
        setFilterResult(data){
            this.filterResult = data
        },
        findFilteredResult(){
            axios({
                method: 'post',
                url: '/articles/filter',
                headers:{
                    token: localStorage.getItem('token')
                },
                data: this.searchPayload
            })
            .then( ({data})=>{
                // console.log(' \n======================\n DATA at fileter', data)
                this.setFilterResult(data)
            })
            .catch( ({response})=>{
                console.log(`error @findFilteredResult - findResultPage.vue \n=========================================\n`, response.data.message)
                swal.fire(
                    "Error",
                    response.data.message,
                    'error'
                )
            })
        }
    },
    created(){
        // this.findFilteredResult()
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