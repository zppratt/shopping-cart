<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a v-on:click="incrementItem">Add to cart</a>
    <h1>{{ itemCount }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'ShoppingCart',
  props: {
    msg: String
  },
  computed: mapState([
    // map this.msg to store.state.msg
    'msg',
    'itemCount'
  ]),
  methods: {
    ...mapMutations([
      'incrementItem'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
