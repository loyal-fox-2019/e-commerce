<template>
  <div id="boxdetail" class="animated fadeInUp">
    <b-row>
        <b-col cols="6">
          <img :src="detail.image" alt="" class="left">
        </b-col>
        <b-col cols="5" class="right">
            <b-row>
            </b-row>
            <b-row>
                <b-col cols="3">
                    Name:
                </b-col>
                <b-col>
                    <h2>{{detail.name}}</h2>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="3">
                Price:
                </b-col>
                <b-col>
                <p>{{detail.price}}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="3">
                Description:
                </b-col>
                <b-col>
                {{detail.description}}
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="3">
                Stock:
                </b-col>
                <b-col>
                {{detail.stock}}
                </b-col>
            </b-row>
        </b-col>
        <b-col>
            <router-link :to='closing'>
                <i class="far fa-times-circle" id="close"></i>
            </router-link>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      detail: ''
    }
  },
  computed: {
    closing: function () {
      let a = this.$route.params.id
      return '/' + a
    }
  },
  watch: {
    $route (to, from) {
      axios({
        url: 'http://localhost:3000/inventories/one/' + this.$route.params.detail,
        method: 'GET'
      })
        .then((data) => {
          this.detail = data.data
        })
    }
  },
  created () {
    axios({
      url: 'http://localhost:3000/inventories/one/' + this.$route.params.detail,
      method: 'GET'
    })
      .then((data) => {
        this.detail = data.data
      })
  }

}
</script>

<style>

.left{
  height: 500px;
  width: 500px
}

.right{
    position: absolute;
    top: 150px;
    left: -100px;
    text-align: left
}

#close{
  cursor: pointer;
  font-size: 30px;
  margin-left: -20px
}

#close:hover{
  transform: scale(1.2)
}

</style>
