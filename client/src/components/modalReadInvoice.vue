<template>
  <div>
      <b-modal
            id="modalReadInvoice"
            ref="modal"
            title="Invoice Detail"
            ok-only
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            
            >
            <div id="divModalContainer">
                <div>
                    <h3>Cart Id</h3>
                    <p>123123123</p>
                </div>

                <div>
                <h5>Transaction List</h5>
                
                <table id="japTableInvoice">
                    <thead>
                        <th>Tx Id</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Seller</th>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Tx123</td>
                            <td>penggaris</td>
                            <td>3000</td>
                            <td>4</td>
                            <td>12000</td>
                            <td>jap</td>
                        </tr>
                        <tr>
                            <td>Tx123</td>
                            <td>penggaris</td>
                            <td>3000</td>
                            <td>4</td>
                            <td>12000</td>
                            <td>jap</td>
                        </tr>
                        <tr>
                            <td>Tx123</td>
                            <td>penggaris</td>
                            <td>3000</td>
                            <td>4</td>
                            <td>12000</td>
                            <td>jap</td>
                        </tr>
                    </tbody>

                </table>
                <div style="margin-top:5%; float:right">
                    <h5>Grand Total</h5>
                    <h4>15000000</h4>
                </div>
            </div>

        </div>


        </b-modal>
  </div>
</template>

<script>
export default {
    props:[
        'invoiceId'
    ],
    data(){
        return{
            selected: null,
            options: [
            { value: '', text: '' },
            { value: 'confirm', text: 'confirm' },
            ]
        }
    },
    methods:{
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        // handleOk(bvModalEvt) {
        //     // Prevent modal from closing
        //     bvModalEvt.preventDefault()
        //     // Trigger submit handler
        //     this.handleSubmit()
        // },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
            return
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
            })
        }
    }

}
</script>

<style scoped>

#japTableInvoice{
    /* border: solid 2px red; */
    /* margin: auto; */
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