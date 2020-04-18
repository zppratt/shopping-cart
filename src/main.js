import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(BootstrapVue);

const store = new Vuex.Store({
  state: {
    msg: 'Welcome to the cart',
    itemCount: 0,
    items: [],
    cart: []
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    },
    incrementItem(state, item) {
      var foundIndex = state.items.findIndex(x => x.itemid == item.itemid);
      if (state.items[foundIndex].available <= 0) {
        return;
      }
      if (!state.items[foundIndex]) {
        console.log('Item not found at index: ' + foundIndex);
        return;
      }
      state.items[foundIndex].available--;
      state.cart.push(item);
      console.log("Cart: " + state.cart);
    },
    updateItems(state, items) {
      state.items = items
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
