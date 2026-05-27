<script setup lang="ts">
import type { Product } from '@/types/types'
import ky from 'ky'
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref<Product[]>([])
onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()
  products.value = data.sort(() => Math.random() - 0.5).slice(0, 8)
  // < 0 ==> a перед b, при > 0 b перед a
})
</script>
<template>
  <div class="px-4 py-14 lg:px-40 lg:py-14">
    <div class="flex gap-8 pb-8 items-center">
      <a class="text-xl border-b italic text-nowrap" href="#">New Arrival</a>
      <a class="text-[#8B8B8B] italic lg:text-xl" href="#">Bestseller</a>
      <a class="text-[#8B8B8B] italic lg:text-xl" href="#">Featured Products</a>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :product="product" :key="product.id"></ProductCard>
    </div>
  </div>
</template>
