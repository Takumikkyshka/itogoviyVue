<script setup lang="ts">
import type { Product } from '@/types/types'
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'
import ky from 'ky'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const products = ref<Product[]>([])
onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()
  products.value = data.sort(() => Math.random() - 0.5).slice(0, 8)
  // < 0 ==> a перед b, при > 0 b перед a
})
</script>
<template>
  <div class="px-40 py-14">
    <div class="flex gap-8 pb-8">
      <a class="text-xl border-b italic" href="#">New Arrival</a>
      <a class="text-[#8B8B8B] italic text-xl" href="#">Bestseller</a>
      <a class="text-[#8B8B8B] italic text-xl" href="#">Featured Products</a>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div
        class="text-center border rounded-xl px-1 py-1"
        v-for="product in products"
        :key="product.id"
      >
        <div class="flex flex-col gap-4 items-center h-full">
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
          <p v-if="product.discount_price" class="text-2xl">${{ product.discount_price }}</p>
          <p v-else class="text-2xl">${{ product.price }}</p>
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
