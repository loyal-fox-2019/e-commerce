<template>
  <div>
      <b-modal
            id="modalEditInvoice"
            ref="modal"
            title="Update Invoice"
            okTitle="Update"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    {{ modalInvoice.invoiceId }}
                    <!-- {{ modalInvoice.updateAction }} -->
                    <b-form-group
                    :state="nameState"
                    label="Payment Confirmation"
                    label-for="name-input"
                    invalid-feedback="Please choose an option before saving"
                    v-if=" modalInvoice.updateAction === 'Confirm Payment' "
                    >
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                    </b-form-group>

                    <b-form-group
                    :state="nameState"
                    label="Input Resi Number"
                    label-for="name-input"
                    invalid-feedback="Please Input Resi Number"
                    v-if=" modalInvoice.updateAction === 'Input Resi#' "
                    >
                    <b-form-input
                        id="name-input"
                        v-model="resiNumber"
                        :state="nameState"
                        required
                    ></b-form-input>
                    </b-form-group>

                    <b-form-group
                    :state="nameState"
                    label="Delivery Confirmation"
                    label-for="name-input"
                    invalid-feedback="Please choose an option before saving"
                    v-if=" modalInvoice.updateAction === 'Confirm Delivery' "
                    >
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                    </b-form-group>


                </form>
        </b-modal>
  </div>
</template>

<script>
import axios from "../../config/axios"
import swal from "sweetalert2"
export default {
    props:[
        'modalInvoice'
    ],
    data(){
        return{
            selected: 'confirm',
            options: [
                { value: 'confirm', text: 'confirm' },
            ],
            resiNumber : '',
            nameState : ''
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
            this.selected = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            console.log(' \n======================\n OK OKOK OK OK OK ', this.modalInvoice.updateAction)
            console.log(' \n======================\n', this.selected)

            swal.fire({
                title : 'Update this Invoice',
                showCancelButton : true,
                confirmButtonText : 'Update'
            })
            .then(result=>{
                if(result.value){
                    let url = `/invoices/${this.modalInvoice.invoiceId}/`
                    let payload = { SellerId : true,
                                    invoiceStatus : 'inComplete' }
                    let data = {}
                    switch (this.modalInvoice.updateAction) {
                        case 'Confirm Payment':
                            url += 'Seller/paymentConfirmation'
                            data = { paymentConfirmation : this.selected }
                            break;
                        
                        case 'Input Resi#':
                            url += 'Seller/inputResi'
                            data = { resiNumber : this.resiNumber }
                            break;

                        case 'Confirm Delivery':
                            url += 'buyer/deliveryConfirmation'
                            data = { deliveryConfirmation : this.selected }
                            payload = { BuyerId : true,
                                        invoiceStatus : 'inComplete'}
                            break;
                    
                        default:
                            break;
                    }
                    // console.log(`TCL: handleSubmit -> url`, url)
                    // console.log(`TCL: handleSubmit -> payload`, payload)
                    // console.log(`TCL: handleSubmit -> data`, data)
                
                    axios({
                        method: 'patch',
                        url,
                        headers:{
                            token: localStorage.getItem('token')
                        },
                        data
                    })
                    .then( ({data}) =>{
                        console.log(`TCL: handleSubmit -> data`, data)
                        swal.fire('Invoice Has Been Updated')
                        this.$store.dispatch('fetchMyConditionedInvoices', payload)
                        this.$bvModal.hide('modalEditInvoice')
                    })
                    .catch( ({response}) =>{
                        this.$bvModal.hide('modalEditInvoice')
                        console.log(' error @handleSubmit-modalEditInvoice \n======================\n', response.data)
                        swal.fire(
                            'Error With Updating Invoice',
                            response.data.message
                        )
                    })

                }
            })
            



        },
        
    }

}
</script>

<style>

</style>