import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loggedInUserDetail:{ username:'jap'}


  },
  mutations: {
    SET_IS_LOGIN(state,payload){
      state.isLogin = payload
    },
    SET_LOGGED_IN_USER_DETAIL(state,payload){
      state.loggedInUserDetail = payload
    },
    


  },
  actions: {
    setDefaultState({commit}){
        localStorage.clear()
        commit('SET_IS_LOGIN', false)
        commit('SET_LOGGED_IN_USER_DETAIL', {})
    },
    fetchUserDetail({commit, dispatch}, payload){
      axios({
          method: 'get',
          url: '/users',
          headers:{
              token: localStorage.getItem('token')
          }
      })
      .then( ({data})=>{
          commit('SET_IS_LOGIN', true)
          commit('SET_LOGGED_IN_USER_DETAIL', data)
      })
      .catch( ({response})=>{
          console.log('error @fetchUserDetail-index.js \n======================\n', response.data.message)
          dispatch.setDefaultState()
      })
  },
  fetchAllArticlePaginated(){

  },
  logOut({state, dispatch}, payload){
    swal.fire({
      title: 'Confirmation Needed',
      text: 'You\'re about to be Logged Out',
      showCancelButton: true,
      confirmButtonText: 'confirm'
    })
    .then(result=>{
        if(result.value)
            {
                const tempUsername = state.loggedInUserDetail.username
                dispatch('setDefaultState')
                router.push('/')
                swal.fire(
                    'Log Out Success',
                    `See you again ${tempUsername}`,
                    'success'
                )
                
            }
    })

  },




  },
  modules: {
    
    


  },
  getters:{
    loggedInUserDetail: state=>{
      return state.loggedInUserDetail
    }
  }
})
