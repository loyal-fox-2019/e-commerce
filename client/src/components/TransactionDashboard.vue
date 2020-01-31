<template>
  <div class="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
    <div class="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
      <div class="border-b">
        <div class="flex justify-between px-6 -mb-px">
          <h3 class="text-blue-dark py-4 font-normal text-lg">{{ title }}</h3>
        </div>
      </div>

      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-1 py-2">ID</th>
            <th class="px-1 py-2">Status</th>
            <th class="px-1 py-2">Buyer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td class="border px-1 py-2"><a @click="toTransactionDashboardDetail(transaction._id)" href="#" class="px-1 py-1 text-red-500 hover:text-red-600 focus:outline-none focus:shadow-outline h-10 mt-2 text-right text-grey">{{ transaction._id }}</a></td>
            <td class="border px-1 py-2">{{ transaction.status }}</td>
            <td class="border px-1 py-2">{{ transaction.buyer.email }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionDashboard",
  props: {
    transactions: Array,
    title: String
  },
  methods: {
    toTransactionDashboardDetail(id) {
      this.$emit('to-transaction-dashboard-detail', id)
    }
  }
}
</script>

<style>

</style>