<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">User ID</th>
          <th scope="col">Item ID</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data) in allData" :key="data.id">
          <th scope="row">{{data._id}}</th>
          <td>{{data.user_id}}</td>
          <td>{{data.item_id}}</td>
          <td>{{data.date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TransactionPage',
  computed: {
    allData() {
      return this.$store.state.transactionData
    }
  }
}
</script>
