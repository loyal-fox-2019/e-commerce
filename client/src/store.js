import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    role:'customer',
    products:[]
  },
  mutations: {
    changeIsLogin(state){
      state.isLogin = !state.isLogin
    },
    changeAdmin(state){
      state.role = 'admin'
    },
    setDataProduct(state,payload){
      state.products = payload
    }
  },
  actions: {
    getAllProducts({commit, state, dispatch}){
      axios
        .get('/products',{
          headers:{'access-token':localStorage.getItem('token')}
         })
        .then(({data}) => {
          commit('setDataProduct',data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
