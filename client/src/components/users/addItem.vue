<template>
    <sui-form id="sui-form" @submit.prevent="addItem">
        <sui-form-field>
            <label>Name</label>
            <input placeholder="Item Name" v-model="itemName" required>
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
            <textarea placeholder="Item description" v-model="itemDescription" required/>
        </sui-form-field>
        <sui-button type="submit" primary>Submit</sui-button>
    </sui-form>
</template>

<script>
    export default {
        name: "addItem",
        data(){
            return {
                itemName: null,
                itemStock: null,
                itemPrice: null,
                itemImage: null,
                itemDescription: null,
            }
        },
        methods: {
            addItem(){
                this.$dialog
                    .confirm('Save data ?')
                    .then(dialog => {
                        this.$axios({
                            method: 'post',
                            url: '/api/items/register',
                            data: {
                                name: this.itemName,
                                stock: this.itemStock,
                                price: this.itemPrice,
                                image: this.itemImage,
                                description: this.itemDescription
                            },
                            headers: {token: localStorage.getItem('token')}
                        }).then(response => {
                            console.log(response.data);
                            this.$toast.success({
                                title: 'Success',
                                message: response.data.message
                            });
                            dialog.close();
                        }).catch(err => {
                            console.log(err.response);
                            this.$toast.error({
                                title: 'Error',
                                message: 'Item failed add to cart'
                            });
                            dialog.close();
                        })
                    })
                .catch(err => {
                    this.$toast.info({
                        title: 'Cancel',
                        message: 'Add item cancel'
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>