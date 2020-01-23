<template>
    <sui-item>
        <sui-item-image
                size="tiny"
                :src="data.itemDetails.image"/>
        <div class="middle aligned content">
            <h5>
                {{ data.itemDetails.name }}
            </h5>
            <div class="description">
                <p>
                    <sui-label color="green">{{ data.status }}</sui-label>
                </p>
                <p>
                    invoice : <span class="itemValue">{{ data._id }}</span><br>
                    transaction date : <span class="itemValue">{{ data.createdAt.split("T")}}</span><br>
                    Price : <span class="itemValue">Rp. {{ itemPrice }}</span><br>
                    Amount : <span class="itemValue">{{ data.itemAmount }}</span> item<br>
                    Total: Rp. <span class="itemValue">{{ totalPrice }}</span><br>
                </p>
                <sui-label id="confirm" color="blue">Confirm Item received</sui-label>
            </div>
        </div>
    </sui-item>
</template>

<script>
    export default {
        name: "transactionList",
        props: {
            data: Object
        },
        computed: {
            totalPrice() {
                this.$store.dispatch('currencyFormat', this.data.totalPrice);
                return this.$store.getters.currency
            },
            itemPrice() {
                this.$store.dispatch('currencyFormat', this.data.itemDetails.price);
                return this.$store.getters.currency
            },
        }
    }
</script>

<style scoped>
    #confirm{
        cursor: pointer;
    }

    .itemValue{
        font-weight: bold;
    }
</style>