<template>
   <div class="fade-in">
      <!-- <h4>dashboard transaction history</h4> -->

      <div style="margin-top:1%">
          
      <table id="japTableInvoice">
          <thead>
              <th>Cart Id</th>
              <th>Created Date</th>
              <th>Seller</th>
              <th>Total Billed</th>
              <th>Payment Status</th>
              <th>Payment Confirmation</th>
              <th>#Resi Number</th>
              <th>Delivery Confirmation</th>
              <th>Invoice Status</th>
              <th>Completed Date</th>

          </thead>

          <tbody v-for="x in 20" :key="x">
              <tr>
                  <td><a href="#" v-b-modal.modalReadInvoice 
                          @click.prevent="setInvoiceId(x)"> 1313132132</a>
                  </td>
                  <td>01-01-2020</td>
                  <td>Jap</td>
                  <td>1500000</td>
                  <td>paid</td>
                  <td>confirm</td>
                  <td>123412421</td>
                  <td>confirm</td>
                  <td>complete</td>
                  <td>20/02/2020</td>
              </tr>

          </tbody>


      </table>
        <modalReadInvoice :invoiceId="invoiceId"/>


    </div>
  </div>
</template>

<script>
import modalReadInvoice from '../../components/modalReadInvoice.vue'
export default {
    components:{
        modalReadInvoice
    },
    data(){
        return{
            invoiceId: ''
        }
    },
    methods:{
        setInvoiceId(invoiceId){
            this.invoiceId = invoiceId
        }
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