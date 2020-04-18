import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msg: 'Hello from Vuex',
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
