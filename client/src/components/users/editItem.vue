<template>
    <sui-form @submit.prevent="editItem">
        <sui-form-field>
            <label>Name</label>
            <input placeholder="Item Name"
                   v-model="itemName"
                   required
                   minlength="3"
                   maxlength="100">
        </sui-form-field>
        <sui-form-field>
            <label>Stock</label>
            <input placeholder="Item Stock" type="number" v-model="itemStock" required>
        </sui-form-field>
        <sui-form-field>
            <label>Price</label>
            <input placeholder="Item Price" type="number" v-model="itemPrice" required>
        </sui-form-field>
        <sui-form-field>
            <label>Image</label>
            <input placeholder="Item image" v-model="itemImage">
        </sui-form-field>
        <sui-form-field>
            <label>Description</label>
            <textarea placeholder="Item description"
                      v-model="itemDescription"
                      required
                      minlength="15"
                      maxlength="500"/>
        </sui-form-field>
        <sui-button type="submit" primary>Update</sui-button>
    </sui-form>
</template>

<script>
    export default {
        name: "addItem",
        data() {
            return {
                itemName: null,
                itemStock: null,
                itemPrice: null,
                itemImage: null,
                itemDescription: null,
            }
        },
        props: {
            data: Object
        },
        mounted() {
            this.itemName = this.data.name;
            this.itemStock = this.data.stock;
            this.itemPrice = this.data.price;
            this.itemImage = this.data.image;
            this.itemDescription = this.data.description;
        },
        methods: {
            editItem() {
                this.$store.dispatch('editUser', {
                    id: this.data._id,
                    name: this.itemName,
                    stock: this.itemStock,
                    price: this.itemPrice,
                    image: this.itemImage,
                    description: this.itemDescription
                })
            }
        }
    }
</script>

<style scoped>

</style>