<template>
  <div>
    <NavigationBar />
    <h4>Transaction History</h4>
      <p class="col-md-3">Products</p>
      <p class="col-md-2">Status</p>
      <p class="col-md-3">Date</p>
      <p class="col-md-2" v-if='!isAdmin'>Confirm</p>
      <p class="col-md-2" v-if='isAdmin'>Buyer</p>
    <div v-for='transaction in transactions' :key='transaction._id'>
      <p class="col-md-3 text-justify">
        <span v-for='product in transaction.products' :key='product._id'>
          {{product.quantity}} {{product.productId.name}}
        </span>
      </p>
      <p class="col-md-2">{{transaction.status}}</p>
      <p class="col-md-3">
        {{transaction.createdAt.split('T')[0]}} 
        {{transaction.createdAt.split('T')[1].split('.')[0]}}
      </p>
      <p class="col-md-2" v-if='!isAdmin'>
        <button v-if='transaction.status != "delivered"' @click='confirm(transaction._id)' class='btn btn-primary'>Confirm</button>
      </p>
      <p class="col-md-2" v-if='isAdmin'>
        {{transaction.userId.username}}
      </p>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
export default {

  name: 'TransactionPage',
  components: {
    NavigationBar
  },
  data () {
    return {
    }
  },
  methods: {
    confirm(transactionId){
      this.$axios({
        method: 'PATCH',
        url: `/transactions/${transactionId}`,
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
      .then(() => {
        this.$store.dispatch('getTransaction')
      })
      .catch((err) => {
        this.$swal.fire({
          icon: 'error',
          html: err.response.data.message
        })
      })
    }
  },
  created(){
    if (this.$store.state.isAdmin){
      this.$store.dispatch('getAllTransaction')
    }
    else {
      this.$store.dispatch('getTransaction')
    }
  },
  computed: {
    transactions(){
      return this.$store.state.transactions
    },
    isAdmin(){
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style lang="css" scoped>
p{
  display: inline-block;
}
span{
  display: block;
}
.col-md-3{
  min-width: 25%;
}
</style>