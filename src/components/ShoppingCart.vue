<template>
  <div class="template">
    <div class="sticky card text-right headline">
      <h3>Total: {{ total | currency }}</h3>
    </div>
    <div class="jumbotron">
      <div class="row">
        <div class="col-10">
          <ul id="example-1">
            <li v-for="item in items" :key="item.itemid" class="pb-5">
              <div class="media"> 
                  <div class="media-left"> 
                      <img v-bind:src="item.image" class="media-object" style="width:60px"> 
                  </div> 
                
                  <div class="media- pl-5"> 
                      <h4 class="media-heading"> 
                          {{ item.productName }} 
                      </h4>
                      <p>
                        {{ item.description }}
                      </p>
                      <div class="w-25 text-center">
                        <div class="input-group">
                          <span class="input-group-btn">
                              <button v-on:click="removeFromCart(item)" type="button" class="btn btn-danger btn-number">
                                <span>-</span>
                              </button>
                          </span>
                          <div class="card w-25 align-middle inline-block">{{item.available}}</div>
                          <span class="input-group-btn">
                              <button v-on:click="addToCart(item)" type="button" class="btn btn-success btn-number">
                                  <span>+</span>
                              </button>
                          </span>
                        </div>
                      </div>
                  </div> 
              </div>
            </li>
            <hr>
          </ul>
        </div>
        <div class="col-2">
          <h1>In Cart</h1>
          <hr>
          <div class="">
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
      'addToCart',
      'removeFromCart',
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
  text-align: left !important;
  display: inline-block;
  margin: 0 10px;
}
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
}
.headline {
  z-index:99
}
</style>
