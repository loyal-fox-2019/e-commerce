<template>
  <div class="fade-in">
      <!-- <h4>dashboard incomplete invoice</h4> -->

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
                  <td style="border:none">
                      <!-- <b-button v-if="x%2 === 0" variant="outline-primary">update</b-button> -->
                      <b-button v-b-modal.modalEditInvoice
                      @click.prevent="setInvoiceId(x)">Update</b-button>
                  </td>
              </tr>

          </tbody>


      </table>
        <modalEditInvoice :invoiceId="invoiceId"/>
        <modalReadInvoice :invoiceId="invoiceId"/>


    </div>
  </div>
</template>

<script>
import modalEditInvoice from '../../components/modalEditInvoice'
import modalReadInvoice from '../../components/modalReadInvoice'

export default {
    components:{
        modalEditInvoice,
        modalReadInvoice
    },
    data() {
      return {
        selected: null,
        options:[
            {value:'', text:''},
            {value:'confirm', text:'confirm'}
        ],
        invoiceId:''
      }
    },
    methods:{
        setInvoiceId(payload){
            this.invoiceId = payload
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