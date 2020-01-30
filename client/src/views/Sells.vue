<template>
    <sui-segment :class="isLoading">
        <sui-item-group divided id="purchasing-container">
            <transaction-list-sells
                    v-for="(sells,index) in sellsData"
                    :data="sells"
                    :index="index"
                    @sellsTransactions="sellsTransaction"/>
        </sui-item-group>
    </sui-segment>
</template>

<script>
    import transactionListSells from "../components/transactions/transactionListSells";

    export default {
        name: "sells",
        data() {
            return {
                purchasingData: [],
                isLoading: 'loading'
            }
        },
        methods: {
            sellsTransaction() {
                this.$axios({
                    method: 'get',
                    url: '/api/transactions/sells',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.sellsData = response.data.data;
                    this.isLoading = false
                }).catch(err => {
                    console.log({err})
                })
            }
        },
        mounted() {
            this.sellsTransaction()
        },
        components: {
            transactionListSells
        }
    }
</script>

<style scoped>

</style>