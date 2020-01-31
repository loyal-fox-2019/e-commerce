<template>
  <div>
    <!-- {{cart}} -->
      <div>
        <b-card align="left">
            <template v-slot:header>
            <h4 class="mb-0 ">Seller : {{ cart.Seller[0].username }}</h4>
            </template>

            <b-card-body>
            <b-card-title>Total Transaction</b-card-title>
            <b-card-text style="color:red">
                Rp {{cart.totalBilled.toLocaleString('id')}}
            </b-card-text>

            </b-card-body>

              <table class="table">
                <thead class="japThead">
                  <tr>
                    <th scope="col">Trx Id</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">in Stock</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="div-hover" v-for="(tx, index) in cart.data" :key="index">
                    <td>{{ tx._id }}</td>
                    <td>{{ cart.itemList[index].name }}</td>
                    <td>Rp {{ tx.price.toLocaleString('id') }}</td>
                    <td>{{ tx.amount }}</td>
                    <td>{{ cart.itemList[index].stock }}</td>
                    <td>Rp {{ tx.total.toLocaleString('id') }}</td>
                    <td class="delete-hover">
                        <button type="button" 
                          class="btn btn-light btn-sm" 
                          @click.prevent="deleteTransaction( tx._id )"
                          >Delete
                        </button>
                    </td>
                  </tr>
                  
                </tbody>
              </table>

            <b-card-footer>
              <button class="btn btn-primary japButton" @click.prevent="checkoutThisCart" >Checkout This Cart</button>
            </b-card-footer>

        </b-card>
        </div>
        
  </div>
</template>

<script>
import axios from '../../config/axios'
import swal from 'sweetalert2'

export default {
    props:[
      'cart'
    ],
    data(){
      return{
          buyCount : this.setBuyCount
      }
    },
    methods:{
        checkoutThisCart(){
            // console.log(`TCL: checkoutThisCart -> this.cart`, this.cart)
            swal.fire({
                title: "Checkout This Cart",
                text: "Your Payment will be committed when you checkout",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: 'Checkout'
            })
            .then(result=>{
                if(result.value){
                    let txArray = []
                    this.cart.data.forEach(element => {
                        txArray.push(element._id)
                    });
                    // console.log(`TCL: checkoutThisCart -> txArray`, txArray)

                    axios({
                        method: 'post',
                        url: '/invoices/',
                        headers:{
                            token: localStorage.getItem('token')
                        },
                        data:{
                            TransactionId: txArray,
                            totalBilled: this.cart.totalBilled,
                            SellerId: this.cart.Seller[0]._id
                        }
                    })
                    .then( ({data}) =>{
                        // console.log(`TCL: checkoutThisCart -> data`, data)
                        swal.fire({
                            title: 'Your payment was concluded',
                            text: 'Thank you for purchasing with us. Invoice has been issued'
                        })
                        this.$store.dispatch('fetchMyCarts')
                    })
                    .catch( ({response}) =>{
                        console.log(' error @checkoutThisCart-cart.vue \n======================\n', response.data)
                        swal.fire(
                            'Error With Cart Checking Out',
                            response.data.message
                        )
                    })


                }
                  
            })
        },
        deleteTransaction(txId){
            swal.fire({
                title: 'Confirmation Needed',
                text: 'Delete this transaction?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonText: "Delete It"
            })
            .then(result=>{
                if(result.value){
                  axios({
                      method: 'delete',
                      url: `/transactions/${txId}`,
                      headers:{
                          token : localStorage.getItem('token')
                      }
                  })
                  .then( ({data}) =>{
                      swal.fire( 'Transaction has been deleted' )
                      this.$store.dispatch('fetchMyCarts')

                  })
                  .catch( ({response}) =>{
                      console.log(' error @deleteTransaction-cart \n======================\n', response.data)
                      swal.fire(
                          'Error With Deleting Transaction',
                          response.data.message
                      )
                  })
                }
                    
                
            })
        }
    },
    created(){
        // console.log(`TCL: created -> this.cart`, this.cart)
    },
    computed:{
        setBuyCount(){
            console.log(' \n======================\n amount',  this.cart.data[0].amount)
        }
    }


}
</script>

<style scoped>
.japButton{
    margin-left: 75%
}


.japThead{
    color:green;
    text-align: center;
}

td{
    text-align: center
}

.delete-hover 
{
    visibility: hidden;
    /* visibility: visible; */
}
.div-hover:hover .delete-hover
{
    visibility: visible
}

</style>