<template>
    <div align-h="center">
        <b-form-file
            id="inputFile"
            v-model="newPicture"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        >
        </b-form-file>
        <b-button variant="primary" v-on:click.prevent="updatePic">Submit</b-button>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: "profpic",
    data(){
        return {
            newPicture: null,
        }
    },
    methods: {
        updatePic: function(){
            let formData = new FormData()
            formData.append('profpic', this.newPicture)
            axios({
                method: "patch",
                url: "http://ecommerce-server.kennys.my.id:3000/users/profpic",
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(()=>{
                this.$router.push('/')
                Swal.fire({
                    icon: 'success',
                    title: 'Profile picture changed!'
                })
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error'
                })
            })
        }
    }
}
</script>

<style>

</style>