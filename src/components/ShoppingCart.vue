<template>
  <div class="template">
    <div class="sticky card text-right headline pr-3">
      <h3>Total: {{ total | currency }}</h3>
    </div>
    <div class="jumbotron">
      <div class="row">
        <div class="col-8">
          <ul id="example-1">
            <li v-for="item in items" :key="item.itemid" class="pb-5">
              <div class="media"> 
                  <div class="media-left"> 
                      <img onerror="this.onerror=null;this.src='https://images.pexels.com/photos/1656066/pexels-photo-1656066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';" v-bind:src="item.image" class="media-object" style="width:60px"> 
                  </div> 
                
                  <div class="media-body pl-5"> 
                      <h4 class="media-heading"> 
                          {{item.manufacturer}} | <a v-bind:href="item.url" class="">{{ item.productName }}</a> 
                      </h4>
                      <p>
                        {{ item.description }}
                      </p>
                      <div class="row ml-1"> <!-- TODO Its own component -->
                        <div class="input-group">
                          <span class="input-group-btn">
                              <button v-on:click="addToCart(item)" type="button" class="btn btn-success btn-number plus-btn">
                                  <span>Add to Cart</span>
                              </button>
                          </span>
                          <div class="card px-3 item-total-available">{{totalInCart(item)}}</div>
                          <span class="input-group-btn">
                              <button v-on:click="removeFromCart(item)" type="button" class="btn btn-danger btn-number minus-btn">
                                <font-awesome-icon icon="trash-alt" />
                              </button>
                          </span>
                        </div>
                        <div class="available">Available: {{item.available}}</div>
                      </div>
                  </div> 
              </div>
              <hr>
            </li>
          </ul>
        </div>
        <div class="col-4">
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
      'updateItems',
      'updateCart'
    ]),
    totalInCart(item) { // TODO make a component that calculates its own value for this
      var foundIndex = this.$store.state.items.findIndex(x => x.itemid == item.itemid);
      if (!this.$store.state.items[foundIndex]) {
        console.log('Item not found at index: ' + foundIndex);
        return;
      }
      let count = 0;
      for (let i = 0; i < this.$store.state.cart.length; i++) { // TODO make .find()
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
      return formatter.format(value);
    }
  },
  created() {
    this.updateItems(items)
    this.$store.commit('updateCart', JSON.parse(localStorage.getItem('cart')) || [])
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
  z-index: 99;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.minus-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.plus-btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.item-total-available {
  border: none;
  line-height: 38px;
  height:38px;
  border-radius: 0;
}
.available {
  line-height: 39px;
}
</style>
