<template>
  <div class="ask">
    <div class="container">
      <div class="row justify-content-center mt-5 text-left">
        <div class="col-10">
          <div class="form p-4 shadow rounded">
            <form @submit.prevent="save">
                <div class="form-group">
                    <label>Name Item</label>
                    <p class="description">Be spesific and imagine your item</p>
                    <input v-model="title" type="text" class="form-control" >
                </div>
                <div class="form-group">
                    <label>Info / Description</label>
                    <p class="description">Include all the information of your item</p>
                    <textarea rows="3" class="form-control" v-model="desc"></textarea>
                </div>
                <div class="form-group">
                    <label>Picture URL</label>
                    <p class="description">Just URL picture</p>
                    <b-form-input type="url" v-model="image"></b-form-input>
                </div>
                <div class="form-group">
                        <label>Price</label>
                        <b-input-group prepend="Rp" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input id="inline-form-input-username" placeholder="Price" type="number" v-model="price"></b-input>
                        </b-input-group>
                </div>
                <div class="form-group">
                        <label>Stock</label>
                        <b-input-group prepend="Pcs" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input id="inline-form-input-username" type="number" v-model="stock"></b-input>
                        </b-input-group>
                </div>                
                <button type="submit" class="btn btn-primary">Create Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  name:'newItem',
  components:{

  },
  data(){
      return{
        title: '',
        desc: '',
        image: '',
        price: 0,
        stock: 0
      }
  },
  methods:{
    save(){
        axios({
            url: `http://localhost:3000/items`,
            method: 'post',
            headers:{
                token : localStorage.getItem('token')
            },
            data:{
                name: this.title,
                info: this.desc,
                price: this.price,
                stock: this.stock,
                image: this.image
            }
            })
            .then(()=>{
            this.title = ''
            this.desc = ''
            this.price = 0
            this.stock = 0
            this.image = ''
            this.$router.push('/')
            })
            .catch(err=>{
                console.log(err)
            })      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  font-weight: 700;
  margin-bottom: 0;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
  margin-top: 1rem;
}
.description {
  margin-bottom: .3rem;
  color: #61737c;
  font-size: 12px;
}
.editr{
  width: 50% !important;
}
</style>