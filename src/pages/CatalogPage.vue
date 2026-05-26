<script setup lang="ts">
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'
import { filters } from '@/filters'
import type { Filter, Product } from '@/types/types'
import ky from 'ky'
import { computed, onMounted, ref, watch } from 'vue'

const products = ref<Product[]>([])

const currentPage = ref(1)
const itemsPage = 9

const selectedSort = ref('rating')

onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()

  products.value = data
})

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPage)
})

const outputtedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPage
  const end = start + itemsPage
  return sortedProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: number[] = []

  if (currentPage.value === 1) {
    pages.push(1, 2, 3)
  } else if (currentPage.value >= totalPages.value - 1) {
    pages.push(totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value)
  } else {
    pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1)
  }

  return pages.filter((page) => page > 0 && page <= totalPages.value)
})

function getActualPrice(product: Product) {
  return product.discount_price ?? product.price
  // Оператор нулевого слияния (??) возвращает правую часть, если левая null или undefined
}

const sortedProducts = computed(() => {
  const products2 = [...products.value]

  if (selectedSort.value === 'rating') {
    return products2.sort((a, b) => b.rating - a.rating)
  }
  if (selectedSort.value === 'priceLow') {
    return products2.sort((a, b) => getActualPrice(a) - getActualPrice(b))
  }
  if (selectedSort.value === 'priceHigh') {
    return products2.sort((a, b) => getActualPrice(b) - getActualPrice(a))
  }
  if (selectedSort.value === 'date') {
    return products2.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }
  return products2
})

watch(selectedSort, () => {
  currentPage.value = 1
})

const filters2 = ref(filters.map((filter) => ({ ...filter })))

function toggleFilter(filter: Filter) {
  filter.isOpen = !filter.isOpen
}
</script>
<template>
  <div class="mx-40 flex">
    <div class="w-45">
      <div class="flex flex-col w-full" v-for="filter in filters2" :key="filter.title">
        <div class="flex flex-col gap-5 w-full py-3">
          <div class="flex">
            <p class="text-nowrap italic text-black">{{ filter.title }}</p>
            <button class="ml-auto" @click="toggleFilter(filter)">
              <img v-if="filter.isOpen" src="/ArrowUp.svg" />
              <img v-if="!filter.isOpen" src="/ArrowDown.svg" />
            </button>
          </div>
          <hr class="text-[#B5B5B5]" />
        </div>
        <div v-show="filter.isOpen">
          <label class="flex items-center" v-for="option in filter.options" :key="option.label">
            <input type="checkbox" v-model="option.checked" />
            <p class="ml-3">{{ option.label }}</p>
            <p class="ml-1 text-sm text-[#929292]">{{ option.count }}</p>
          </label>
        </div>
      </div>
    </div>
    <div class="pl-8">
      <div class="mb-9 flex items-center">
        <div class="text-[#6C6C6C] italic">
          Selected products: <span class="text-black text-xl">{{ products.length }}</span>
        </div>
        <div class="ml-auto relative">
          <select
            v-model="selectedSort"
            class="h-12.5 w-full appearance-none rounded-2xl border border-[#D9D9D9] bg-white pl-6 pr-25 text-[15px] font-normal text-[#1F1F1F] outline-none"
          >
            <option value="rating">By rating</option>
            <option value="priceLow">By price from Low</option>
            <option value="priceHigh">By price from High</option>
            <option value="date">By delivery date</option>
          </select>
          <img class="absolute top-1/2 -translate-y-1/2 right-5" src="/downarrow.svg" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div
          class="text-center border rounded-xl px-1 py-1 h-110"
          v-for="product in outputtedProducts"
          :key="product.id"
        >
          <div class="flex flex-col gap-4 items-center h-full w-77.5">
            <div class="relative w-full flex justify-center items-center">
              <img
                class="w-65 object-contain"
                :src="`http://localhost:1452/${product.images[0]}`"
              />
              <button @click="toggleFavorite(product.id)">
                <img
                  class="absolute top-1 right-0"
                  :src="isFavorite(product.id) ? '/Like.svg' : '/Favorites.svg'"
                />
              </button>
            </div>
            <p class="italic mt-auto">{{ product.brand }} | {{ product.name }}</p>
            <p v-if="product.discount_price" class="text-2xl mt-auto">
              ${{ product.discount_price }}
            </p>
            <p v-else class="text-2xl mt-auto">${{ product.price }}</p>
            <RouterLink
              :to="`/products/${product.id}`"
              class="italic text-white bg-black w-47 py-3 rounded-xl mt-auto mb-6"
              >Buy Now</RouterLink
            >
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-center items-center gap-3 mt-10 mb-14">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 disabled:opacity-50"
          >
            <img src="/ArrowLeft.svg" />
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="currentPage === page ? 'bg-black text-white' : 'bg-white text-black'"
            class="w-10 h-10 rounded-xl border"
          >
            {{ page }}
          </button>
          <span v-if="totalPages > 4 && currentPage <= totalPages - 3">...</span>
          <button
            v-if="totalPages > 3 && currentPage <= totalPages - 2"
            @click="currentPage = totalPages"
            :class="currentPage === totalPages ? 'bg-black text-white' : 'bg-white text-black'"
            class="w-10 h-10 rounded-xl border transition"
          >
            {{ totalPages }}
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 disabled:opacity-50"
          >
            <img src="/ArrowRight.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
