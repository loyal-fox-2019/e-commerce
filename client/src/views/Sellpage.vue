<template>
  <div class="SellPage mt-3">

    <div id="card" class="card mx-auto mt-5 mb-5" style="width:350px;">
        <img class="card-img-top" :src="imgUrl" alt="">
        <div class="card-body">
          <h4 class="card-title">{{name}}</h4>
          <p class="card-text">Rp. {{price}},-</p>
          <p class="card-text">Stock : {{quantity}}</p>
          <p class="card-text">Kondisi : {{condition}}</p>
          <p class="card-text"><i class="fa fa-store"></i> {{seller}}</p>
          <div class="row d-flex justify-content-center">
            <button @click="sell" v-if="formDisplay==='imgUrl'" id="btn-sell" class="btn btn-dark">
            Sell me!
            </button>
          </div>
        </div>
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <h1> <i class="ml-2 fab fa-cotton-bureau"></i> Sell your clothes!</h1>  
        <br>
        

        <div v-if="formDisplay=='name'">
          <h2 class="mb-5">Describe your clothes</h2>
          <div>
            <input v-model="name" type="text" class="form-control mt-5 mb-5" id="custom-field" placeholder="What am i called?">
          </div>
        </div>
        <div v-if="formDisplay=='price'">
          <h2>Set your price</h2>    
          <div>
            <input v-model="price" type="number" class="form-control mt-5 mb-5" id="custom-field" placeholder="Ikura desu ka?">
          </div>
        </div>
        <div v-if="formDisplay=='condition'">
          <h2>Is it brand new?</h2>    
          <div>
            <div class="form-check pt-5">
              <input v-model="condition" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="new" checked>
              <label class="form-check-label" for="exampleRadios1">
                Yessir!
              </label>
            </div>
            <div class="form-check pb-5">
              <input v-model="condition" class="form-check-input condition-checkbox" type="radio" name="exampleRadios" id="exampleRadios2" value="used">
              <label class="form-check-label" for="exampleRadios2">
                I'm preloved =)
              </label>
            </div>
          </div>
        </div>
        <div v-if="formDisplay=='quantity'">
          <h2>How many do you have in stock?</h2>
          <div>
            <input v-model="quantity" type="number" class="form-control mt-5 mb-5" id="custom-field" placeholder="wait, i have twins!?">
          </div>
        </div>
        <div v-if="formDisplay=='imgUrl'">
          <h2>Let the world see your kewl threads</h2>
          <div>
            <input @change="imgDrop(this)" type="file" class="form-control form-control-file mt-5 mb-5" id="custom-field">
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <button v-if="formDisplay!=='name'" @click="reverseForm" class="mr-2 btn btn-dark btn-circle-2 btn-xl mt-5"><i class="fa fa-chevron-left"></i></button>
          <button v-if="formDisplay!=='imgUrl'" @click="changeForm" class="ml-2 btn btn-dark btn-circle-2 btn-xl mt-5"><i class="fa fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return{
      formDisplay : 'name',
      name : '',
      price : '',
      condition : '',
      quantity : Number,
      imgLocation : '',
      imgUrl : 'http://via.placeholder.com/130x100',
      seller : localStorage.user,
    }
  },
  methods : {
    sell(){
      console.log("ini condition : " + this.condition)
      let formData = new FormData
      formData.append('name', this.name)
      formData.append('file', this.imgUrl)
      formData.append('price', this.price)
      formData.append('description', this.description)
      formData.append('quantity', this.quantity)
      formData.append('seller', this.seller)
      formData.append('condition', this.condition)
      axios({
        url : 'http://localhost:3000/product/',
        method : 'post',
        headers : {
          token : localStorage.token
        },
        data : {
          // formData
          name : this.name,
          price : this.price,
          imgUrl : this.imgUrl,
          description : this.description,
          quantity : this.quantity,
          seller : this.seller,
          condition : this.condition
        }
      })
      .then(({data})=>{
        console.log("berhasil add product")
        console.log(data)
        swal.fire('Sold!','success')
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    imgDrop(input){
      this.imgUrl = event.target.files[0]
      console.log(this.imgUrl)
    },
    changeForm(){
      switch( this.formDisplay){
        case "name" : 
          this.formDisplay = 'price'
          break
        case "price" : 
          this.formDisplay = 'condition'
          break
        case "condition" : 
          this.formDisplay = 'quantity'
          break
        case "quantity" : 
          this.formDisplay = 'imgUrl'
          break
      }
    },
    reverseForm(){
      switch( this.formDisplay){
        case "imgUrl" : 
          this.formDisplay = 'quantity'
          break
        case "quantity" : 
          this.formDisplay = 'condition'
          break
        case "condition" : 
          this.formDisplay = 'price'
          break
        case "price" : 
          this.formDisplay = 'name'
          break
      }
    }
  } 
}
</script>

<style>
  #custom-field{
    max-width: 30%;
    margin: auto;
    height: 75px; 
    border : none;
    border-bottom: 1px solid rgba(39, 39, 39, 0.294);
    box-shadow: none;
    border-radius: 0;
  }

  #custom-field:hover{
    border-bottom : 1px solid rgb(0, 0, 0)
  }


  input[type="text"]:focus,
  select.form-control:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .btn-circle-2.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
  }

  .btn-circle-2 {
      width: 30px;
      height: 30px;
      padding: 6px 0px;
      border-radius: 15px;
      text-align: center;
      font-size: 12px;
      line-height: 1.42857;
  }

  #btn-sell{
    width: 120px;
    height: 70px;
    border-radius: 50px;
    font-size: 20px
  }

  #card{
    position: fixed;
    right: 15vh;
  }

</style>
