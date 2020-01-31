<template>
  <div class="about">
     <router-view></router-view>
    <h1>{{$route.params.id}}</h1>
    <b-container>
      <b-row>
        <card
        v-for="(element, i) in list"
        :key="i"
        class="cards"
        :good="element">
        </card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import card from '../components/card'
import axios from 'axios'

export default {
  data () {
    return {
      list: ''
    }
  },
  components: {
    card
  },
  methods: {
    updatelist: function () {
      axios({
        url: 'http://localhost:3000/inventories/' + this.$route.params.id,
        method: 'GET'
      })
        .then((data) => {
          this.list = data.data
        })
    }

  },
  watch: {
    $route (to, from) {
    }
  },
  created: function () {
    this.updatelist()
  }
}
</script>

<style>
.cards{
  margin-left: 2%;
  margin-top: 2%;
}
</style>
