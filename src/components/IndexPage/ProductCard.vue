<script setup lang="ts">
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'

defineProps<{
  product: import('@/types/types').Product
}>()
</script>
<template>
  <div class="text-center border rounded-xl px-1 py-1">
    <div class="flex flex-col gap-4 items-center h-full">
      <div class="relative w-full flex justify-center items-center">
        <img
          class="pt-5 lg:pt-0 lg:w-40 lg:h-40"
          :src="`http://localhost:1452/${product.images[0]}`"
        />

        <button @click="toggleFavorite(product.id)">
          <img
            class="absolute top-1 right-0 w-6"
            :src="isFavorite(product.id) ? '/Like.svg' : '/Favorites.svg'"
          />
        </button>
      </div>

      <p class="lg:italic">{{ product.brand }} | {{ product.name }}</p>

      <p v-if="product.discount_price" class="lg:text-2xl">${{ product.discount_price }}</p>

      <p v-else class="lg:text-2xl">${{ product.price }}</p>

      <RouterLink
        :to="`/products/${product.id}`"
        class="italic text-white bg-black w-35 lg:w-47 py-3 rounded-xl mt-auto mb-3 lg:mb-6"
      >
        Buy Now
      </RouterLink>
    </div>
  </div>
</template>
