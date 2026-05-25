import CartPage from '@/pages/CartPage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import IndexPage from '@/pages/IndexPage.vue'
import SingleProductPage from '@/pages/SingleProductPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/favorites', component: FavoritesPage },
    { path: '/catalog', component: CatalogPage },
    {
      path: '/products/:id',
      component: SingleProductPage,
    },
    {
      path: '/cart',
      component: CartPage,
    },
  ],
})

export default router
