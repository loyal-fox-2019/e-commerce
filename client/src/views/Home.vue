<template>
  <div class="home">
        <div class="row">
        <div class="css-1hwy0bb col-4 mb-4 ml-3 mr-2" v-for="(item,i) in allItem" :key="i">
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
                      <img  :src="item.image" alt="Huruf Font Dan Tipografi Edisi Terbaru">
                    </div>
                  </div>
                </div>
                <div class="css-11s9vse">
                  <span class="css-1tu1s3r">{{item.name}}</span>
                  <div>
                    <div class="css-1beg0o7">
                      <span class="css-o5uqvq">Rp {{item.price}}</span>
                    </div>
                  </div>
                  <div class="css-tpww51">
                    <div class="css-1hy7m5k">
                      <img alt="EDC Online" src="https://ecs7.tokopedia.net/img/power_merchant_badge.png">
                    </div>
                    <div class="css-vbihp9">
                      <span class="css-17rzmg2">Sukoharjo</span>
                      <span class="css-17rzmg2">Tina</span>
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
              </div>
          </div>
          </a>
        </div>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  data(){
    return{
      allItem:[
        {
          image: 'https://images.k24klik.com/product/0104e0019.jpg',
          name:'lirika',
          price:5,
          stock: 10
        },
        {
          image: 'https://images.k24klik.com/product/0104e0019.jpg',
          name:'lirika',
          price:5,
          stock: 10
        },
        {
          image: 'https://images.k24klik.com/product/0104e0019.jpg',
          name:'lirika',
          price:5,
          stock: 10
        },
        {
          image: 'https://images.k24klik.com/product/0104e0019.jpg',
          name:'lirika',
          price:5,
          stock: 10
        }        
      ]
    }
  }
}
</script>

<style scoped>
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
</style>