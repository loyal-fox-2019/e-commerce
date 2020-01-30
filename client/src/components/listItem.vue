<template>
    <sui-segment id="listItem" :class="loadingIs">
        <sui-card-group>
            <card id="card-item" v-for="(item, index) in itemList"
                  :key="index"
                  :data="item"
                  :userId="userId"/>
        </sui-card-group>
    </sui-segment>
</template>

<script>
    import card from "./card";
    import {mapGetters} from "vuex";

    export default {
        name: "listItem",
        computed: {
            ...mapGetters([
                'itemList',
                'loadingIs',
                'message',
                'userId'
            ])
        },
        watch: {
            itemList(a, b) {
                this.$store.dispatch('getListItems');
                this.$store.dispatch('viewUser');
            },
            message(a, b) {
                this.$toast[a.type]({
                    title: a.type,
                    message: a.message
                })
            }
        },
        mounted() {
            this.$store.dispatch('getListItems');
            this.$store.dispatch('viewUser');
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