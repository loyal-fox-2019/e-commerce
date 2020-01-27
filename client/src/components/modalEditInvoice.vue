<template>
  <div>
      <b-modal
            id="modalEditInvoice"
            ref="modal"
            title="Update Invoice"
            okTitle="save"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    {{ invoiceId }}
                    <b-form-group
                    :state="nameState"
                    label="Payment Confirmation"
                    label-for="name-input"
                    invalid-feedback="Please choose an option before saving"
                    >
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                    </b-form-group>

                    <b-form-group
                    :state="nameState"
                    label="Input Resi Number"
                    label-for="name-input"
                    invalid-feedback="Please Input Resi Number"
                    >
                    <b-form-input
                        id="name-input"
                        v-model="name"
                        :state="nameState"
                        required
                    ></b-form-input>
                    </b-form-group>

                    <b-form-group
                    :state="nameState"
                    label="Delivery Confirmation"
                    label-for="name-input"
                    invalid-feedback="Please choose an option before saving"
                    >
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                    </b-form-group>


                </form>
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
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
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

<style>

</style>