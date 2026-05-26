<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import type { Product } from './types/types'
import ky from 'ky'

const products = ref<Product[]>([])

onMounted(async () => {
  const data = await ky.get<Product[]>('http://localhost:1452/api/products/').json()
  products.value = data
})

const search = ref('')

const showDropDown = ref(false)

const filteredProducts = computed(() => {
  if (!search.value) {
    return []
  }

  return products.value
    .filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase()))
    .slice(0, 3)
})
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <header class="my-4 flex justify-around">
      <RouterLink to="/"><img src="/Logo.svg" /></RouterLink>
      <div class="relative w-92.5">
        <div class="relative w-full bg-[#F5F5F5] py-5 px-4 pl-12 rounded-lg">
          <img class="absolute left-0 top-1/2 -translate-y-1/2" src="/Search.svg" />
          <input
            v-model="search"
            class="outline-none"
            @focus="showDropDown = true"
            type="text"
            placeholder="Search"
          />
        </div>
        <div v-if="showDropDown && filteredProducts.length">
          <RouterLink
            :to="`/products/${product.id}`"
            v-for="product in filteredProducts"
            :key="product.id"
            @click="showDropDown = false"
          >
            <div class="flex py-5">
              <img class="w-15 h-15" :src="`http://localhost:1452/${product.images[0]}`" />
              <p>{{ product.brand }} || {{ product.name }}</p>
            </div>
            <hr class="w-full" />
          </RouterLink>
        </div>
      </div>
      <div class="flex gap-6">
        <RouterLink to="/favorites"><img src="/Favorites.svg" /></RouterLink>
        <RouterLink to="/cart"><img src="/Cart.svg" /></RouterLink>
      </div>
    </header>
    <hr class="w-full mb-5" />
    <main><RouterView></RouterView></main>
    <footer class="bg-black py-25 px-40 text-white mt-auto">
      <div class="flex justify-around">
        <div class="flex flex-col">
          <img class="w-32 h-auto" src="/Logo2.svg" />
          <p class="max-w-95 font-normal text-[#CFCFCF] text-sm pt-6 italic">
            We are a residential interior design firm located in Portland. Our boutique-studio
            offers more than
          </p>
          <div class="pt-6 mt-auto flex gap-9">
            <a href="#"><img src="/Twitter.svg" /></a>
            <a href="#"> <img src="/Facebook.svg" /></a>
            <a href="#"> <img src="/Tiktok.svg" /></a>
            <a href="#"> <img src="/Instagram.svg" /></a>
          </div>
        </div>
        <div class="flex flex-col gap-y-5">
          <p>Services</p>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Bonus program</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Gift cards</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Credit and payment</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Service contracts</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Non-cash account</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Payment</a>
        </div>
        <div class="flex flex-col gap-y-5">
          <p>Assistance to the buyer</p>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Find an order</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Terms of delivery</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Exchange and return of goods</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Guarantee</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Frequently asked questions</a>
          <a href="#" class="text-sm font-normal text-[#CFCFCF]">Terms of use of the site</a>
        </div>
      </div>
    </footer>
  </div>
</template>
