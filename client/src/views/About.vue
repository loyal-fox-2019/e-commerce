<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div data-testid="PDPImageMain" class="css-r3x4jh">
          <div class="css-1c65ilr ew904gd0">
              <img :src="this.dataItem.image" alt="product image" width="100%;">
          </div>
        </div>
      </div>
      <div class="col-8 text-left"> 
        <h1 class="text-dark">{{this.dataItem.name}}</h1>
        <hr>
        <div style="display:flex;" >
          <p>HARGA</p>
          <h3 style="color:#FA5C3C;margin-left:50px;font-family: 'Patua One', cursive;"> Rp {{dataItem.price}}</h3>
        </div>
        <hr>
        <div style="display:flex;" >
          <p>JUMLAH</p>
          <dd class="css-usbzvy">
              <p data-testid="lblPDPDetailProductStock" class="css-a126dm-unf-heading e1qvo2ff8 text-dark"><b>Stok terbatas!</b> Tersedia {{this.dataItem.stock}}</p>
              <div data-testid="pdpFlexWrapperContainer" class="css-drikti e4u4xey1">
                  <div class="css-udfbf8 e4u4xey0">
                      <div class="css-rbna7x" data-testid="quantityOrder">
                          <div class="css-11mguey-unf-quantity-editor">
                            <i class="fa fa-minus-circle" style="font-size:24px"></i>
                              <input type="number" class="css-yfyd4u-unf-quantity-editor__input" v-model="quantity" :max="this.dataItem.stock" min="1" spinner="1">
                            <i class="fa fa-plus-circle" style="font-size:24px;color:#9AC183;"></i>
                          </div>
                      </div>
                  </div>
                  <div class="css-5wdlb1 e4u4xey0">
                      <div>
                          <p class="css-1195xw3-unf-heading e1qvo2ff8"><span data-testid="lblPDPMinPurchase">Min. pembelian<!-- --> <!-- -->1<!-- --> pcs.&nbsp;</span></p>
                      </div>
                  </div>
              </div>
          </dd>          
        </div>
        <hr>
        <div style="display:flex;" >
          <p>INFO
          <br>
          PRODUK</p>
          <h5 style="margin-left:50px;border-right: 1px solid #E5E7E9;padding:0px 15px;">Berat
            <br>
            <p style="color:black;font-family: 'Patua One', cursive;">500gr</p>
          </h5>

          <h5 style="margin-left:50px;border-right: 1px solid #E5E7E9;padding:0px 15px;">Kondisi
            <br>
            <p style="color:black;font-family: 'Patua One', cursive;">Baru</p>
          </h5>          
        </div>               
      </div>
    </div>
    <hr>
    <div>

        <b-card-header header-tag="nav">
          <b-nav card-header tabs>
            <b-nav-item active="">Deskripsi</b-nav-item>
            <b-nav-item>Ulasan(2)</b-nav-item>
            <b-nav-item>Diskusi(1)</b-nav-item>
          </b-nav>
        </b-card-header>

        <b-card-body class="text-left">
          <b-card-text>
            {{this.dataItem.info}}
          </b-card-text>
        </b-card-body>

    </div>    
    <div class="css-1jk3zjc mb-3">
      <b-navbar variant="faded" type="light" class="row">
          <div class="col-6 text-right">
            <p style="margin:0px 0px;">Total</p>
            <h4 style="color:black;font-family: 'Patua One', cursive;">Rp{{total}}</h4>
          </div>
          <div class="col-6 text-left ">
            <button class="css-1jnqoqu-unf-btn e1ggruw00" data-testid="btnPDPFooterBuy" @click.prevent="addCart"><span>Beli</span></button>
            <button class="css-1y9b0sm-unf-btn e1ggruw00" data-testid="btnPDPFooterAddToCart"><span>Tambah Ke Keranjang</span></button>
          </div>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'about',
    data:function(){
        return{
            dataItem: '',
            quantity: 1,
        }
    },
    created(){
        axios({
            url: `http://localhost:3000/items/${this.$route.params.id}`,
            method: 'get',
        })
        .then(({data})=>{
            this.dataItem = data
        })
        .catch(err=>{
            console.log(err)
        })
    },
    computed: {
      total(){
        let temp = this.quantity * this.dataItem.price
        return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    },
    methods: {
      toTik(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      addCart(){
         axios({
                url:'http://localhost:3000/carts',
                method:'post',
                headers: {
                  token: localStorage.getItem('token')
                },
                data: {
                  item_id : this.$route.params.id,
                  quantity: this.quantity
                }
            })
            .then(({data}) => {
              this.$router.push('/cart')
            })
            .catch(err =>{
                console.log(err)
            })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.css-1c65ilr {
    width: 100%;
    height: 100%;
    cursor: crosshair;
    overflow: hidden;
    text-align: center;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.css-usbzvy {
    display: inline-block;
    vertical-align: top;
    width: 624px;
    padding-left: 20px;
    margin: 0;
}
.css-rbna7x input[type='text'] {
    padding: 1px;
    margin-bottom: 0;
    border: none;
    border-bottom: 1px solid #E5E7E9;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    line-height: 22px;
    font-size: 16px;
    width: 50px;
    margin: 0px 10px;
}
.css-1jk3zjc {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 72px;
    padding: 8px 0;
    background-color: #FFFFFF;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -2px 6px 0 rgba(49,53,59,0.16);
    z-index: 90;
}

.css-1jnqoqu-unf-btn {
    min-width: 120px;
}
.css-1jnqoqu-unf-btn {
    color: #FA591D;
    font-family: 'Nunito Sans',sans-serif;
    font-size: 1rem;
    height: 40px;
    line-height: 20px;
    width: auto;
    border-radius: 8px;
    background-position: center;
    font-weight: 800;
    outline: none;
    padding: 0 16px;
    position: relative;
    -webkit-transition: background 0.8s;
    transition: background 0.8s;
    cursor: pointer;
    display: inline-block;
    background: transparent radial-gradient(circle,transparent 1%,transparent 1%) center/15000%;
    border: 1px solid #FA591D;
    text-indent: initial;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 12px;
}
.css-1y9b0sm-unf-btn {
    min-width: 120px;
}
.css-1y9b0sm-unf-btn {
    color: #FFFFFF;
    font-family: 'Nunito Sans',sans-serif;
    font-size: 1rem;
    height: 40px;
    line-height: 20px;
    width: auto;
    border-radius: 8px;
    background-position: center;
    font-weight: 800;
    outline: none;
    padding: 0 16px;
    position: relative;
    -webkit-transition: background 0.8s;
    transition: background 0.8s;
    cursor: pointer;
    display: inline-block;
    background: #FA591D radial-gradient(circle,transparent 1%,#FA591D 1%) center/15000%;
    border: none;
    text-indent: initial;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: 12px;
}
</style>