import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msg: 'Hello from Vuex',
    itemCount: 0,
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    },
    incrementItem(state) {
      state.itemCount++;
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
