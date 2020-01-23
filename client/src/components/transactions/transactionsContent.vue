<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Transactions Lists</h1>
                <sui-item-group divided>
                    <transaction-list
                            v-for="(purchased,index) in purchasingData"
                            :data="purchased"
                            :index="index"/>
                </sui-item-group>
            </sui-grid-column>
        </sui-grid>
    </sui-card-content>
</template>

<script>
    import transactionList from "./transactionList";

    export default {
        name: "transactionsContent",
        data() {
            return {
                purchasingData: []
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
                    this.purchasingData = response.data.data
                }).catch(err => {
                    console.log({err})
                })
            }
        },
        mounted() {
            this.purchaseTransaction()
        },
        components: {
            transactionList
        }
    }
</script>

<style scoped>

</style>