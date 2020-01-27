<template>
  <div class="fade-in">
      <!-- <h3>component createEditItem</h3> -->
      <h3 v-if="setPageMode === 'create'">Add New Item</h3>
      <h3 v-if="setPageMode === 'edit'">Update Item</h3>
      <h3 v-if="setPageMode === 'purchase'">Purchasing</h3>
        
      <div id="containerPageDiv" class="row">   
        <div id="leftDiv">
            <div id="divItemPictureContainer">

                <!-- <img v-if="loggedInUserDetail.profilePicture" 
                    :src=" loggedInUserDetail.profilePicture " 
                    class="userProfilePicture"> -->
                    
                <img
                    src="../assets/blankItemPicture/no-image-icon-13.png" 
                    alt="" 
                    class="itemPicture">

          </div>
        </div>



        
        <div id="rightDiv">
            <div id="divItemDataContainer">
                <form
                action="/upload-single" method="post" enctype="multipart/form-data"
                @submit.prevent="createIem">
                <div class="form-group col-md-8">
                    <label for="inputEmail4">Item Name</label>
                    <input v-if="setPageMode !== 'purchase'" type="text" class="form-control" id="" v-model="itemName">
                    <b-list-group-item v-if="setPageMode === 'purchase'"  style="color:red" disabled>penggaris patah</b-list-group-item>
                </div>
                <div class="form-group col-md-8">
                    <label for="inputAddress2">Item Description</label>
                    <textarea
                        v-if="setPageMode !== 'purchase'" 
                        class="form-control" id="editPersonalTodoDescription" 
                        rows=5 
                        style="resize:none" 
                        v-model="description">
                    </textarea>
                    <div v-if="setPageMode === 'purchase'" style="height:200px; overflow:scroll">
                        <b-list-group-item  disabled>Porta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsumPorta ac consectetur ac wong edan sing gendeng lorem ipsum</b-list-group-item>
                    </div>
                    
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="inputEmail4">Price</label>
                        <input v-if="setPageMode !== 'purchase'" type="Number" min=0 class="form-control" id="" v-model="price">
                        <b-list-group-item v-if="setPageMode === 'purchase'"  disabled>100000</b-list-group-item>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputPassword4">Stocks</label>
                        <input v-if="setPageMode !== 'purchase' " type="Number" min=0 class="form-control" id="" v-model="stock">
                        <b-list-group-item v-if="setPageMode === 'purchase'"  disabled>100</b-list-group-item>
                    </div>
                </div>
                <div v-if="setPageMode !== 'purchase'" class="form-row col-md-8">
                    <label for="">Item Picture</label>

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
                <div v-if="setPageMode === 'purchase'">
                    <b-form inline >
                        <label class="mr-sm-2" for="inline-form-custom-select-pref">Buy Amount</label>
                        <input type="Number" min=0 class="form-control col-md-6"  id="" v-model="stock">
                    </b-form>

                </div>


                <div class="form-group col-md-8" style="margin-top:3%">
                    <button v-if="setPageMode !== 'purchase'" type="submit" class="btn btn-primary">Save</button>
                    <button v-if="setPageMode === 'purchase'" type="submit" class="btn btn-primary">Add to Cart</button>
                    
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


  </div>
</template>

<script>
export default {
    name: 'createEditItem',
    data(){
        return{
            pageMode: this.setPageMode
        }
    },
    computed:{
        setPageMode(){
            this.pageMode = this.$route.params.mode
            return this.$route.params.mode
        }

    }

}
</script>

<style scoped>
#containerPageDiv{
    /* border: solid 3px black; */
    display: flex;
    margin:auto;
    width: 90%;
    height:80vh;
}  
#leftDiv{
    /* border: solid 2px red; */
    margin-left: 10%;
    width:35%;
}
#divItemPictureContainer{
    /* border: solid 2px blue; */

    margin:auto;
    margin-top:5%;
    width:90%;
    height: auto;
}
.itemPicture{
    width:100%;
    height: auto;
    border: dotted 2px #e8e7e6;
    border-radius: 30px;
}

#rightDiv{
    /* border: solid 2px blue; */
    /* width:auto */
    width: 50%;
    padding:2%;
}

#divItemDataContainer{
    /* border: solid 2px purple; */
    /* width: 60% */

}
</style>