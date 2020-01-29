<template >
    <div class="templateDiv fade-in">
      <!-- <h4>homePage.vue</h4> -->
        <!-- <h1>{{ currentPage }}</h1> -->
        <!-- {{getEstimatedItemCount}} -->
      <div class="japPaginationDiv">
          <div class="overflow-auto">
              <div class="mt-3">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  align="right"
                  size="sm"
                  last-number
                  @change="fetchDataPaginated"/>
              </div>
          </div>  
      </div>

      <div class="japContentCardDiv1">
          <!-- start of Div Card Group -->
          <div class="row row-cols-1 row-cols-md-5 p-2 japContentCardDiv2" >
              <div v-for="item in itemContent" :key="item._id" >
                <smallCard 
                :itemDetail="item"/>
              </div>
            
        </div>
        <!-- end of Div Card Group -->
      </div>



    </div>
</template>




<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'
import smallCard from '../components/smallCard'

export default {
    name: 'homePage',
    components: {
        smallCard
    },
    data(){
        return{
            rows: this.getEstimatedItemCount,
            perPage: 20,
            currentPage: 1,
            itemContent:[]
        }
    },
    methods:{

        fetchDataPaginated(){
            axios({
                method: 'get',
                url: `/items/all/?page=${parseInt(this.currentPage)}&view=${this.perPage}`
            })
            .then( ({data}) =>{
                console.log(' data @fetchDataPaginated - homePage\n======================\n', data)
                this.itemContent = data
            })
            .catch( ({response}) =>{
                console.log(' error @fetchDataPaginated - homePage\n======================\n', response.data)
                swal.fire(
                    'Error With Getting Item Data',
                    response.data.message
                )
            })
        }
        
    },
    created(){
            axios({
                method: 'get',
                url: '/items/countAllItem'
            })
            .then( ({data}) =>{
                this.rows = data
                console.log(`TCL: getEstimatedItemCount -> data`, data)

                return this.fetchDataPaginated()
            })
            .catch( ({response}) =>{
                console.log(' error @getEstimatedItemCount -homePage\n======================\n', response.data.message)
            })
    },
    computed:{
        getEstimatedItemCount(){
            axios({
                method: 'get',
                url: '/items/countAllItem'
            })
            .then( ({data}) =>{
                this.rows = data
                console.log(`TCL: getEstimatedItemCount -> data`, data)
                // return data
                return this.fetchDataPaginated()
            })
            .catch( ({response}) =>{
                console.log(' error @getEstimatedItemCount -homePage\n======================\n', response.data.message)
            })
        }
    }




}
</script>



<style scoped>
.templateDiv{
  /* border:2px solid red; */
  /* height: fit-content */
  max-height: 110vh
  
}

.japPaginationDiv{
  /* border: 2px solid red; */
  width: 80vw;
  margin: auto
}
.japContentCardDiv1{
  /* border: 2px solid blue;  */
  width:80vw; 
  margin:auto; 
  text-align:center;
  max-height: 80vh;
  overflow: hidden;
  
}

.japContentCardDiv2{
  /* border:2px red solid;  */
  width:100%;  
  margin:auto;
  max-height: 80vh;
  overflow: scroll
}
.japContentCardDiv2::-webkit-scrollbar {
    display: none;
}



</style>
