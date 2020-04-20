import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(BootstrapVue);

const store = new Vuex.Store({ // TODO its own file
  state: {
    msg: 'Welcome to the cart',
    itemCount: 0,
    items: [],
    cart: [],

  },
  getters: {
    total(state) {
      return state.cart.length ? state.cart
        .map(item => item.price)
        .reduce((total, price) => total + price) : 0;
    },
    uniqueItems(state) {
      return state.cart.reduce((unique, item) =>
          unique.some(x => x.itemid === item.itemid) ? unique : [...unique, item]
      , [])
    }
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    },
    addToCart(state, item) {
      var foundIndex = state.items.findIndex(x => x.itemid == item.itemid);
      if (state.items[foundIndex].available <= 0) {
        return;
      }
      if (!state.items[foundIndex]) {
        console.log('Item not found at index: ' + foundIndex);
        return;
      }
      // TODO using this "findIndex" value in order to mutate, find a different way
      state.items[foundIndex].available--;
      state.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      console.log("Cart: " + state.cart);
    },
    removeFromCart(state, item) {
      // TODO do this without findIndex / direct array mutation?
      const foundItemIndex = state.items.findIndex(x => x.itemid === item.itemid);
      if (foundItemIndex === -1) {
        return;
      }
      const foundCartIndex = state.cart.findIndex(x => x.itemid === item.itemid)
      if (foundCartIndex !== -1) {
        state.items[foundItemIndex].available++;
        state.cart.splice(foundCartIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      console.log("Cart: " + state.cart);
    },
    updateItems(state, items) {
      state.items = items
    },
    updateCart(state, cart) {
      state.cart = cart;
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
