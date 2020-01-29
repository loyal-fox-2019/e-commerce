<template>
  <div>
      <!-- <h4>product viwer</h4> -->
      <createEditItem :itemDetail="itemDetail"/>
  </div>
</template>




<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'

import createEditItem from '../components/createEditItem'

export default {
    name: 'productViewerPage',
    components:{
        createEditItem
    },
    data(){
        return{
            itemDetail:{}
        }
    },
    created(){
        axios({
            method: 'get',
            url: `/items/${this.$route.params.itemId}`
        })
        .then( ({data}) =>{
            this.itemDetail = data
        })
        .catch( ({response}) =>{
                console.log(' error @created-productViewerPage \n======================\n', response.data)
                swal.fire(
                    'Error With Getting Item Data',
                    response.data.message
                )
            })
    }

}
</script>

<style>

</style>