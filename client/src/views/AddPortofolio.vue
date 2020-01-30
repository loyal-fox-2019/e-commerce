<template>
    <div id="addPortofolio">
        <div class="container-fluid" style="margin-top: 110px;">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="form-card">
                        <form v-on:submit.prevent="createPorto()">
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Input Image</label>
                                <input type="file" class="form-control-file" v-on:change="inputToFile">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Description</label>
                                <input type="text" class="form-control" v-model="description" placeholder="Input portolio description">
                            </div>
                            <div class="button-container">
                                <button type="submit" class="btn btn-lg btn-dark" style="width: 100%;">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    name: 'addPortofolio',
    data() {
        return {
            file: '',
            description: ''
        }
    },
    methods: {
        inputToFile: function(event) {
            this.file = event.target.files[0];
        },
        createPorto: function() {
            const formData = new FormData();
            formData.append('file', this.file);
            formData.set('description', this.description);
            axios({
                method: 'post',
                url: 'http://localhost:3000/portofolio',
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
                swal.fire({
                    icon: 'success',
                    title: 'New Portolio Been Added'
                })
                this.$router.push({path: '/portofolio'});
            })
            .catch(error => {
                const errorRespond = {error};
                if(Array.isArray(errorRespond.error.response.data.errors)) {
                    swal.fire({
                    icon: 'error',
                    title: 'Add Portofolio failed',
                    text: `${errorRespond.error.response.data.errors[0]}`
                    }) 
                } else {
                    swal.fire({
                    icon: 'error',
                    title: 'Add Portofolio failed',
                    text: `${errorRespond.error.response.data.errors}`
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>