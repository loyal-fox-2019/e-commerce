<template>
<div class="container ">
    <form>
        <div class="form-group">
            <label for="inputName">Name</label>
            <input type="text" class="form-control" id="inputName" v-model="name">
        </div>
        <div class="form-group">
            <label for="inputBrand">Brand</label>
            <input type="text" class="form-control" id="inputBrand" v-model="brand">
        </div>
        <div class="form-group">
            <label for="inputCategory">Category</label>
            <input type="text" class="form-control" id="inputCategory" v-model="category">
        </div>
        <div class="form-group">
            <label for="inputDescription">Description</label>
            <input type="text" class="form-control" id="inputDescription" v-model="description">
        </div>
        <div class="form-group">
            <label for="inputPrice">Price</label>
            <input type="number" class="form-control" id="inputPrice" v-model="price">
        </div>
        <div class="form-group">
            <label for="inputStock">Stock</label>
            <input type="number" class="form-control" id="inputStock" v-model="stock">
        </div>
        <div class="form-group">
            <p class="h6">Choose file to upload :</p>
            <input type="file" name="file" v-on:change="upload()">
        </div>
        <button type="submit" class="btn btn-success mr-3" v-on:click.prevent="addProduct">Save</button>
        <button type="submit" class="btn btn-danger" v-on:click.prevent="goHome">Cancel</button>
    </form>
</div>
</template>

<script>
export default {
    name: 'AddProduct',
    data() {
        return {
            name: '',
            brand: '',
            category: '',
            description: '',
            price: '',
            stock: '',
            file: '',
        }
    },
    methods: {
        upload() {
            this.file = event.target.files[0];
        },
        addProduct() {
            let obj = new FormData;
            obj.append('name', this.name)
            obj.append('brand', this.brand)
            obj.append('category', this.category)
            obj.append('description', this.description)
            obj.append('price', this.price)
            obj.append('stock', this.stock)
            obj.append('file', this.file)

            axios({
                url: 'http://localhost:3000/products',
                method: 'post',
                data: obj,
                headers: { token: localStorage.getItem('token') }
            })
            .then(() => {
                this.name = '';
                this.brand = '';
                this.category = '';
                this.description = '';
                this.price = '';
                this.stock = '';
                this.file  = '';
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        goHome() {
            this.name = '';
            this.brand = '';
            this.category = '';
            this.description = '';
            this.price = '';
            this.stock = '';
            this.file  = '';
            this.$router.push('/');
        }
    }

}
</script>

<style scoped>
.container {
    margin-top: 100px;
    max-width: 500px;
    height: 650px;
    background-color: rgb(170, 150, 240);
    border-radius: 10px;
}
</style>