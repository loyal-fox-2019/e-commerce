import axios from 'axios'


 const state = {
      transaction : []
  }
 const mutations = {
    fillItem(state,payload){
        state.transaction = payload
    }  
  }
  const actions = {
    fetchAction(context) {
        axios.get({
            url:'http://localhost:3000/transactions',
            method:'get',
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            context.commit('fillItem',data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  }
  const getters = {
      gettransaction : (state) => {
        return  state.transaction
      }
  }

  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  }
