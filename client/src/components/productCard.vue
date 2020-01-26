<template>
    <div v-if="!deleted">
        <b-card
            :img-src="product.image"
            img-alt="Product image"
            img-top
            style="width: 15vw !important;"
            class="mb-2 productcard"
        >
            <b-card-text class="product-info">
                <router-link :to="'/product/'+product._id">{{product.name}}</router-link><br>
                <div class="product-price">${{product.price}}<br></div>
                Sold: {{product.sold}}
                <div v-if="mode=='manage'">Stock: {{product.stock}}</div>
                <div>
                    <router-link class="btn btn-primary card-button" v-if="mode=='list'" :to="'/product/'+product._id">View</router-link>
                    <router-link class="btn btn-primary card-button" v-if="mode=='manage'" :to="'/editproduct/'+product._id">Edit</router-link>
                    <button class="btn btn-primary card-button" v-if="mode=='manage'">Restock</button>
                    
                    <!-- Delete button and popover -->
                    <b-button class="btn btn-danger card-button" v-if="mode=='manage'" type="button" :id="'popoverdeletebtn'+product._id" @click="openDeletePopover">Delete</b-button>
                    <b-popover :target="'popoverdeletebtn'+product._id" triggers="click" :show="showdeletepopover" placement="auto">
                    <template v-slot:title>
                        <b-button @click="closeDeletePopover" class="close" aria-label="Close" ref="button">
                        <span class="d-inline-block" aria-hidden="true">&times;</span>
                        </b-button>
                        Are you sure?
                    </template>

                    <div>
                        <b-button @click="closeDeletePopover" size="sm">Cancel</b-button>
                        <b-button @click="deleteProduct" size="sm" variant="primary">Ok</b-button>
                    </div>
                    </b-popover>

                </div>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import axiosReq from "../config/axios";
    export default {
        name: "productCard",
        props: {
            product: Object,
            mode: String,
        },
        data() {
            return {                
                showdeletepopover: false,
                deleted: false
            }
        },
        methods: {
            closeDeletePopover() {
                this.showdeletepopover = false;
            },
            openDeletePopover() {
                this.showdeletepopover = true;
            },
            deleteProduct() {
                axiosReq({
                    url: `/products/${this.product._id}`,
                    method: 'delete',
                    headers: {
                        token: this.$cookies.get('token')
                    }
                })
                .then(() => {
                    this.showdeletepopover = false;
                    this.deleted = true;
                })
                .catch(() => {
                    this.showdeletepopover = false;
                })
            }
        }
    }
</script>

<style scoped>
.productcard {
    margin: 5px;
}
.product-info {
    text-align: left;
}

img {
    padding: 15px;
    object-fit: scale-down
}

.product-price {
    color: rgb(255, 166, 0);
}

.card-button {
    padding:2px 5px;
    margin: 2px;
}
</style>