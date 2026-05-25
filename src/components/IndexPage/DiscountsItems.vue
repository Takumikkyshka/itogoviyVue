<script setup lang="ts">
import type { Product } from '@/types/types'
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'
import ky from 'ky'
import { onMounted, ref } from 'vue'

const products = ref<Product[]>([])

function getDiscountPercent(product: Product) {
  if (product.discount_price === null) {
    return 0
  }

  return ((product.price - product.discount_price) / product.price) * 100
}

onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()
  products.value = data
    .filter((product) => getDiscountPercent(product) > 25)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
})
</script>
<template>
  <div class="px-40 py-14">
    <div class="flex gap-8 pb-8">
      <p class="text-xl italic">Discounts up to -25%</p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div
        class="text-center border rounded-xl px-1 py-1"
        v-for="product in products"
        :key="product.id"
      >
        <div class="flex flex-col gap-4 items-center">
          <div class="relative w-full flex justify-center items-center">
            <img class="w-40 h-40" :src="`http://localhost:1452/${product.images[0]}`" />
            <button @click="toggleFavorite(product.id)">
              <img
                class="absolute top-1 right-0"
                :src="isFavorite(product.id) ? '/Like.svg' : '/Favorites.svg'"
              />
            </button>
          </div>
          <p class="italic">{{ product.brand }} | {{ product.name }}</p>
          <p class="text-2xl">${{ product.discount_price }}</p>
          <RouterLink
            :to="`/products/${product.id}`"
            class="italic text-white bg-black w-47 py-3 rounded-xl mt-auto mb-6"
            >Buy Now</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
