<template>
    <sui-segment id="listItem">
        <sui-card-group>
            <card id="card-item" v-for="(item, index) in listItem" :key="index" :data="item"/>
        </sui-card-group>
    </sui-segment>
</template>

<script>
    import card from "./card";

    export default {
        name: "listItem",
        data() {
            return {
                items: ""
            }
        },
        computed: {
            listItem() {
                return this.$store.getters.itemList;
            }
        },
        mounted() {
            this.$store.dispatch('getListItems');
        },
        components: {
            card
        }
    }
</script>

<style scoped>
    #listItem {
        padding: 25px;
    }
</style>