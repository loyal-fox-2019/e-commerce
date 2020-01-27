<template >
    <div class="templateDiv fade-in">
      <!-- <h4>homePage.vue</h4> -->

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
                  @change="fetchData"/>
              </div>
          </div>  
      </div>

      <div class="japContentCardDiv1">
          <!-- start of Div Card Group -->
          <div class="row row-cols-1 row-cols-md-5 p-2 japContentCardDiv2" >
              <div v-for="item in perPage" :key="item" >
                <smallCard/>
              </div>
            
        </div>
        <!-- end of Div Card Group -->
      </div>



    </div>
</template>




<script>
import smallCard from '../components/smallCard'

export default {
    name: 'homePage',
    components: {
        smallCard
    },
    data(){
        return{
            rows: 200,
            perPage: 20,
            currentPage: 2
        }
    },
    methods:{
        fetchData(){
            console.log(' \n======================\n ketrgirer')
        },
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