<template>
  <div>
      <b-row class="animated fadeInUp">
          <b-col cols='2'>
              {{historycus.userId.first_name}}
          </b-col>
          <b-col cols='2'>
              {{historycus.inventoryId}}
          </b-col>
          <b-col cols='1'>
              {{historycus.amount}}
          </b-col>
          <b-col cols='3'>
              {{historycus.date_add.toLocaleString()}}
          </b-col>
          <b-col cols='3'>
              {{new Date(historycus.date_checkout).toLocaleString()}}
          </b-col>
          <b-col cols="1">
              {{confirm}}
          </b-col>
      </b-row>
      <hr>
  </div>
</template>

<script>
export default {
  props: ['historycus'],
  computed: {
    confirm: function () {
      if (this.historycus.delivery) {
        return 'Confirm'
      }
      if (!this.historycus.delivery) {
        return 'Unconfirm'
      } else {
        return 'Unconfirm'
      }
    }
  }

}
</script>

<style>

</style>
