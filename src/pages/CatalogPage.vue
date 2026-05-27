<script setup lang="ts">
import FiltersSideBar from '@/components/IndexPage/FiltersSideBar.vue'
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'
import { filters } from '@/filters'
import type { Product } from '@/types/types'
import ky from 'ky'
import { computed, onMounted, ref, watch } from 'vue'

const products = ref<Product[]>([])

const currentPage = ref(1)

const selectedSort = ref('rating')

const countItems = ref(9)

onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()

  products.value = data

  if (window.screen.width < 1024) {
    countItems.value = 8
  }
})

const totalPages = computed(() => {
  return Math.ceil(products.value.length / countItems.value)
})

const outputtedProducts = computed(() => {
  const start = (currentPage.value - 1) * countItems.value
  const end = start + countItems.value
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

  return pages
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

const showFiltersMobile = ref(false)

const filters2 = ref(filters.map((filter) => ({ ...filter })))

function toggleFilter(filter: import('@/types/types').Filter) {
  filter.isOpen = !filter.isOpen
}
</script>
<template>
  <div class="lg:flex lg:justify-center">
    <div class="mx-4 lg:mx-40 flex">
      <FiltersSideBar></FiltersSideBar>
      <div class="lg:pl-8">
        <div class="hidden mb-9 lg:flex items-center">
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
        <div class="grid grid-cols-2 gap-4 lg:hidden pt-10 pb-6">
          <div class="ml-auto w-full relative">
            <div
              class="flex justify-between px-4 items-center h-12.5 w-full appearance-none rounded-2xl border border-[#D9D9D9] bg-white pl-6 text-[15px] font-normal text-[#1F1F1F] outline-none"
              @click="showFiltersMobile = true"
            >
              <p>Filters</p>
              <img class="pointer-events-none" src="/Filters.svg" />
            </div>
          </div>
          <div class="ml-auto relative">
            <select
              v-model="selectedSort"
              class="h-12.5 w-full appearance-none rounded-2xl border border-[#D9D9D9] bg-white pl-6 text-[15px] font-normal text-[#1F1F1F] outline-none"
            >
              <option value="rating">By rating</option>
              <option value="priceLow">By price from Low</option>
              <option value="priceHigh">By price from High</option>
              <option value="date">By delivery date</option>
            </select>
            <img
              class="pointer-events-none absolute top-1/2 -translate-y-1/2 right-5"
              src="/downarrow.svg"
            />
          </div>
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-2 gap-4">
          <div
            class="text-center border rounded-xl px-1 py-1 h-90 lg:h-110"
            v-for="product in outputtedProducts"
            :key="product.id"
          >
            <div class="flex flex-col gap-4 items-center h-full lg:w-70">
              <div class="relative w-full flex justify-center items-center">
                <img
                  class="pt-10 lg:pt-0 w-25 lg:w-65 object-contain"
                  :src="`http://localhost:1452/${product.images[0]}`"
                />
                <button @click="toggleFavorite(product.id)">
                  <img
                    class="absolute top-1 right-0"
                    :src="isFavorite(product.id) ? '/Like.svg' : '/Favorites.svg'"
                  />
                </button>
              </div>
              <p class="italic mt-auto line-clamp-2">{{ product.brand }} | {{ product.name }}</p>
              <!-- line clamp ограничивает кол-во строк текста и добавляет в конце многоточие -->
              <p v-if="product.discount_price" class="text-2xl mt-auto">
                ${{ product.discount_price }}
              </p>
              <p v-else class="text-2xl mt-auto">${{ product.price }}</p>
              <RouterLink
                :to="`/products/${product.id}`"
                class="italic text-white bg-black w-35 lg:w-47 py-3 rounded-xl mt-auto mb-6"
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
  </div>
  <div v-if="showFiltersMobile" class="lg:hidden fixed inset-0 bg-white top-15 overflow-y-auto">
    <div class="mx-4 mt-6">
      <button class="flex items-center gap-3 text-lg mb-6" @click="showFiltersMobile = false">
        <img src="/ArrowLeftFilters.svg" />
        Filters
      </button>

      <!-- <div class="border-b py-4">
        <p class="text-left italic text-black">Price</p>
      </div> -->

      <div v-for="filter in filters2" :key="filter.title" class="border-b py-4">
        <div class="flex items-center justify-between w-full" @click="toggleFilter(filter)">
          <p class="text-left italic text-black">
            {{ filter.title }}
          </p>

          <img class="w-4 h-4" :src="filter.isOpen ? '/ArrowUp.svg' : '/ArrowDown.svg'" />
        </div>

        <div v-show="filter.isOpen" class="mt-3 flex flex-col gap-3">
          <label
            v-for="option in filter.options"
            :key="option.label"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <input type="checkbox" v-model="option.checked" />
              <p class="ml-3">{{ option.label }}</p>
            </div>

            <p class="text-sm text-[#929292]">{{ option.count }}</p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
