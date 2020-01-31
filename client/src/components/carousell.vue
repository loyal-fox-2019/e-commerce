<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide >
        <template v-slot:img>
            <img 
            class="d-block img-fluid w-100"
            width="1024"
            height="400"
            src="https://www.englishcafe.co.id/wp-content/uploads/2017/07/shopping_image_lg.jpg" alt="">
        </template>
    </b-carousel-slide>
    <b-carousel-slide >
        <template v-slot:img>
                <img 
                class="d-block img-fluid w-100"
                width="1024"
                height="400"
                src="https://image.freepik.com/free-photo/women-are-shopping-summer-she-is-using-credit-card-enjoys-shopping_46139-3.jpg" alt="">
        </template>
    </b-carousel-slide>
    <b-carousel-slide>
        <template v-slot:img>
                <img 
                class="d-block img-fluid w-100"
                width="1024"
                height="400"
                src="https://theiexpressblog.com/wp-content/uploads/2019/07/jeddah-shopping.jpg" alt="">
        </template>
    </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
    name: 'carousell',
    data(){
        return{
            slide: 0,
            sliding: null
        }
    },
    methods:{
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        }
    }
}
</script>

<style scoped>
img{
    max-height: 500px;
}

</style>