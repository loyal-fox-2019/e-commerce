import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        tempCart: {},
        currency: ''
    },
    mutations: {
        addItemToCart(state, payload) {
            state.cart = payload
        },
        addItemToTempCart(state, payload) {
            state.tempCart = payload
        },
        setCartClear(state){
            state.cart.clear
        },
        currencyFormat(state, payload){
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
        }

    },
    actions: {
        addItemToCart(context, payload) {
            context.commit('addItemToCart', payload)
        },
        addItemToTempCart(context, payload) {
            context.commit('addItemToTempCart', payload)
        },
        setCartClear(context){
            context.commit('setCartClear')
        },
        currencyFormat(context, payload){
            context.commit('currencyFormat', payload)
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
        }
    }
})
