<template>
    <sui-card-content>
        <sui-grid :columns="1">
            <sui-grid-column>
                <h1>Transactions Lists</h1>
                <sui-button-group>
                    <sui-button @click="goToPurchasing" color="red" content="Purchasing" :class="purchasedSelect"/>
                    <sui-button @click="goToSells" color="green" content="Sells" :class="sellsSelect"/>
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
            return {
                purchasedSelect:'',
                sellsSelect:'',
            }
        },
        methods: {
            goToPurchasing() {
                this.purchasedSelect='';
                this.sellsSelect='basic';
                this.$router.push("/transactions/purchasing")
            },
            goToSells() {
                this.purchasedSelect='basic';
                this.sellsSelect='';
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