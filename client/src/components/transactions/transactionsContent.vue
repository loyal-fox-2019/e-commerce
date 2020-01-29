<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Transactions Lists</h1>
                <sui-button-group>
                    <sui-button @click="goToPurchasing" color="red" content="Purchasing" inverted/>
                    <sui-button @click="goToSells" color="green" content="Sells" inverted/>
                </sui-button-group>
                <router-view/>
            </sui-grid-column>
        </sui-grid>
    </sui-card-content>
</template>

<script>
    export default {
        name: "transactionsContent",
        data() {
            return {}
        },
        methods: {
            goToPurchasing() {
                this.$router.push("/transactions/purchasing")
            },
            goToSells() {
                this.$router.push("/transactions/sells")
            }
        },
        mounted() {
            this.goToPurchasing()
        },
        components: {}
    }
</script>

<style scoped>

</style>