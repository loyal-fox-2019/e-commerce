<template>
  <div class="container-fluid">
    <div class="shop-grab-onboard container-fluid">
      <div class="shop-grab-onboard__section shop-grab-onboard__section-title--left">
        <img
          src="https://dev-sayurbox.firebaseapp.com/assets/images/grab-shop-page-delivery.png"
          alt="delivery"
          class="shop-grab-onboard__img shop-grab-onboard__img--delivery"
        />
        <div class="shop-grab-onboard__section-title">Klik, Panen, Kirim</div>
        <div class="shop-grab-onboard__section-desc">Pesan sekarang, langsung dipanen, besok dikirim</div>
      </div>
      <div class="shop-grab-onboard__section">
        <img
          src="https://dev-sayurbox.firebaseapp.com/assets/images/grab-shop-page-farmer.png"
          alt="farmer"
          class="shop-grab-onboard__img"
        />
        <div class="shop-grab-onboard__section-title">Petani Lokal</div>
        <div
          class="shop-grab-onboard__section-desc"
        >Produk dipanen langsung dari petani lokal Indonesia</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.shop-grab-onboard__section {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 50%;
}
.shop-grab-onboard {
  border-bottom: 1px solid #ededed;
  margin-top: 17px;
  margin-bottom: 17px;
  padding-bottom: 17px;
  padding-right: 0;
  padding-left: 0;
}
.container-fluid {
  display: flex;
  flex-direction: unset;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
img {
  max-height: 57px;
}
.shop-grab-onboard__section-title {
  font-size: 16px;
  color: black;
}
.shop-grab-onboard__section-desc {
  color: #959595;
  font-size: 12px;
  text-align: center;
}
</style>