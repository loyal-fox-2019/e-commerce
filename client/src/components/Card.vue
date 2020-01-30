<template>
    <div class="container-fluid mt-3">
        <div class="card" style="width: 18rem;">
            <div class="img-container text-center">
                <img :src="product.file" class="card-img-top productIcon">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Brand: {{ product.brand }}</p>
                <p class="card-text">Price: {{ product.price }}</p>
                <p class="card-text">Stock: {{ product.stock }}</p>
                <a href="" class="btn btn-primary" v-on:click.prevent="addToCart">Add to Cart</a>
                <!-- <div class="row mt-3">
                    <div class="col-6">
                        <a href="" @click.prevent="emitEdit(product._id)">
                            <img src="../assets/pencil.png" class="editIcon">
                        </a>
                    </div>
                    <div class="col-6">
                        <a href="" @click.prevent="deleteProduct(product._id)">
                            <img src="../assets/quit.png" class="deleteIcon">
                        </a>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: { product: Object },
    methods: {
        addToCart(event) {
            let id = localStorage.getItem('id');
            axios({
                url: 'http://localhost:3000/carts',
                method: 'post',
                headers: { token: localStorage.getItem('token') },
                data: {
                    ProductId: this.product._id,
                    UserId: id,
                    quantity: 1,
                    sale_price: this.product.price,
                    sub_total: this.product.price * 1
                }
            })
            .then(response => {
                this.$emit('listCartChild');
            })
            .catch(err => {
                console.log(err);
            })
        },

    }
}
</script>

<style scoped>
.productIcon {
    width: 100px !important;
}
/* a .editIcon, a .deleteIcon {
    width: 30px !important;
} */
</style>