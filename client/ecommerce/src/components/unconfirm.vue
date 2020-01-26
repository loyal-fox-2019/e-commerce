<template>
<div>
    <b-row class="animated fadeInUp">
        <b-col cols='2'>
            {{unconfirmbuy.inventoryId.name}}
        </b-col>
        <b-col cols='3'>
            {{unconfirmbuy.date_checkout.toLocaleString()}}
        </b-col>
        <b-col cols='2'>
            {{unconfirmbuy.amount}}
        </b-col>
        <b-col cols='3'>
            <b-button id="outs" variant="success" @click="confirmdeliv">Confirm</b-button>
        </b-col>
    </b-row>
    <hr>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['unconfirmbuy'],
  methods: {
    confirmdeliv: function () {
      axios({
        url: 'http://localhost:3000/carts/history/user/' + this.unconfirmbuy._id,
        method: 'PATCH',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.$emit('confirmdelivery')
        })
    }
  }

}
</script>

<style>

</style>
