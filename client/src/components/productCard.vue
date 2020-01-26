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

                    <!-- Restock button and modal -->
                    <button class="btn btn-primary card-button" v-if="mode=='manage'" data-toggle="modal" data-target="#restockmodal">Restock</button>
                    <div class="modal fade" id="restockmodal" tabindex="-1" role="dialog" aria-labelledby="restockmodalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="restockmodalTitle">Restock</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Current stock: {{product.stock}}
                            <form @submit.prevent="restockProduct">
                                <div class="input-group">
                                    Add <input type="number" class="form-control" v-model="restockqty" min="1" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text">unit(s)</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="restockProduct" id="restock-btn">Restock</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    
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
    import JQuery from 'jquery';
    const $ = JQuery;
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
                deleted: false,
                restockqty: 1
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
            },
            restockProduct() {
                axiosReq({
                    url: `/products/${this.product._id}`,
                    method: "patch",
                    headers: {
                        token: this.$cookies.get('token')
                    },
                    data: {
                        addstock: this.restockqty
                    }
                })
                .then(() => {
                    $('#restockmodal').click()
                    this.$router.push({path: `/product/${this.product._id}`})
                })
                .catch((err) => {
                    console.log(err); 
                })
            }
        }
    }
</script>

<style scoped>
.productcard {
    margin: 5px;
    height: 375px;
}
.product-info {
    text-align: left;
    bottom: 30px;
    position: absolute
}

img {
    padding: 15px;
    object-fit: scale-down;
    max-height: 200px;
}

.product-price {
    color: rgb(255, 166, 0);
}

.card-button {
    padding:2px 5px;
    margin: 2px;
}
</style>