app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }

    },
    template: `
    <div class="product-display">
      <div class="product-container">
      
    <div class="product-image">
        <img v-bind:src="image" :class="{ 'out-of-stock-img': !inventory }">
    </div>
    <div class="product-info">

      <a v-bind:href="url">Made by Bioprotron</a>

      <p v-if="inventory > 10">In Stock</p>
      
      <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
      <p v-else="">Out of Stock</p>

      <p v-if="onSale">On Sale!</p>
      <p>Shipping: {{ shipping }}</p>  
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      
      <button class="button" :disabled="!inventory" :class="{ disabledButton: !inventory }" v-on:click="addToCart">Add to Cart</button>
      <button class="button" v-on:click="removeFromCart">Delete</button>
      
      <div
       v-for="(variant, index) in variants"
       :key="variant.id"
        @mouseover="updateVariant(index)" 
        class="color-circle"
        v-bind:style="{ backgroundColor: variant.color}">
      </div>


      <div v-for="size in sizes" :key="size.sizeID">
        <p>{{ size.sizeS }}</p>
        <p>{{ size.sizeM }}</p>
        <p>{{ size.sizeL }}</p>
        <p>{{ size.sizeXL }}</p>
        <p>{{ size.sizeXXL }}</p>
      </div>

      
      
      <h1>{{ title }}</h1>
      <h1>{{ sale }}</h1>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
  </div>
  
  <review-form @review-submitted="addReview"></review-form>
  
</div>`,
 data() {
        return {
            reviews: [],
            product: 'Socks',     
            brand: 'Vue Mastery',       
            description: 'A warm fuzzy pair of socks.',           
            url: 'https://github.com/Bioprotron',
            selectedVariant: 0,
            onSale: true, // computed
            computed: {
                image() {
                    return this.variants[this.selectedVariant].image
                },
                inventory() {
                    return this.variants[this.selectedVariant].quantity
                }
            },
            details: ['50% cotton', '30% wool', '20% posyester'],            
            variants: [
                { id: 1, color: 'green', image: './assets/vmSocks-green.jpg', quantity: 50 },
                { id: 2, color: 'blue', image: './assets/vmSocks-blue.jpg', quantity: 0 }
            ],
            sizes: [
                { sizeId: 11, sizeM: 's' },
                { sizeId: 12, sizeM: 'm' },
                { sizeId: 13, sizeL: 'l' },
                { sizeId: 14, sizeXL: 'xl' },
                { sizeId: 15, sizeXXL: 'xxl' }
            ]      
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart')
        },      
        removeFromCart() {
            this.$emit('del-to-cart')
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        },
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null) {
              alert('Review is incomplete. Please fill out every field.')
              return
            }   
        }            
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product 
        },

        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale. '
            }            
        },

        inventory() {
            return this.variants[this.selectedVariant].quantity
        },

        image() {
            return this.variants[this.selectedVariant].image
        },
        shipping() {
            if (this.premium) {
              return 'Free'
            }
            return 2.99
          }
        
    }
})