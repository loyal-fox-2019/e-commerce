import axios from '../../helpers/baseRoute'
import router from '../../router'

export default {
    namespaced: true,
    state: {
        products: [],
        userProducts: [{
            _id:'asdfasdf',
            image:'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg',
            description:'asdfasdf asdfasdf',
            price:0,
            stock:0,
            seller:{name:'dummy'}
        }],
        cart: [],
        success: false,
        fail: false,
        errorMessage: '',
        singleProduct: '',
        quantity: 0,
        finalTotal: 0,
        sellTransaction: [],
        buyTransaction: [],
        allTransactions: [],
        role: '',
        upId: '',
        upName: '',
        upDescription: '',
        upPrice: '',
        upStock: ''
    },
    mutations: {
        SET_UP_NAME(state,payload) {
            state.upName = payload
        },
        SET_UP_DESCRIPTION(state,payload) {
            state.upDescription = payload
        },
        SET_UP_PRICE(state,payload) {
            state.upPrice = payload
        },
        SET_UP_STOCK(state,payload) {
            state.upStock = payload
        },
        setUpdateData(state,payload) {
            state.upId = payload.id
            state.upName = payload.name
            state.upDescription = payload.description
            state.upPrice = payload.price
            state.upStock = payload.stock
            router.push({path:'/add-product'})
        },
        setProducts(state, payload) {
            state.products = payload
        },
        setUserProducts(state, payload) {
            state.userProducts = payload
        },
        setErrorMessage( state,payload ) {
            state.errorMessage = payload
        },
        addProduct( state,payload ) {
            state.products.push(payload)
            state.userProducts.push(payload)
        },
        singleProduct( state,payload ) {
            state.singleProduct = payload
        },
        setCart( state,payload ) {
            state.finalTotal = 0
            state.quantity = 0
            state.cart = payload
            for( let item of state.cart ) {
                state.finalTotal += item.quantity * item.item.price 
                state.quantity += item.quantity
            }
        },
        updateCart ( state,payload ) {
            let temp = []
            for( let item of state.cart ) {
                if(item._id !== payload) {
                    temp.push(item)
                } else {
                    state.finalTotal -= item.quantity * item.item.price
                    state.quantity -= item.quantity
                }
            }
            state.cart = temp
        }
        // updateProducts( state,payload ) {

        // }
    },
    actions: {
        GET_PRODUCTS ({ commit, rootState, state }) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: '/product'
            })
                .then( ({data}) => {
                    commit('setProducts',data)
                    rootState.isLoading = false
                    state.success=true
                })
                .catch( err => {
                    commit('setErrorMessage',err.response.data.errors)
                    rootState.isLoading = false
                    state.fail= true
                })
        },
        GET_USER_PRODUCTS ({ commit, rootState, state }) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: '/user?product=1',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('setUserProducts',data)
                    rootState.isLoading = false
                    state.success=true
                })
                .catch( err => {
                    commit('setErrorMessage',err.response.data.errors)
                    rootState.isLoading = false
                    state.fail= true
                })
        },
        ADD_PRODUCT ({ commit, rootState }, payload) {
            rootState.isLoading = true
            let fd = payload.fd
            axios({
                method: 'post',
                url:'/product',
                data: fd,
                headers: { token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('addProduct',data)
                    router.push({path:'/'})
                    rootState.isLoading = false
                    rootState.success=true
                    
                    rootState.successMessage = "Added Product"
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.fail= true
                    rootState.failMessage = err.response.data.errors
                })
        },
        GET_SINGLE_PRODUCT ({ commit, rootState }, payload) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: `/product/${payload}`,
                headers: { token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    commit('singleProduct',data)
                    rootState.isLoading = false
                })
                .catch ( err => {
                    rootState.isLoading = false
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        ADD_TO_CART ({ rootState }, payload) {
            rootState.isLoading = true
            axios({
                method: 'patch',
                url: `/user`,
                data: {
                    productId: payload.productId,
                    quantity: payload.quantity
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then( () => {
                    router.push({path:'/'})
                    rootState.isLoading = false
                    rootState.success = true
                    rootState.successMessage = 'Item added to cart.'
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        GET_CART ({ commit,rootState }) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: '/user',
                headers: { token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    rootState.isLoading = false
                    commit('setCart',data.cart)
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        CHECK_OUT ({ state,rootState }) {
            rootState.isLoading = true
            axios({
                method: 'put',
                url: '/user',
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    rootState.isLoading = false
                    router.push({path: '/'})
                    rootState.success = true
                    rootState.successMessage = 'Checkout success.'
                    state.cart = []
                    state.quantity = 0
                    state.finalTotal = 0
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        GET_SELL ({ state,rootState }) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: '/transaction/sell',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    rootState.isLoading = false
                    state.sellTransaction = data
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.failMessage = err.response.data.errors
                    rootState.fail = true
                })
        },
        GET_BUY ({ state,rootState }) {
            rootState.isLoading = true
            axios({
                method: 'get',
                url: '/transaction/buy',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    rootState.isLoading = false
                    state.buyTransaction = data
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.failMessage = err.response.data.errors
                    rootState.fail = true
                })
        },
        UPDATE_STATUS ({ rootState,dispatch },payload) {
            axios({
                method: 'put',
                url: `/transaction/${payload.id}`,
                data: {
                    status: payload.status
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    dispatch('GET_SELL')
                    dispatch('GET_BUY')
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        GET_USER ({ state }) {
            axios({
                method: 'get',
                url: '/user',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    state.role = data.role
                })
                .catch( () => {
                })
        },
        GET_ALL_TRANSACTIONS ({ state,rootState }) {
            axios({
                method: 'get',
                url: '/transaction',
                headers: {token: localStorage.getItem('token')}
            })
                .then( ({data}) => {
                    state.allTransactions = data
                })
                .catch( err => {
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        },
        UPDATE_PRODUCT ({ state,rootState }, payload ) {
            rootState.isLoading = true
            axios({
                method: 'put',
                url: `/product/${payload.id}`,
                data: {
                    name: payload.name,
                    description: payload.description,
                    price: payload.price,
                    stock: payload.stock
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    rootState.isLoading = false
                    rootState.success = true
                    rootState.successMessage = 'Update success'
                    state.upId = ''
                    state.upName = ''
                    state.upDescription = ''
                    state.upPrice = ''
                    state.upStock = ''
                    router.push({path:'/'})
                })
                .catch( err => {
                    rootState.isLoading = false
                    rootState.fail = true
                    rootState.failMessage = err.response.data.errors
                })
        }
    },
  }
  