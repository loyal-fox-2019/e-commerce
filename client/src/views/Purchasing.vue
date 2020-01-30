<template>
    <sui-segment :class="isLoading">
        <sui-item-group divided id="purchasing-container">
            <transaction-list
                    v-for="(purchased,index) in purchasingData"
                    :data="purchased"
                    :index="index"
                    @listTransactions="purchaseTransaction"/>
        </sui-item-group>
    </sui-segment>
</template>

<script>
    import transactionList from "../components/transactions/transactionList";

    export default {
        name: "purchasing",
        data() {
            return {
                purchasingData: [],
                isLoading: 'loading'
            }
        },
        methods: {
            purchaseTransaction() {
                this.$axios({
                    method: 'get',
                    url: '/api/transactions/purchased',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }).then(response => {
                    this.purchasingData = response.data.data;
                    this.isLoading = false
                }).catch(err => {
                    console.log({err})
                })
            }
        },
        mounted() {
            this.purchaseTransaction();
        },
        components: {
            transactionList
        }
    }
</script>

<style scoped>

</style>