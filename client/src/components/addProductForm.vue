<template>
    <div>        
        <form id="add-form" @submit.prevent="addProduct" enctype="multipart/form-data" method="post">
            <h3>Add a product</h3>
            <div class="form-group">
                Name:
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                Price:
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                    </div>
                    <input type="number" class="form-control" v-model="price" min="0.01">
                </div>
            </div>
            <div class="form-group">
                Stock:
                <div class="input-group">                    
                    <input type="number" class="form-control" v-model="stock" min="0">
                    <div class="input-group-append">
                        <span class="input-group-text">unit(s)</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                Image:
                <input type="file" class="form-control">
            </div>
            <div class="form-group">
                Description:
                <textarea class="form-control" v-model="description"></textarea>
            </div>
            <div class="form-group">
                Tags:
                <textarea class="form-control" v-model="tags"></textarea>
            </div>
            
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios";
    export default {
        name: "ProductsView",
        data() {
            return {
                name: "",
                price: null,
                stock: null,
                tags: "",
                description: ""
            }
        },
        methods: {
            addProduct() {
                let fd = new FormData();
                fd.append('name',this.name);


                axiosReq({
                    url: "/products",
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token'),
                        'content-type': 'multipart/form-data'
                    },
                    data: fd
                })
            }
        },
        components: {
            
        }
    }
</script>

<style scoped>
#add-form {
    padding-left: 15px;
    padding-top: 15px;
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}
</style>