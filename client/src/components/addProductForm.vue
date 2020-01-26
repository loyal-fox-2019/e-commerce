<template>
    <div>        
        <form id="add-form" @submit.prevent="addProduct" enctype="multipart/form-data" method="post">
            <h3>Add a product</h3>
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
                Stock*
                <div class="input-group">                    
                    <input type="number" class="form-control" v-model="stock" min="0" required>
                    <div class="input-group-append">
                        <span class="input-group-text">unit(s)</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                Image
                <input type="file" class="form-control" name="file" ref="file" @change="handleFile">
            </div>
            <div class="form-group">
                Description*
                <!-- <textarea class="form-control" v-model="description" required></textarea> -->

                <quill-editor v-model="description" ref="myQuillEditor" :options="editorOption">
                </quill-editor>
            </div>
            <div class="form-group">
                Tags* (separated with spaces)
                <textarea class="form-control" v-model="tags" required></textarea>
            </div>
            <button class="btn btn-primary" id="save-btn" type="submit">Add product</button>
        </form>
    </div>
</template>

<script>
    import axiosReq from "../config/axios";
    export default {
        name: "addProductForm",
        data() {
            return {
                name: "",
                price: null,
                stock: null,
                tags: "",
                description: "",
                file: "",
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ]
                    }
                }
            }
        },
        methods: {
            addProduct() {
                let fd = new FormData();
                fd.append('name',this.name);
                fd.append('price',this.price);
                fd.append('stock',this.stock);
                fd.append('tags',this.tags);
                fd.append('description',this.description);
                fd.append('file',this.file);

                axiosReq({
                    url: "/products",
                    method: "post",
                    headers: {
                        token: this.$cookies.get('token'),
                        'content-type': 'multipart/form-data'
                    },
                    data: fd
                })
                .then(({data}) => {
                    this.name = "";
                    this.price = null;
                    this.stock = null;
                    this.tags = "";
                    this.description = "";
                    console.log(data)
                    this.$router.push({path: `/product/${data._id}`})
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
#add-form {
    padding-left: 15px;
    padding-top: 15px;
    width: 50vw;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
}
</style>