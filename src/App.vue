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

const showDropDownMobile = ref(false)

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
  <div class="lg:flex lg:flex-col lg:min-h-screen">
    <header
      class="flex sticky z-67 top-0 items-center justify-between bg-white lg:justify-between lg:items-center py-4 lg:my-4"
    >
      <div
        class="lg:hidden z-67 absolute top-full text-center bg-white flex flex-col w-full rounded-b-xl"
        v-if="showDropDownMobile"
      >
        <RouterLink to="/cart" class="py-4 border-b">Корзина</RouterLink>
        <RouterLink to="/favorites" class="my-4">Избранное</RouterLink>
      </div>

      <div class="px-4 flex items-center w-full lg:w-auto justify-between">
        <RouterLink class="lg:pl-20" to="/">
          <img src="/Logo.svg" />
        </RouterLink>

        <div class="lg:hidden">
          <button @click="showDropDownMobile = !showDropDownMobile">
            <img src="/Burger.svg" />
          </button>
        </div>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-center">
        <div class="relative w-120">
          <div class="lg:relative lg:w-full lg:bg-[#F5F5F5] lg:py-5 lg:px-4 lg:pl-12 lg:rounded-lg">
            <img class="lg:absolute lg:left-3 lg:top-1/2 lg:-translate-y-1/2" src="/Search.svg" />

            <input
              v-model="search"
              class="lg:outline-none w-full"
              @focus="showDropDown = true"
              type="text"
              placeholder="Search"
            />
          </div>

          <div v-if="showDropDown" class="w-full absolute bg-white rounded-xl">
            <RouterLink
              :to="`/products/${product.id}`"
              v-for="product in filteredProducts"
              :key="product.id"
              @click="showDropDown = false"
            >
              <div class="lg:flex lg:py-5">
                <img class="lg:w-15 lg:h-15" :src="`http://localhost:1452/${product.images[0]}`" />

                <p>{{ product.brand }} || {{ product.name }}</p>
              </div>

              <hr class="lg:w-full" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="hidden lg:flex items-center gap-6 pr-4 lg:pr-20">
        <RouterLink to="/favorites"><img src="/Favorites.svg" /></RouterLink>

        <RouterLink to="/cart"><img src="/Cart.svg" /></RouterLink>
      </div>
    </header>

    <hr class="lg:w-full lg:mb-5" />

    <main>
      <RouterView></RouterView>
    </main>

    <footer
      class="bg-[#181313] text-[#CFCFCF] px-8 lg:bg-black lg:py-25 lg:px-40 lg:text-white lg:mt-auto"
    >
      <div class="lg:flex lg:justify-around">
        <div
          class="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex lg:flex-col"
        >
          <img class="pt-12 pb-3 w-16 lg:w-32 lg:h-auto" src="/Logo2.svg" />

          <p class="lg:max-w-95 lg:font-normal lg:text-[#CFCFCF] lg:text-sm lg:pt-6 lg:italic">
            We are a residential interior design firm located in Portland. Our boutique-studio
            offers more than
          </p>

          <div class="hidden lg:pt-6 lg:mt-auto lg:flex lg:gap-9">
            <a href="#"><img src="/Twitter.svg" /></a>

            <a href="#"><img src="/Facebook.svg" /></a>

            <a href="#"><img src="/Tiktok.svg" /></a>

            <a href="#"><img src="/Instagram.svg" /></a>
          </div>
        </div>

        <div class="text-center lg:text-left flex flex-col lg:gap-y-5 gap-y-3">
          <p class="pt-5 text-white">Services</p>

          <a href="#" class="text-sm lg:font-normal text-[#CFCFCF]">Bonus program</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Gift cards</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Credit and payment</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Service contracts</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Non-cash account</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Payment</a>
        </div>

        <div class="text-center flex flex-col lg:text-left lg:gap-y-5 gap-y-3">
          <p class="text-white pt-5">Assistance to the buyer</p>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Find an order</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Terms of delivery</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]"
            >Exchange and return of goods</a
          >

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Guarantee</a>

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]"
            >Frequently asked questions</a
          >

          <a href="#" class="text-sm lg:font-normal lg:text-[#CFCFCF]">Terms of use of the site</a>
        </div>
      </div>
      <div class="flex pt-5 justify-center gap-6 lg:hidden pb-8">
        <a href="#"><img class="w-6" src="/Twitter.svg" /></a>

        <a href="#"><img class="w-6" src="/Facebook.svg" /></a>

        <a href="#"><img class="w-6" src="/Tiktok.svg" /></a>

        <a href="#"><img class="w-6" src="/Instagram.svg" /></a>
      </div>
    </footer>
  </div>
</template>
