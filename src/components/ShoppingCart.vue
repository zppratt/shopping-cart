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
                      <img onerror="this.onerror=null;this.src='https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';" v-bind:src="item.image" class="media-object" style="width:60px"> 
                  </div> 
                
                  <div class="media- pl-5"> 
                      <h4 class="media-heading"> 
                          {{item.manufacturer}} | <a v-bind:href="item.url" class="">{{ item.productName }}</a> 
                      </h4>
                      <p>
                        {{ item.description }}
                      </p>
                      <div class="text-center row ml-3">
                        <div class="w-25 input-group">
                          <span class="input-group-btn">
                              <button v-on:click="removeFromCart(item)" type="button" class="btn btn-danger btn-number">
                                <span>-</span>
                              </button>
                          </span>
                          <div class="card w-25 align-middle inline-block">{{totalInCart(item)}}</div>
                          <span class="input-group-btn">
                              <button v-on:click="addToCart(item)" type="button" class="btn btn-success btn-number">
                                  <span>+</span>
                              </button>
                          </span>
                        </div>
                        <div class="card px-3">Available: {{item.available}}</div>
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
    ]),
    totalInCart(item) {
      var foundIndex = this.$store.state.items.findIndex(x => x.itemid == item.itemid);
      if (!this.$store.state.items[foundIndex]) {
        console.log('Item not found at index: ' + foundIndex);
        return;
      }
      let count = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        if (this.$store.state.cart[i].itemid === item.itemid) {
          count++;
        }
      }
      console.log(count)
      return count;
    }
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
