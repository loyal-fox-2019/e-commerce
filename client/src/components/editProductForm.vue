<template>
    <div>        
        <form id="edit-form" @submit.prevent="editProduct" enctype="multipart/form-data" method="post" v-if="editProduct">
            <h3>Edit product</h3>
            <div class="form-group">
                Name*
                <input type="text" class="form-control" v-model="name" required>
            </div>
            <div class="form-group">
                Price*
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" class="form-control" v-model="price" required>
                </div>
            </div>
            <div class="form-group">
                Image<br>
                <input type="radio" name="changeImage" :value="false" v-model="changeImage"> Keep original<br><img :src="product.image" style="width:100px"><br>
                <input type="radio" name="changeImage" :value="true" v-model="changeImage">
                Change image
                <input type="file" name="file" ref="file" @change="handleFile" style="width:500px;" :disabled="!changeImage"><br>
            </div>
            <div class="form-group">
                Description*
                <textarea class="form-control" v-model="description" required></textarea>
            </div>
            <div class="form-group">
                Tags* (separated with spaces)
                <textarea class="form-control" v-model="tags" required></textarea>
            </div>
            <button class="btn btn-primary" id="save-btn" type="submit">Edit product</button>
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios";
    export default {
        name: "editProductForm",
        props: {
            product: Object
        },
        data() {
            return {
                name: this.product.name,
                price: this.product.price,
                tags: this.product.tags.join(' '),
                description: this.product.description,
                file: "",
                changeImage: false
            }
        },
        methods: {
            editProduct() {
                let fd = new FormData();
                fd.append('name',this.name);
                fd.append('price',this.price);
                fd.append('tags',this.tags);
                fd.append('description',this.description);
                fd.append('file',this.file);
                fd.append('changeImage',this.changeImage);

                axiosReq({
                    url: `/products/${this.product._id}`,
                    method: "put",
                    headers: {
                        token: this.$cookies.get('token'),
                        'content-type': 'multipart/form-data'
                    },
                    data: fd
                })
                .then(() => {
                    this.$router.push({path: `/product/${this.product._id}`})
                })
                .catch((err) => {
                    console.log(err); 
                })
            },
            handleFile() {
                this.file = this.$refs.file.files[0];
                console.log(this.file)
            },
        },
        components: {
            
        }
    }
</script>

<style scoped>
#edit-form {
    padding-left: 15px;
    padding-top: 15px;
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}
</style>