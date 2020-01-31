<template>
    <div class="fade-in">
        <!-- <h4>user profile page</h4> -->
<!-- {{loggedInUserDetail}} -->
        <div id="divUserProfileEdit" class="row">
          <div id="divUserProfilePictureContainer" class="col-3">

                <img v-if="loggedInUserDetail.profilePicture" 
                    :src=" loggedInUserDetail.profilePicture " 
                    class="userProfilePicture">
                    
                <img v-else
                    src="../assets/blankProfilePicture/default-profile.png" 
                    alt="" 
                    class="userProfilePicture">

          </div>

          <div id="divUserDataContainer" class="col-8">
              <form
                action="/upload-single" method="post" enctype="multipart/form-data"
                @submit.prevent="updateUserProfile">
                <div class="form-row">
                    <h1>{{ loggedInUserDetail.username }}</h1>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputEmail4">First Name</label>
                    <input type="text" class="form-control" id="" v-model="firstName">
                    </div>
                    <div class="form-group col-md-6">
                    <label for="inputPassword4">Last Name</label>
                    <input type="text" class="form-control" id="" v-model="lastName">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Email</label>
                    <input type="email" class="form-control" id="" v-model="email">
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Describe Yourself</label>
                    <textarea 
                        class="form-control" id="editPersonalTodoDescription" 
                        rows=5 
                        style="resize:none" 
                        placeholder="tell us a little bit about yourself"
                        v-model="description">
                    </textarea>
                </div>
                <div class="form-row">
                    <label for="inputAddress2">Update your profile picture</label>

                    <div class="custom-file">
                    <b-form-file
                        v-model="profilePicture"
                        @change="setPictureTempUrl"
                        :state="Boolean(file)"
                        action="/upload-single"
                        method="post"
                        enctype="multipart/form-data">
                    </b-form-file>

                    <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                </div>
                <div class="form-group" style="margin-top:1%">
                    <button type="submit" class="btn btn-primary">Save</button>
                    
                </div>
                <div v-if="pictureTempUrl" style="text-align:center">
                    <img :src="pictureTempUrl" class="userProfilePicture" style="height:300px; width:auto; ">
                    <button type="button" class="btn btn-outline-secondary" @click="cancelPicture" style="border:dashed 1px; vertical-align: top; border-radius:10px">
                        <small>cancel</small>
                    </button>
                </div>
            </form>
            
          </div>

      </div>

    </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from '../../config/axios'

import { mapGetters } from 'vuex'

export default {
    name: 'userProfilePage',
    data(){
        return {
            firstName:'',
            lastName:'',
            email:'',
            description:'',
            profilePicture:'',
            pictureTempUrl:''
        }
    },
    methods:{
        fetchUserProfile(){
            this.firstName = this.loggedInUserDetail.firstName
            this.lastName = this.loggedInUserDetail.lastName
            this.email = this.loggedInUserDetail.email
            this.description = this.loggedInUserDetail.description
            this.profilePicture = this.loggedInUserDetail.profilePicture
        },
        setPictureTempUrl(e){
            const file = e.target.files[0]
            this.pictureTempUrl = URL.createObjectURL(file)
        },
        cancelPicture(){
            this.pictureTempUrl = ''
        },
        updateUserProfile(){
            let fd = new FormData()
            if(this.profilePicture)
                fd.append('file', this.profilePicture)
            fd.append('firstName', this.firstName)
            fd.append('lastName', this.lastName)

            const validKey = ['email', 'description']
            validKey.forEach(element => {
                if(this[element] != this.loggedInUserDetail[element])
                        fd.append(element, this[element])
            });

            for(let pair of fd.entries()) {
                  console.log(pair[0]+ ', '+ pair[1]); 
            }


            swal.fire({
                title:'Update your Profile',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'save'
            })
            .then(result=>{
                if(result.value)
                    {
                        axios({
                            method: 'patch',
                            url: `/users/${this.loggedInUserDetail._id}`,
                            headers:{
                                token : localStorage.getItem('token')
                            },
                            data: fd
                        })
                        .then( ({data}) =>{
                            console.log(' \n======================\n', data)
                            swal.fire(
                                'Success updating user profile'
                            )
                            .then( result=>{
                                this.$router.push('/')
                            })
                        })
                        .catch( ({response}) =>{
                            console.log(' error @updateUserProfile-userProfilePage \n======================\n', response.data)
                            swal.fire(
                                'Error With Updating User Profile',
                                response.data.message
                            )
                        })
                    }
            })
            

        }

    },
    created(){
        this.fetchUserProfile()
        
    },
    computed:{
        ...mapGetters([
            'loggedInUserDetail'
        ])
    }

}
</script>

<style scoped>
#divUserProfileEdit{
    /* border: dashed 2px grey; */
    margin:auto;
    width: 90%;
    padding: 1%;
}

#divUserProfilePictureContainer{
    /* border: solid 2px blue; */

    display: inline-block;
    /* margin: auto; */
    margin-top: 0;
}


#divUserDataContainer{
    /* border: solid 2px purple; */
    width: 60%
}

.userProfilePicture{
    width:100%;
    height: auto;
    border: dotted 2px #e8e7e6;
    border-radius: 30px;
}




</style>