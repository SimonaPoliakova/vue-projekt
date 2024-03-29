import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Collections from "@/views/Collections.vue";
import ArticleComponent from "@/components/Article.vue";
import ShippingDetails from '@/views/ShippingDetails.vue';


const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/product/:id", component: ProductDetails },
  { path: "/about", component: () => import("@/views/About.vue") },
  { path: "/cart", component: () => import("@/views/Cart.vue") },
  { path: "/collections", component: Collections },
  { path: "/article", name: "article", component: ArticleComponent },
  {
    path: '/shipping-details',
    component: ShippingDetails,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
