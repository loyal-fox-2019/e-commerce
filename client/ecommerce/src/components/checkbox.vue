<template>
<div>
    <b-row class="animated fadeInUp">
        <b-col cols="1">
            <b-form-checkbox
            v-model="status"
            value="true"
            ></b-form-checkbox>
        </b-col>
        <b-col cols="2">
            {{dat.inventory.name}}
        </b-col>
        <b-col cols="2">
            {{dat.amount}}
        </b-col>
        <b-col cols="2">
            {{rupiahRp}}
        </b-col>
        <b-col cols="2">
           Rp. {{total}},-
        </b-col>
        <b-col cols="1">
          <i class="fas fa-window-close remove" @click="remve"></i>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['dat'],
  data () {
    return {
      status: false
    }
  },
  watch: {
    status: function (baru, lama) {
      let goodout = {
        goodsprice: this.ttl,
        cartid: this.dat['_id'],
        status: this.status
      }
      this.$emit('cek', goodout)
    }
  },
  methods: {
    remve: function () {
      axios({
        url: 'http://localhost:3000/carts/' + this.dat._id,
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.$emit('rmveCart')
        })
    }
  },
  computed: {
    ttl: function () {
      return Number(this.dat.inventory.price) * Number(this.dat.amount)
    },
    rupiahRp: function () {
      let result = []
      let params = this.dat.inventory['price'].toString()
      let key = 1
      for (let i = params.length - 1; i >= 0; i--) {
        if (key % 3 === 0 && params.length !== key) {
          result.unshift(`.${params[i]}`)
        } else (result.unshift(params[i]))
        key++
      }
      return `Rp. ${result.join('')},-`
    },
    total: function () {
      let result = []
      let tmp = Number(this.dat.amount) * this.dat.inventory.price
      let params = tmp.toString()
      let key = 1
      for (let i = params.length - 1; i >= 0; i--) {
        if (key % 3 === 0 && params.length !== key) {
          result.unshift(`.${params[i]}`)
        } else (result.unshift(params[i]))
        key++
      }
      return result.join('')
    }
  }
}
</script>

<style>
.remove{
  font-size: 20px;
  cursor: pointer;
}

.remove:hover{
  transform: scale(1.2);
  transition: 400ms;
  color: red
}

</style>
