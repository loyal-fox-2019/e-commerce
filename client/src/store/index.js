import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    invList: [],
    myInv: [],
    detailBarang: {},
    bagList: [],
    recapList: []
  },
  mutations: {
    saveInvList(state, data) {
      state.invList = data
    },
    saveMyInv(state, data) {
      state.myInv = data
    },
    saveInv(state, data) {
      state.detailBarang = data
    },
    saveBagList(state, data) {
      state.bagList = data
    },
    saveRecapList(state, data) {
      state.recapList = data
    }
  },
  actions: {
    getInvList({ commit }) {
      let config
      if (!localStorage.getItem('token')) {
        config = {
          method: 'get',
          url: 'http://localhost:3000/inventori/'
        }
      } else {
        config = {
          method: 'get',
          url: 'http://localhost:3000/inventori/',
          headers: {
            token: localStorage.getItem('token')
          }
        }
      }
      axios(config)
        .then(({ data }) => {
          // eslint-disable-next-line
          // console.log(data)
          commit('saveInvList', data)
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    addInventori({ commit }, data) {
      commit('saveNewInv', data)
    },
    getMyInv({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/inventori/own',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('saveMyInv', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getInv({ commit }, item) {
      axios({
        method: 'get',
        url:
          'http://localhost:3000/inventori/' +
          item.userId +
          '/' +
          item.idBarang,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('saveInv', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getBagList({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/bag/',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            if (data.length !== 0) {
              let unpaidList = []
              data.forEach((item) => {
                if (!item.status) {
                  unpaidList.push(item)
                }
              })
              commit('saveBagList', unpaidList)
              resolve()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getCheckout({ commit }, data) {
      let items = []
      data.forEach((item) => {
        items.push({
          user: item.userId,
          item: item.productId._id,
          jumlah: item.jumlah,
          tanggal: new Date()
        })
        let stok = item.productId.stok - item.jumlah
        axios({
          method: 'put',
          url:
            'http://localhost:3000/inventori/update-stok/' + item.productId._id,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            stok: stok
          }
        })
          .then(({ data }) => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      // console.log(items)
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/recaps/add',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            items: items
          }
        })
          .then(({ data }) => {
            return axios({
              method: 'put',
              url: 'http://localhost:3000/bag/checkout',
              headers: {
                token: localStorage.getItem('token')
              }
            })
          })
          .then(({ data }) => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecapList({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/recaps/',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(result)
          commit('saveRecapList', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
