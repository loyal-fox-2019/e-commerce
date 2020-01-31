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
            size="lg"
            >
            <div id="divModalContainer" >
                <b-card align="left">
                    <template v-slot:header>
                    <h4 class="mb-0 " v-if="user === 'seller'">Buyer : {{ invoiceDetail.BuyerId.username }}</h4>
                    <h4 class="mb-0 "  v-if="user === 'buyer'">Seller : {{ invoiceDetail.SellerId.username }}</h4>
                    </template>
<!-- {{invoiceDetail}} -->
                    <b-card-body>
                    <b-card-title>Total Transaction</b-card-title>
                    <b-card-text style="color:red">
                        Rp {{invoiceDetail.totalBilled.toLocaleString('id')}}
                    </b-card-text>

                    </b-card-body>

                    <table class="table ">
                        <thead class="japThead">
                        <tr>
                            <th class="japThead">Trx Id</th>
                            <th class="japThead">Item</th>
                            <th class="japThead">Price</th>
                            <th class="japThead">Quantity</th>
                            <th class="japThead">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="div-hover" v-for="(tx, index) in invoiceDetail.TransactionId" :key="index">
                            <td>{{ tx._id }}</td>
                            <td>{{ tx.ItemId.name }}</td>
                            <td>Rp {{ tx.price.toLocaleString('id') }}</td>
                            <td>{{ tx.amount }}</td>
                            <td>Rp {{ tx.total.toLocaleString('id') }}</td>
                        </tr>
                        
                        </tbody>
                    </table>

                    <!-- <b-card-footer>
                        <button class="btn btn-primary japButton" @click.prevent="checkoutThisCart" >Checkout This Cart</button>
                    </b-card-footer> -->
                </b-card>

            </div>
        </b-modal>
  </div>
</template>

<script>
export default {
    props:[
        'invoiceDetail',
        'user'
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

.japThead{
    color:green;
    text-align: center;
}

td{
    text-align: center
}

</style>