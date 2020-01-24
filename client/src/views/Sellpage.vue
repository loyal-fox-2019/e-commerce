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
            <button v-if="formDisplay==='imgUrl'" class="btn btn-dark">Sell</button>
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
            <input v-model="condition" type="text" class="form-control mt-5 mb-5" id="custom-field" placeholder="I wonder...">
          </div>
        </div>
        <div v-if="formDisplay=='quantity'">
          <h2>How many do you have in stock?</h2>
          <div>
            <input v-model="quantity" type="text" class="form-control mt-5 mb-5" id="custom-field" placeholder=" hmm i'd like to think i'm unique">
          </div>
        </div>
        <div v-if="formDisplay=='imgUrl'">
          <h2>Let the world see your kewl threads</h2>
          <div>
            <input @change="imgDrop" type="file" class="form-control form-control-file mt-5 mb-5" id="custom-field">
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <button @click="reverseForm" class="mr-2 btn btn-dark btn-circle-2 btn-xl mt-5"><i class="fa fa-chevron-left"></i></button>
          <button @click="changeForm" class="ml-2 btn btn-dark btn-circle-2 btn-xl mt-5"><i class="fa fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      formDisplay : 'name',
      name : null,
      price : null,
      condition : null,
      quantity : null,
      imgLocation : 'test',
      imgUrl : 'http://via.placeholder.com/130x100',
      seller : localStorage.user,
    }
  },
  methods : {
    imgDrop(){
      this.imgUrl = event.target.files[0]
      console.log(this.imgUrl)
      console.log(this.imgLocation)
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
  .form-control{
    max-width: 30%;
    margin: auto;
    height: 75px; 
    border : none;
    border-bottom: 1px solid rgba(39, 39, 39, 0.294);
    box-shadow: none;
    border-radius: 0;
  }

  .form-control:hover{
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

  #card{
    position: fixed;
    right: 15vh;
  }
</style>
