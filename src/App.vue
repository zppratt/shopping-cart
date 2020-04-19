<template>
  <div id="app" class="container">
    <div class="text-center">
      <img class="mb-5" src="./assets/shopping-cart-solid.svg" width="100">
    </div>
    <ShoppingCart />
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
