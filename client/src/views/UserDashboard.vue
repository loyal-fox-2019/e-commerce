<template>
  <div class="font-sans bg-gray-200 flex flex-col min-h-screen w-full">
    <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
      <div class="bg-white sm:border-l sm:border-r sm:rounded shadow mb-6">
        <div class="hidden lg:flex">
          <div @click="showProducts = true, showTransactions = false, title = 'Products'" class="cursor-pointer w-1/2 text-center py-8">
            <div class="border-r">
              <div class="text-grey-darker mb-2">
                <span class="text-5xl">{{ products.length }}</span>
              </div>
              <div class="text-sm uppercase text-grey tracking-wide">
                Products
              </div>
            </div>
          </div>
          <div @click="showTransactions = true, showProducts = false, title = 'Transactions'" class="cursor-pointer w-1/2 text-center py-8">
            <div>
              <div class="text-grey-darker mb-2">
                <span class="text-5xl">{{ transactions.length }}</span>
              </div>
              <div class="text-sm uppercase text-grey tracking-wide">
                Transactions
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4">
        <TransactionDashboard
          v-if="showTransactions"
          :transactions="transactions"
          :title="title"
          @to-transaction-dashboard-detail="toTransactionDashboardDetail"
        />
        <ProductDashboard
          v-if="showProducts"
          :products="products"
          :title="title"
          @to-product-form="showForm = true,
            showTransactionDetail = false,
            showProductDetail = false"
          @to-product-dashboard-detail="toProductDashboardDetail"
        />
        <TransactionDashboardDetail
          v-if="showTransactionDetail"
          :transaction="transaction"
          @fetch-transactions="fetchTransactions"
        />
        <ProductDashboardDetail
          v-if="showProductDetail"
          @to-product-form="showForm = true,
            showTransactionDetail = false,
            showProductDetail = false"
          @fetch-products="fetchProducts"
          :product="product"
        />
        <ProductForm
          v-if="showForm"
          @fetch-products="fetchProducts"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductDashboard from '@/components/ProductDashboard'
import TransactionDashboard from '@/components/TransactionDashboard'
import TransactionDashboardDetail from '@/components/TransactionDashboardDetail'
import ProductDashboardDetail from '@/components/ProductDashboardDetail'
import ProductForm from '@/components/ProductForm'

export default {
  name: 'UserDashboard',
  components: {
    ProductDashboard,
    TransactionDashboard,
    ProductDashboardDetail,
    TransactionDashboardDetail,
    ProductForm
  },
  data() {
    return {
      showTransactions: false,
      showProducts: true,
      showTransactionDetail: false,
      showProductDetail: true,
      showForm: false,
      title: 'Products',
      products: [],
      transactions: [],
      product: {},
      transaction: {}
    }
  },
  methods: {
    fetchProducts() {
      if (String(localStorage.getItem('isAdmin')) === 'false') {
        this.$axios.get('products/all/own', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.products = data
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
      } else {
        this.$axios.get('products', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.products = data
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
      }
    },
    fetchTransactions() {
      if (String(localStorage.getItem('isAdmin')) === 'false') {
        this.$axios.get('transactions/all/own', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.transactions = data
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
      } else {
        this.$axios.get('transactions', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            this.transactions = data
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
      }
    },
    toProductDashboardDetail(id) {
      this.showProductDetail = true
      this.showTransactionDetail = false
      this.showForm = false
      this.$axios.get(`products/${id}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            this.product = data
            console.log(this.product, 'INI THIS PRODUCT')
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
    },
    toTransactionDashboardDetail(id) {
      this.showProductDetail = false
      this.showTransactionDetail = true
      this.showForm = false
      this.$axios.get(`transactions/${id}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            this.transaction = data
            console.log(this.transaction)
          })
          .catch(err => {
            this.$swal.fire({
              title: 'Error!',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'Close'
            })
          })
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchTransactions()
  }
}
</script>

<style>

</style>