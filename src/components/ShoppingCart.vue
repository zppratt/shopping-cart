<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ itemCount }}</h1>
    <ul id="example-1">
      <li v-for="item in items" :key="item.itemid">
        <div class="media"> 
            <div class="media-left"> 
                <img v-bind:src="item.image" class="media-object" style="width:60px"> 
            </div> 
          
            <div class="media-body"> 
                <h4 class="media-heading"> 
                    {{ item.productName }} 
                </h4>
                <p>
                  {{ item.description }}
                </p> 
                <a v-on:click="incrementItem(item)">Add to cart</a>
            </div> 
        </div>
        {{ item }}
      </li>
      <hr>
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
  padding-bottom: 50px;
}
a {
  color: #42b983;
}
</style>
