<template>
  <div class="fade-in">
      <h4 style="color:green; margin-top:1%">Transaction History</h4>
        <!-- {{ myConditionedInvoices.length }} -->
      <div style="margin-top:1%">
      <table id="japTableInvoice">
          <thead>
              <th>Cart Id</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Seller</th>
              <th>Total Billed</th>
              <th>Payment Status</th>
              <th>Payment Confirmation</th>
              <th>#Resi Number</th>
              <th>Delivery Confirmation</th>
              <th>Invoice Status</th>

          </thead>

          <tbody v-for="invoice in myConditionedInvoices" :key="invoice._id">
              <tr>
                  <td><a href="#" v-b-modal.modalReadInvoice 
                          @click.prevent="setInvoiceDetail(invoice)">{{ invoice._id }}</a>
                  </td>
                  <td>{{ invoice.createdAt.split('.')[0].replace('T', '; ')}}</td>
                  <td>{{ invoice.updatedAt.split('.')[0].replace('T', '; ')}}</td>
                  <td>{{ invoice.SellerId.username}}</td>
                  <td>Rp. {{ invoice.totalBilled.toLocaleString('id') }}</td>
                  <td>paid</td>
                  <td>{{ invoice.paymentConfirmation || ''}}</td>
                  <td>{{ invoice.resiNumber || '' }}</td>
                  <td>{{ invoice.deliveryConfirmation || '' }}</td>
                  <td>{{ invoice.invoiceStatus }}</td>
              </tr>

          </tbody>


      </table>
        <modalReadInvoice :invoiceDetail="invoiceDetail" :user="'buyer'"/>


    </div>
  </div>
</template>

<script>
import modalReadInvoice from '../../components/modalReadInvoice'
import { mapGetters } from 'vuex'

export default {
    components:{
        modalReadInvoice,
    },
    data() {
      return {
        invoiceId:'',
        invoiceDetail:''
      }
    },
    methods:{
        setInvoiceDetail(payload){
            console.log(`TCL: setInvoiceDetail -> payload`, payload)
            this.invoiceDetail = payload
        }
    },
    created(){
        this.$store.dispatch('fetchMyConditionedInvoices', {
            BuyerId : true,
            invoiceStatus : 'Complete'
        })
    },
    computed:{
        ...mapGetters([
            'myConditionedInvoices',
        ])
    }
}
</script>


<style scoped>
#japTableInvoice{
    /* border: solid 2px red; */
    margin: auto;
    font-family: 'Mukta', sans-serif;
}

table, th, td{
    padding: 10px;
    border: 1px solid black; 
    border-collapse: collapse;
    border-radius: 2px;
    /* background-color: #e5e5e5; */
    text-align: center;
}
table{
    border-right: 0;
    /* border-bottom: 0 */
}

th{
    color: white;
    font-weight: 100;
    font-family: 'Mukta', sans-serif;
    background-color: rgb(97, 100, 96);

}

</style>