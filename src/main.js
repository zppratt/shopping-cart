import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    msg: 'Hello from Vuex'
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
