<template>
  <div class="template">
    <div class="sticky card pull-left text-right">
      <h1>Total: {{ total | currency }}</h1>
    </div>
    <div class="jumbotron">
      <div class="row">
        <div class="col-10">
          <h1 class="pb-5">{{ msg }}</h1>
          <ul id="example-1">
            <li v-for="item in items" :key="item.itemid" class="pb-5">
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
                      <button class="btn btn-primary" v-on:click="incrementItem(item)">Add to cart</button>
                  </div> 
              </div>
              {{ item }}
            </li>
            <hr>
          </ul>
        </div>
        <div class="col-2">
          <div class="sticky">
            <ul id="cart">
              <CartItem />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import items from '../../items.json'
import CartItem from './CartItem.vue'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export default {
  name: 'ShoppingCart',
  components: {
    CartItem
  },
  computed: {
    ...mapState([
      // map this.msg to store.state.msg
      'msg',
      'itemCount',
      'items',
      'cart'
    ]),
    ...mapGetters([
      'total',
      'uniqueItems'
    ])
  },
  methods: {
    ...mapMutations([
      'incrementItem',
      'updateItems'
    ])
  },
  filters: {
    currency: function (value) {
      if (!value) return ''
      return formatter.format(value);
    }
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
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
</style>
