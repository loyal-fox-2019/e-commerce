<template>
    <sui-item>
        <sui-item-image
                size="tiny"
                :src="data.item.image"/>
        <div class="middle aligned content">
            <h5>
                {{ data.item.name }}
            </h5>
            <div class="description">
                <p>
                    Total: Rp. {{ totalPrice }}<br>
                    Amount : {{ data.stock }} item
                </p>
            </div>
            <div class="extra">
                <sui-button icon="check" basic primary/>
                <sui-button icon="remove" basic negative @click="removeFromCart"/>
            </div>
        </div>
    </sui-item>
</template>

<script>
    export default {
        name: "chartList",
        props: {
            data: Object,
            index: Number
        },
        methods: {
            removeFromCart() {
                this.$emit('remove', this.index)
            }
        },
        computed: {
            totalPrice() {
                this.$store.dispatch('currencyFormat', this.data.totalPrice);
                return this.$store.getters.currency
            }
        },
    }
</script>

<style scoped>

</style>