<template>
  <div class="product-container">
    <div v-if="showSuccessMessage" class="overlay-message success-message">
      Item added successfully!
    </div>
    <div v-if="showErrorMessage" class="overlay-message error-message">
      Please choose your size before adding to the cart.
    </div>
    <div class="product-content">
      <div class="product-image-container">
        <img
          class="product-image"
          :src="product ? product.image : ''"
          :alt="product ? product.name : ''"
        />
      </div>
      <div class="product-details">
        <h1 class="product-title">{{ product ? product.name : "" }}</h1>
        <p class="product-description">
          {{ product ? product.description : "" }}
        </p>
        <p class="product-price">Price: ${{ product ? product.price : "" }}</p>
        <div class="size-selection">
          <label for="shoeSize" class="size-label">Select Size:</label>
          <select id="shoeSize" v-model="selectedSize" class="size-dropdown">
            <option v-for="size in product ? product.sizes : []" :key="size">
              {{ size }}
            </option>
          </select>
        </div>
        <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/stores/cart";

export default {
  data() {
    return {
      product: null,
      selectedSize: "",
      showSuccessMessage: false,
      showErrorMessage: false,
    };
  },
  methods: {
    async fetchProductDetails() {
      const productId = this.$route.params.id;

      try {
        const { data } = await axios.get(`/products.json`);
        this.product = data.find((product) => product.id == productId);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    addToCart() {
      if (!this.selectedSize) {
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);

        console.error("Please select a size before adding to the cart.");
        return;
      }

      const cartStore = useCartStore();
      cartStore.addToCart({
        ...(this.product || {}),
        selectedSize: this.selectedSize,
      });

      this.showSuccessMessage = true;

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);

      console.log("Product added to the cart:", this.product);
    },
  },
  created() {
    this.fetchProductDetails();
  },
};
</script>

<style scoped>
.product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.overlay-message {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  z-index: 999;
}

.success-message {
  background-color: green;
}

.error-message {
  background-color: red;
}

.product-content {
  display: flex;
}

.product-image-container {
  flex: 0 0 50%;
  margin-right: 20px;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-details {
  flex-grow: 1;
}

.product-title {
  font-size: 30px;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 20px;
  line-height: 1.5;
}

.product-price {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
}

.size-selection {
  margin-bottom: 20px;
}

.size-label {
  margin-right: 8px;
}

.size-dropdown {
  padding: 8px;
  border-radius: 4px;
  margin: 5px;
}

.add-to-cart-btn {
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}
</style>
