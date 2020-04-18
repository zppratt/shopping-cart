<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a v-on:click="incrementItem">Add to cart</a>
    <h1>{{ itemCount }}</h1>
    <ul id="example-1">
      <li v-for="item in items" :key="item.itemid">
        <div class="media">
          <img class="mr-3" v-bind:src="item.image" alt="Generic placeholder image">
          <div class="media-body">
            <h5 class="mt-0">{{ item.productName }}</h5>
            {{ item.description }}
          </div>
        </div>
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import items from '../../items.json'

export default {
  name: 'ShoppingCart',
  props: {
  },
  computed: mapState([
    // map this.msg to store.state.msg
    'msg',
    'itemCount',
    'items'
  ]),
  methods: {
    ...mapMutations([
      'incrementItem',
      'updateItems'
    ])
  },
  created() {
    this.updateItems(items)
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
