import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// const url = 'http://34.66.28.216';
const url = 'http://localhost:3000';

const base = axios.create({
    baseURL: url
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        tempCart: {},
        currency: '',
        listItem: [],
        isLoading: 'loading',
        message: {},
        userId: ""
    },
    mutations: {
        addItemToCart(state, payload) {
            state.cart = payload
        },
        addItemToTempCart(state, payload) {
            state.tempCart = payload
        },
        setCartClear(state) {
            state.cart.clear
        },
        currencyFormat(state, payload) {
            let segment = [];
            let n = [];
            let priceReverse = "0" + payload.toString().split("").reverse().join("");
            for (let i = 1; i <= priceReverse.length + 1; i++) {
                n.unshift(priceReverse[i]);
                if (i % 3 === 0) {
                    segment.unshift(n.join(""));
                    n = [];
                }
            }
            state.currency = segment.join(".");
        },
        getListItems(state, payload) {
            state.listItem = payload
        },
        setLoading(state, payload) {
            state.isLoading = payload
        },
        setMessage(state, payload) {
            state.message = payload
        },
        setUserId(state, payload) {
            state.userId = payload
        }
    },
    actions: {
        addItemToCart(context, payload) {
            context.commit('addItemToCart', payload)
        },
        addItemToTempCart(context, payload) {
            context.commit('addItemToTempCart', payload)
        },
        setCartClear(context) {
            context.commit('setCartClear')
        },
        currencyFormat(context, payload) {
            context.commit('currencyFormat', payload)
        },
        getListItems(context, payload) {
            let searchUrl = "";
            if (payload) {
                searchUrl = `/api/items/${payload}`
            } else {
                searchUrl = '/api/items'
            }

            base({
                method: 'get',
                url: searchUrl
            }).then(response => {
                // console.log(response.data.data);
                context.commit('getListItems', response.data.data);
                context.commit('setLoading', '')
            }).catch(err => {
                console.log(err.response);
            })
        },
        deleteItem(context, payload) {
            Vue.dialog
                .confirm("Delete this Item ?")
                .then(dialog => {
                    base({
                        method: 'delete',
                        url: '/api/items/' + payload,
                        headers: {token: localStorage.getItem('token')}
                    }).then(response => {
                        // console.log(response.data);
                        context.commit('setMessage', {
                            message: response.data.message,
                            type: 'success'
                        })
                    }).catch(err => {
                        // console.log(err.response.data.errMsg);
                        context.commit('setMessage', {
                            message: err.response.data.errMsg,
                            type: 'error'
                        })
                    });
                    dialog.close()
                })
                .catch(err => {
                    console.log({err})
                    context.commit('setMessage', {
                        message: "delete item canceled",
                        type: 'info'
                    })
                })
        },
        viewUser(context, payload) {
            if (!localStorage.getItem('token')) {
                return
            }
            base({
                method: 'get',
                url: '/api/users/',
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(response => {
                context.commit('setUserId', response.data.data._id)
            }).catch(err => {
                console.log(err.response)
            })
        },
        editUser(context, payload) {
            Vue.dialog
                .confirm('Update data ?')
                .then(dialog => {
                    base({
                        method: 'put',
                        url: '/api/items/' + payload.id,
                        data: {
                            name: payload.name,
                            stock: payload.stock,
                            price: payload.price,
                            image: payload.image,
                            description: payload.description
                        },
                        headers: {token: localStorage.getItem('token')}
                    }).then(response => {
                        // console.log(response.data);
                        context.commit('setMessage', {
                            message: response.data.message,
                            type: 'success'
                        })
                    }).catch(err => {
                        console.log(err.response);
                        context.commit('setMessage', {
                            message: err.response.data.errMsg,
                            type: 'error'
                        })
                    })
                    dialog.close()
                })
                .catch(err => {
                    context.commit('setMessage', {
                        message: "update item canceled",
                        type: 'info'
                    })
                })
        }
    },
    modules: {},
    getters: {
        cartList: state => {
            return state.cart
        },
        cartTemp: state => {
            return state.tempCart
        },
        currency: state => {
            return state.currency
        },
        itemList: state => {
            return state.listItem
        },
        loadingIs: state => {
            return state.isLoading
        },
        message: state => {
            return state.message
        },
        userId: state => {
            return state.userId
        }
    }
})
