import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    isAdmin: false,
    loginStatus: false,
    categoryList: [
      {
        name: 'Brass',
        index: 0,
        image:
          'https://assets.dci.org/5b8d9945aaad8c0d5a2d8053_V49XGqF4YXXdTkU3WyyQT7FvyIZKiUVg.jpg'
      },
      {
        name: 'Battery',
        index: 1,
        image:
          'https://d2779tscntxxsw.cloudfront.net/5b5f0ee052d03.png?width=1200&quality=80'
      },
      {
        name: 'Front Ensemble',
        index: 2,
        image: 'https://i.ytimg.com/vi/zmZgDV3_DxA/maxresdefault.jpg'
      }
    ],
    activePage: {
      name: '',
      description: '',
      image: '',
      itemList: []
    },
    allItem: null
  },
  mutations: {
    LOGOUT(state) {
      Swal.fire('Logout Success', 'Thank you for coming!', 'success')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      state.isAdmin = false
      state.loginStatus = false
    },
    CHANGE_ADMIN(state) {
      console.log('change here')
      state.isAdmin = true
    },
    CHANGE_STATUS(state) {
      state.loginStatus = true
    },
    SET_ITEM(state, data) {
      state.allItem = data
    }
  },
  actions: {
    FETCH_ALL_ITEM(context) {
      Swal.showLoading()
      axios
        .get(`${this.state.baseUrl}/item`)
        .then(({ data }) => {
          Swal.close()
          context.commit('SET_ITEM', data)
        })
        .catch(err => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.message
          })
        })
    },
    FETCH_ITEM(context) {
      console.log(this.state.activePage.name)
      Swal.showLoading()
      axios
        .get(`${this.state.baseUrl}/item/category/${this.state.activePage.name}`)
        .then(({ data }) => {
          Swal.close()
          context.commit('SET_ITEM', data)
        })
        .catch(err => {
          Swal.close()
          console.log('error euy', err.response)
        })
    }
  },
  modules: {}
})
