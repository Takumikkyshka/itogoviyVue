<script setup lang="ts">
import { favoritesId } from '@/composables/useFavorites'
import type { Product } from '@/types/types'
import ky from 'ky'
import { onMounted, ref } from 'vue'

const favoriteProducts = ref<Product[]>([])

onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()

  favoriteProducts.value = data.filter((product) => favoritesId.value.includes(product.id))
})
</script>

<template>
  <div class="flex flex-col items-center text-left mt-28 mb-35">
    <h1 class="text-2xl mr-65 pb-10">Favorite</h1>
    <hr class="w-85" />
    <div v-for="product in favoriteProducts" :key="product.id">
      <RouterLink class="flex py-10" :to="`/products/${product.id}`">
        <img class="w-20 h-20" :src="`http://localhost:1452/${product.images[0]}`" />
        <div class="flex flex-col gap-5">
          <p class="ml-5">{{ product.brand }} | {{ product.name }}</p>
          <p class="ml-5">${{ product.price }}</p>
        </div>
      </RouterLink>
      <hr class="w-85" />
    </div>
  </div>
</template>
