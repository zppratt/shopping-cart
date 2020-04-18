<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/shopping-cart-solid.svg" width="100">
    <ShoppingCart msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ShoppingCart from './components/ShoppingCart.vue'  

export default {
  name: 'App',
  components: {
    ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
