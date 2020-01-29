import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loggedInUserDetail: {},
    myCarts:[],
    myConditionedInvoices: []


  },
  mutations: {
    SET_IS_LOGIN(state,payload){
      state.isLogin = payload
    },
    SET_LOGGED_IN_USER_DETAIL(state,payload){
      state.loggedInUserDetail = payload
    },
    SET_MY_CARTS(state,payload){
      state.myCarts = payload
    },
    SET_MY_CONDITIONED_INVOICES(state,payload){
      state.myConditionedInvoices = payload
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
          console.log(`TCL: fetchUserDetail -> data`, data)
          commit('SET_IS_LOGIN', true)
          commit('SET_LOGGED_IN_USER_DETAIL', data)
      })
      .catch( ({response})=>{
          console.log('error @fetchUserDetail-store.index \n======================\n', response.data.message)
          dispatch.setDefaultState()
      })
  },
  fetchMyCarts({commit}){
        axios({
          method: 'get',
          url: '/transactions/aggregate',
          headers:{
              token : localStorage.getItem('token')
          }
        })
        .then( ({data}) =>{
            console.log(`TCL: fetchMyCarts -> data`, data)
            commit('SET_MY_CARTS', data)
        })
        .catch( ({response}) =>{
            console.log(' error @fetchMyCarts-store.index \n======================\n', response.data)
            swal.fire(
                'Error With Fetching my carts',
                response.data.message
            )
        })
  },
  fetchMyConditionedInvoices({commit}, payload){
      console.log(`TCL: fetchMyConditionedInvoices -> payload`, payload)
      axios({
          method: 'post',
          url: '/invoices/allConditioned',
          headers:{
              token : localStorage.getItem('token')
          },
          data:payload
      })
      .then( ({data}) =>{
          console.log(`TCL: fetchMyConditionedInvoices -> data`, data)
          commit('SET_MY_CONDITIONED_INVOICES', data)
      })
      .catch( ({response}) =>{
          console.log(' error @fetchMyConditionedInvoices-store.index \n======================\n', response.data)
          swal.fire(
              'Error With Fetching My Invoices',
              response.data.message
        )
      })
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
    isLogin: state=>{
      return state.isLogin
    },
    loggedInUserDetail: state=>{
      return state.loggedInUserDetail
    },
    myCarts: state=>{
      return state.myCarts
    },
    myConditionedInvoices: state=>{
      return state.myConditionedInvoices
    }
  }
})
