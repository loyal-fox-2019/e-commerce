<template>
  <div class="fade-in">
      <!-- <h3>component createEditItem</h3> -->
      <h3 v-if="setPageMode === 'create'">Add New Item</h3>
      <h3 v-if="setPageMode === 'edit'">Update Item</h3>
      <h3 v-if="setPageMode === 'purchase'">Purchasing</h3>
        <!-- {{setPageMode}} -->
        <!-- {{ itemDetail }} -->
        {{setEditItem}}
      <div id="containerPageDiv" class="row">   
        <div id="leftDiv">
            <div id="divItemPictureContainer" >
                
                <div v-if="itemDetail">
                    <img v-if="itemDetail.image" 
                        :src="itemDetail.image" 
                        class="itemPicture">
                    <img v-if="!itemDetail.image"
                    src="../assets/blankItemPicture/no-image-icon-13.png" 
                    alt="" 
                    class="itemPicture">

                </div>
                    
                <div v-if="!itemDetail">
                <img 
                    src="../assets/blankItemPicture/no-image-icon-13.png" 
                    alt="" 
                    class="itemPicture">
                </div>

          </div>
        </div>



        
        <div id="rightDiv">
            <div id="divItemDataContainer">
                <form
                action="/upload-single" method="post" enctype="multipart/form-data"
                @submit.prevent="submitForm">
                <div v-if="setPageMode === 'purchase'" class="form-group col-md-8">
                    <label for="inputEmail4"><h3>Seller ~{{ itemDetail.SellerId.username}}</h3></label>
                </div>

                <div class="form-group col-md-8">
                    <label for="inputEmail4">Item Name</label>
                    <input v-if="setPageMode !== 'purchase'" type="text" class="form-control" id="" v-model="name" required>
                    <b-list-group-item v-if="setPageMode === 'purchase'"  style="color:red" disabled>{{ itemDetail.name }}</b-list-group-item>
                </div>

                <div class="form-group col-md-8">
                    <label for="inputAddress2">Item Description</label>
                    <textarea
                        v-if="setPageMode !== 'purchase'" 
                        class="form-control" id="editPersonalTodoDescription" 
                        rows=5 
                        style="resize:none" 
                        v-model="description"
                        required>
                    </textarea>
                    <div v-if="setPageMode === 'purchase'" style="max-height:200px; overflow:auto">
                        <b-list-group-item  disabled>{{ itemDetail.description }}</b-list-group-item>
                    </div>
                    
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="inputEmail4">Price</label>
                        <input v-if="setPageMode !== 'purchase'" type="Number" min=0 class="form-control" id="" v-model="price" required>
                        <b-list-group-item v-if="setPageMode === 'purchase'"  disabled>Rp. {{ itemDetail.price.toLocaleString('id') }}</b-list-group-item>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputPassword4">Stocks</label>
                        <input v-if="setPageMode !== 'purchase' " type="Number" min=0 class="form-control" id="" v-model="stock" required>
                        <b-list-group-item v-if="setPageMode === 'purchase'"  disabled>{{ itemDetail.stock.toLocaleString('id') }}</b-list-group-item>
                    </div>
                </div>

                <div v-if="setPageMode !== 'purchase'" class="form-row col-md-8">
                    <label for="">Item Picture</label>

                    <div class="custom-file">
                    <b-form-file
                        v-model="itemImage"
                        @change="setPictureTempUrl"
                        :state="Boolean(itemImage)"
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
                        <input type="Number" min=0 class="form-control col-md-6"  id="" v-model="buyAmount">
                    </b-form>
                    <b-form inline style="margin-top:2%">
                        <!-- <label for="inline-form-custom-select-pref">Total : Rp. {{ ( buyAmount * parseInt(itemDetail.price)).toLocaleString('id') }}</label> -->
                        <label for="inline-form-custom-select-pref">Total : Rp. {{ countTotalPrice.toLocaleString('id') }}</label>
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
import axios from '../../config/axios'
import swal from 'sweetalert2'

export default {
    name: 'createEditItem',
    props:[
        'itemDetail'
    ],
    data(){
        return{
            pageMode: this.setPageMode,
            // editItem: {},
            
            itemImage:'',
            pictureTempUrl:'',

            // create && edit property
            name:'',
            description:'',
            price:'',
            stock:'',

            // purchase property
            buyAmount: 0,


        }
    },
    methods:{
        setPictureTempUrl(e){
            const file = e.target.files[0]
            this.pictureTempUrl = URL.createObjectURL(file)
        },
        cancelPicture(){
            this.pictureTempUrl = ''
        },
        submitForm(){
            if(this.pageMode === 'create')
                this.createItem()
            else if(this.pageMode === 'edit')
                this.patchUpdateItem()
            else if(this.pageMode === 'purchase')
                this.addToCart()
        },
        createItem(){
            swal.fire({
                title: 'Create Item',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, post it'
            })
            .then(result=>{
                if(result.value)
                  {
                      let fd = new FormData()
                        fd.append('name', this.name)
                        fd.append('description', this.description)
                        fd.append('price', this.price)
                        fd.append('stock', this.stock)
                    
                      if(this.itemImage)
                        fd.append('file', this.itemImage)

                      

                      axios({
                            method: 'post',
                            url: '/items/',
                            headers:{
                                token: localStorage.getItem('token')
                            },
                            data:fd
                      })
                      .then( ({data}) =>{
                            // console.log(`TCL: createItem -> data`, data)
                            swal.fire(
                                'Item successfully added to your shop'
                            )
                            .then(result=>{
                                this.$router.push('/')
                            })
                      })
                      .catch( ({response}) =>{
                            console.log(' error @createItem-createEditItem \n======================\n', response.data)
                            swal.fire(
                                'Error With Creating Your Item',
                                response.data.message
                            )
                      })
                  }
            })
        },
        patchUpdateItem(){
            let updateCounter = 0
            let fd = new FormData()

            const validKey = ['name', 'description', 'price', 'stock' ]
            validKey.forEach(element => {
                if(this[element] !== this.itemDetail[element]){
                    fd.append(element, this[element])
                    updateCounter++
                }
                    
            });
            
            if(this.pictureTempUrl){
                fd.append('file', this.itemImage)
                updateCounter++
            }
                
            
            if(updateCounter === 0)
                swal.fire(
                    'Nothing has been updated'
                )
            else{
                axios({
                    method: 'patch',
                    url: `/items/${this.itemDetail._id}`,
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data: fd
                })
                .then( ({data}) =>{
                    // console.log(`TCL: patchUpdateItem -> data`, data)
                    
                    swal.fire(
                        'Item successfully edited'
                    )
                    .then(result=>{
                        this.$router.push(`/userShop/${this.itemDetail.SellerId._id}`)
                    })

                })
                .catch( ({response}) =>{
                    console.log(' error @patchUpdateItem-createEditItem \n======================\n', response.data)
                    swal.fire(
                        'Error With Login',
                        response.data.message
                    )
                })
            }
        },
        addToCart(){
            console.log(' \n======================\n', this.countTotalPrice)
            if(this.buyAmount === 0)
              {
                  swal.fire('Please input buy amount')
              }
            else{
                axios({
                    method: 'post',
                    url: '/transactions/',
                    headers:{
                        token : localStorage.getItem('token')
                    },
                    data:{
                        itemId: this.itemDetail._id,
                        SellerId: this.itemDetail.SellerId._id,
                        amount: this.buyAmount,
                        price: this.itemDetail.price
                    }
                })
                .then( ({data}) =>{
                    // console.log(`TCL: addToCart -> data`, data)
                    swal.fire(
                        'Item has been added to cart'
                    )

                })
                .catch( ({response}) =>{
                    console.log(' error @addToCart-createEditItem \n======================\n', response.data)
                    console.log(' \n======================\n', this.itemDetail._id)
                    swal.fire(
                        'Error With Adding to Cart',
                        response.data.message
                    )
                })
            }
        }
    },
    computed:{
        setPageMode(){
            this.pageMode = this.$route.params.mode
            return this.$route.params.mode
        },
        setEditItem(){
            if(this.$route.params.mode === 'edit')
            {
                this.name = this.itemDetail.name
                this.description = this.itemDetail.description
                this.price = this.itemDetail.price
                this.stock = this.itemDetail.stock
            }
        },
        countTotalPrice(){
            return Number(this.buyAmount) * Number(this.itemDetail.price)
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
    margin-top: 2%;
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