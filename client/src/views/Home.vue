<template>
  <div class="home">
    <div class="container">
        <div class="row justify-content-center">
        <div class="css-1hwy0bb col-3 m-3" v-for="(item,i) in allItem" :key="i">
          <a class="css-89jnbj">
            <div class="css-ds2sdp">
              <div class="wishlistButton">
                <div class="css-gkm4i3 e1nksy3g0">
                  <div class="css-1i07z2j">
                    <span>Tambah ke Wishlist</span>
                    </div>
                  </div>
                    <span class="css-lr6een">
                      <span class="css-gu7dmw"></span>
                      <span class="css-1xpx1gl "></span>
                      <div class="css-ckbit5"></div>
                    </span>
                </div>
              </div>
              <div class="css-16vw0vn">
                <div class="css-79elbk">
                  <div class="css-1c0vu8l">
                    <div class="css-1h1ufj e18n9kgb0" height="auto">
                      <img  :src="item.image" alt="Huruf Font Dan Tipografi Edisi Terbaru" width="100%">
                    </div>
                  </div>
                </div>
                <div class="text-left p-2">
                  <router-link :to="`/about/${item._id}`" style="text-decoration:none;">
                  <span style="color:black;">{{item.name}}</span>
                  
                  <div>
                    <div class="css-1beg0o7">
                      <span style="color:red;">Rp {{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</span>
                    </div>
                  </div>
                  <div class="css-tpww51">
                    <div class="css-1hy7m5k">
                      <img alt="EDC Online" src="https://ecs7.tokopedia.net/img/power_merchant_badge.png" width="60%">
                    </div>
                      <div class="css-vbihp9 heartBeat">
                        <span class="css-17rzmg2">{{item.seller.name}}</span>
                      </div>
                  </div>
                  <div class="css-f70okh"><div>
                    <img class="css-177n1u3" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/4fede911.svg" alt="star">
                    <img class="css-177n1u3" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/4fede911.svg" alt="star">
                    <img class="css-177n1u3" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/4fede911.svg" alt="star">
                    <img class="css-177n1u3" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/4fede911.svg" alt="star">
                    <img class="css-177n1u3" src="https://ecs7.tokopedia.net/assets-tokopedia-lite/v2/zeus/production/4fede911.svg" alt="star"> 
                    <span>(90)</span>
                  </div>
                </div>
                </router-link>
              </div>
          </div>
          </a>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'home',
  components: {

  },
  data(){
    return{

    }
  },
    computed:{
    ...mapGetters({
      allItem: 'item/getProducts'
    })
  },
  methods:{
    ...mapActions({
      fetchAction: 'item/fetchAction'
    }),
    stok(num){
      return num
    },
  },
  created(){
    this.fetchAction()
  }
}
</script>

<style scoped>
.css-1hwy0bb:hover{
  transform: scale(1.05)
}
.css-1hwy0bb {
    background: #fff;
    padding: 0 0.8% 3%;
    width: 20%;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
    transition: 0.3s;
    border-radius: 5px; 
}
.css-1h1ufj {
    background-color: transparent;
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0px auto;
}
.css-1c0vu8l {
    position: relative;
    height: 0px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding-bottom: 100%;
    width: 100%;
    text-overflow: ellipsis;
    background: rgb(246, 246, 246);
    transition: box-shadow 0.25s ease 0s;
    overflow: hidden;
}
.css-79elbk {
    position: relative;
}
.css-16vw0vn {
    position: relative;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
    border-radius: 8px;
    min-width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.css-tpww51 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.857143rem;
    line-height: 1.5;
    margin: 4px 0px;
}
.css-17rzmg2 {
    display: block;
    width: 100%;
    font-size: 0.857143rem;
    height: 20px;
    color: rgba(0, 0, 0, 0.54);
    margin-top: 0px;
    text-overflow: ellipsis;
    transform: unset;
    max-width: 100px;
    overflow: hidden;
    transition: transform 0.3s ease 0s;
}
.css-vbihp9{
color: rgba(0,0,0,.7);
font-family: 'open sans','tahoma',sans-serif;
font-size: 0.857143rem;
line-height: 1.5;
box-sizing: inherit;
display: inline-block;
text-overflow: ellipsis;
height: 20px;
vertical-align: top;
overflow: hidden;
}

.css-vbihp9:hover{
  animation-duration: 2s;
  animation-delay: 5s;
  animation-iteration-count: infinite;
}
</style>