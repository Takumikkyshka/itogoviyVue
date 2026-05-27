<script setup lang="ts">
import type { Product } from '@/types/types'
import ky from 'ky'
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

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
  <div class="px-4 py-14 lg:px-40 lg:py-14">
    <div class="lg:flex gap-8 pb-8">
      <p class="text-xl italic">Discounts up to -25%</p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :product="product" :key="product.id"></ProductCard>
    </div>
  </div>
</template>
