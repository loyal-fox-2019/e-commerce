<template>
  <div>
      <h2>Checkout</h2>
      <hr>
      <b-container>
          <h3 class="checkoutitem">List Item:</h3> <br>
          <check v-for="(check, i) in listcheckout" :key="i" :dat="check" @cek="counted" @rmveCart="removecart">
          </check>
          <b-row>
              <b-col cols="7">
                  Total
              </b-col>
              <b-col cols="2">
                {{totalss}}
              </b-col>
          </b-row>
          <hr>
          <b-button id="outs" variant="success" @click="pay">Checkout</b-button>
          <br><br><hr>
          <h2>unconfirm</h2>
          <confirmdelivery v-for="(cn, i) in cnfrm" :key="i" :unconfirmbuy="cn" @confirmdelivery="thanks"></confirmdelivery>
      </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import check from '../components/checkbox'
import Swal from 'sweetalert2'
import confirmdelivery from '../components/unconfirm'
export default {
  components: {
    check,
    confirmdelivery
  },
  data () {
    return {
      listcheckout: null,
      totalprice: 0,
      tmpr: 0,
      cnfrm: ''
    }
  },
  methods: {
    counted: function (params) {
      if (params.status === 'true') {
        for (let i = 0; this.totalprice.length; i++) {
          if (this.totalprice[i]['_id'] === params.cartid) {
            this.totalprice[i].status = params.status
            this.tmpr += Number(params.goodsprice)
          }
        }
      } else {
        for (let i = 0; this.totalprice; i++) {
          if (this.totalprice[i]['_id'] === params.cartid) {
            this.totalprice[i].status = params.status
            this.tmpr -= Number(params.goodsprice)
          }
        }
      }
    },
    pay: function () {
      let checkout = []
      this.totalprice.forEach(element => {
        if (element.status === 'true') {
          checkout.push(element['_id'])
        }
      })
      axios({
        url: 'http://localhost:3000/carts/checkout',
        method: 'POST',
        data: { checkout },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((data) => {
          this.patchUnconfirm()
          this.patch()
          const h = this.$createElement
          const vNodesMsg = h(
            'p',
            { class: ['text-center', 'mb-0'] },
            [
              h('b-spinner', { props: { type: 'grow', small: true } }),
              ' Thank You ',
              h('strong', {}, 'For'),
              ` Shopping `,
              h('b-spinner', { props: { type: 'grow', small: true } })
            ]
          )
          const vNodesTitle = h(
            'div',
            { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
            [
              h('strong', { class: 'mr-2' }, 'Do Re Mi'),
              h('small', { class: 'ml-auto text-italics' }, 'Checkout')
            ]
          )
          this.$bvToast.toast(vNodesMsg, {
            title: [vNodesTitle],
            autoHideDelay: 5000,
            variant: 'dark'
          })
        })
        .catch((eerr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Out of Stock'
          })
        })
    },
    removecart: function () {
      this.patch()
      this.patchUnconfirm()
      const h = this.$createElement
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-0'] },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
          ' Your ',
          h('strong', {}, 'Cart'),
          ` Deleted `,
          h('b-spinner', { props: { type: 'grow', small: true } })
        ]
      )
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, 'Do Re Mi'),
          h('small', { class: 'ml-auto text-italics' }, 'Checkout')
        ]
      )
      this.$bvToast.toast(vNodesMsg, {
        title: [vNodesTitle],
        autoHideDelay: 5000,
        variant: 'danger'
      })
    },
    patch: function () {
      axios({
        url: 'http://localhost:3000/carts',
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.listcheckout = data.data
          this.totalprice = data.data
        })
    },
    patchUnconfirm: function () {
      axios({
        url: 'http://localhost:3000/carts/history/user',
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          this.cnfrm = data.data
        })
    },
    thanks: function () {
      this.patchUnconfirm()
      const h = this.$createElement
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-0'] },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
          ' Thank ',
          h('strong', {}, 'You'),
          ` for Confirm `,
          h('b-spinner', { props: { type: 'grow', small: true } })
        ]
      )
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, 'Do Re Mi'),
          h('small', { class: 'ml-auto text-italics' }, 'Confirm')
        ]
      )
      this.$bvToast.toast(vNodesMsg, {
        title: [vNodesTitle],
        autoHideDelay: 5000,
        variant: 'success'
      })
    }
  },
  computed: {
    totalss: function () {
      let result = []
      let params = this.tmpr.toString()
      let key = 1
      for (let i = params.length - 1; i >= 0; i--) {
        if (key % 3 === 0 && params.length !== key) {
          result.unshift(`.${params[i]}`)
        } else (result.unshift(params[i]))
        key++
      }
      return `Rp. ${result.join('')},-`
    }
  },
  created () {
    this.patch()
    this.patchUnconfirm()
  }
}
</script>

<style>
.checkoutitem{
    text-align: left;
}
#outs{
    margin-left: 35%
}
</style>
