<template>
    <div class="card my-4">
           <h5 class="card-header">Transaction</h5>
           <div class="card-body">
             <div class="row justify-content-between">
             <p class="mx-4">ID : {{history._id}} </p>
            </div>
            <div class="row">
              <p class="mx-4">created at: {{history.created_at.slice(0,10)}}</p>
            </div>
            <div class="row">
                <p class="mx-4">Total Purchase: ${{history.price}}</p>
            </div>
            <div class="row">
               <a
                class="mx-4"
                href
                v-if="history.status == 'On Delivery'"
                @click.prevent="confirm(history._id)"
              >Confirm Arrival</a>
              <a
                class="mx-4"
                href
                @click.prevent="detail(history._id)"
              >Detail Transaction</a>
            </div>
          </div>
    </div>
</template>


<script>
export default {
  props:['history'],
  methods:{
    confirm(id){
      console.log(id)
      this.$emit('setUpdate',id)
    },
    detail(id){
      this.$emit('setDetail',id)
    }
  }
}
</script>
