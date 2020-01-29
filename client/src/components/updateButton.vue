<template>
    <div>
        <b-button v-b-modal.modalEditInvoice
            @click.prevent="$emit('openModal', { invoiceId : invoice._id, updateAction})">
            {{ updateAction }}
            <!-- {{ invoice._id }} -->
        </b-button>

    </div>
</template>

<script>
import axios from '../../config/axios'
import { mapGetters } from 'vuex'

export default {
    props:[
        'invoice'
    ],  
    name: 'updateButton',
    computed:{
        ...mapGetters([
            'loggedInUserDetail'
        ]),
        updateAction(){
            if( this.invoice.SellerId._id === this.loggedInUserDetail._id ){
                switch (this.invoice.invoiceStatus) {
                    case 'Waiting for Payment Confirmation': return 'Confirm Payment'; break;
                    case 'in Progress to Deliver Product': return 'Input Resi#'; break;
                        
                    default: break;
                }
            }
            else if( this.invoice.BuyerId._id === this.loggedInUserDetail._id ){
                if( this.invoice.invoiceStatus === "Delivering, waiting for Delivery Confirmation")
                    return 'Confirm Delivery'
            }
            

        }
    }

}
</script>

<style>

</style>