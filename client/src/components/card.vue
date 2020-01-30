<template>
    <div class="suiCard">
        <sui-card>
            <sui-dimmer-dimmable @mouseenter.native="cardOneActive = true" @mouseleave.native="cardOneActive = false">
                <sui-image :src="data.image" class="suiCardImage"/>
                <sui-dimmer blurring :active="cardOneActive">
                    <sui-button inverted @click.prevent="toggle">
                        Details
                    </sui-button>
                    <sui-button v-if="isUserMatch" color="green" inverted @click.prevent="editToggle" icon="edit"/>
                    <sui-button v-if="isUserMatch" color="red" inverted @click.prevent="deleteItem" icon="delete"/>
                </sui-dimmer>
            </sui-dimmer-dimmable>
            <sui-card-content>
                <a is="sui-label" color="red" ribbon>
                    Hot Item
                </a>
                <h5>{{ data.name.slice(0, 20) }} ...</h5>
                <sui-card-meta>Rp. {{ price }}</sui-card-meta>
            </sui-card-content>
            <sui-card-content extra>
                <sui-icon name="users"/>
                {{ data.owner.name.split(" ")[0] }}
            </sui-card-content>
        </sui-card>
        <item-detail-modal :open="open" @toggle="toggle" :data="data"/>
        <sui-modal v-model="editOpen">
            <sui-modal-header>
                Edit Item
                <sui-icon name="close" id="close" color="red" @click="editOpen = false"/>
            </sui-modal-header>
            <sui-modal-content scrolling>
                <edit-item :data="data"/>
            </sui-modal-content>
        </sui-modal>
    </div>
</template>

<script>
    import itemDetailModal from "./itemDetailModal";
    import editItem from "./users/editItem";

    export default {
        name: "card",
        data() {
            return {
                cardOneActive: false,
                open: false,
                editOpen: false
            };
        },
        props: {
            data: Object,
            userId: String
        },
        methods: {
            toggle() {
                this.open = !this.open;
            },
            editToggle() {
                this.editOpen = !this.editOpen;
            },
            deleteItem() {
                this.$store.dispatch("deleteItem", this.data._id);
                this.$store.dispatch('getListItems');
            }
        },
        computed: {
            price() {
                let segment = [];
                let n = [];
                let priceReverse = "0" + this.data.price.toString().split("").reverse().join("");
                for (let i = 1; i <= priceReverse.length + 1; i++) {
                    n.unshift(priceReverse[i])
                    if (i % 3 === 0) {
                        segment.unshift(n.join(""));
                        n = [];
                    }
                }
                return segment.join(".");
            },
            isUserMatch() {
                return this.data.owner._id === this.userId
            }
        },
        components: {
            itemDetailModal,
            editItem
        }
    }
</script>

<style scoped>
    .suiCard {
        width: 250px;
        padding: 5px;
    }

    .suiCardImage {
        height: 200px !important;
        width: 250px !important;
    }

    #close {
        float: right;
        cursor: pointer;
    }
</style>