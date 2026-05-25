<script setup lang="ts">
import { isFavorite, toggleFavorite } from '@/composables/useFavorites'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/types'
import ky from 'ky'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const cartStore = useCartStore()

const route = useRoute()

const product = ref<Product>()

const products = ref<Product[]>([])

const router = useRouter()

onMounted(async () => {
  const data = await ky.get<Product>(`http://localhost:1452/api/products/${route.params.id}`).json()
  product.value = data

  const data2 = await ky.get<Product[]>('http://localhost:1452/api/products').json()
  products.value = data2.sort(() => Math.random() - 0.5).slice(0, 4)
})
</script>
<template>
  <div class="mx-40 flex">
    <div class="flex flex-col gap-6 mt-40">
      <img class="h-22 object-contain" :src="`http://localhost:1452/${product?.images[0]}`" />
      <img
        class="h-22 object-contain opacity-50"
        :src="`http://localhost:1452/${product?.images[0]}`"
      />
      <img
        class="h-22 object-contain opacity-50"
        :src="`http://localhost:1452/${product?.images[0]}`"
      />
      <img
        class="h-22 object-contain opacity-50"
        :src="`http://localhost:1452/${product?.images[0]}`"
      />
    </div>
    <div class="mt-30">
      <img class="min-w-100 object-contain" :src="`http://localhost:1452/${product?.images[0]}`" />
    </div>
    <div class="mt-25 flex flex-col ml-10 max-w-130 mb-28">
      <h1 class="text-[40px] italic">{{ product?.brand }} | {{ product?.name }}</h1>
      <div class="flex gap-5 mt-4" v-if="product?.discount_price">
        <p class="text-4xl">${{ product.discount_price }}</p>
        <p class="text-2xl text-[#A0A0A0] line-through mt-auto mb-auto">${{ product.price }}</p>
      </div>
      <div class="flex mt-4" v-else>
        <p class="text-4xl">${{ product?.price }}</p>
      </div>

      <div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <div
            class="bg-[#F4F4F4] text-center px-4 py-4 rounded-md"
            v-for="characteristic in product?.characteristics"
            :key="characteristic.characteristic"
          >
            <p class="text-[#A7A7A7]">{{ characteristic.characteristic }}</p>

            <p class="text-[#4E4E4E]">
              {{ characteristic.value }}
              <span v-if="characteristic.unit_type !== 'значение'">{{
                characteristic.unit_type
              }}</span>
            </p>
          </div>
        </div>
        <div>
          <p class="text-[#6C6C6C] mt-6">
            Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without
            rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing
            the new systemwith two cameras
            <a href="#" class="text-decoration: underline">more...</a>
          </p>
        </div>
        <div v-if="product" class="flex gap-4 mt-6">
          <div>
            <button
              class="w-65 border py-4 rounded-md italic cursor-pointer"
              @click="toggleFavorite(product.id)"
            >
              {{ isFavorite(product.id) ? 'Delete from favorite' : 'Add to favorite' }}
            </button>
          </div>
          <button
            @click="(cartStore.addToCart(product), router.push('/cart'))"
            class="w-65 border py-4 rounded-md italic text-white bg-black cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
        <div class="flex mt-5 gap-8">
          <div class="flex items-center gap-4">
            <div class="bg-[#F6F6F6] block rounded-md">
              <img class="py-4 px-4" src="/delivery.svg" />
            </div>
            <div>
              <p class="text-[#717171] text-nowrap">Free Delivery</p>
              <p>1-2 day</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-[#F6F6F6] block rounded-md">
              <img class="py-4 px-4" src="/shop.svg" />
            </div>
            <div>
              <p class="text-[#717171] text-nowrap">In Stock</p>
              <p>{{ product?.is_available ? 'Today' : 'Later' }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-[#F6F6F6] block rounded-md">
              <img class="py-4 px-4" src="/verify.svg" />
            </div>
            <div>
              <p class="text-[#717171] text-nowrap">Guaranteed</p>
              <p>{{ product?.guarantee }} months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="px-40 bg-[#FAFAFA] py-20 pb-17">
    <div class="bg-white py-12 px-10">
      <h1 class="text-2xl pb-8">Details</h1>
      <p class="text-[#9D9D9D pb-8]">
        Just as a book is judged by its cover, the first thing you notice when you pick up a modern
        smartphone is the display. Nothing surprising, because advanced technologies allow you to
        practically level the display frames and cutouts for the front camera and speaker, leaving
        no room for bold design solutions. And how good that in such realities Apple everything is
        fine with displays. Both critics and mass consumers always praise the quality of the picture
        provided by the products of the Californian brand. And last year's 6.7-inch Retina panels,
        which had ProMotion, caused real admiration for many.
      </p>
      <div>
        <div
          v-for="characteristic in product?.characteristics"
          :key="characteristic.characteristic"
        >
          <div class="flex w-full pt-6 pb-2">
            <p class="text-nowrap">{{ characteristic.characteristic }}</p>
            <div class="flex justify-end w-full">
              <p class="">
                {{ characteristic.value }}
                <span v-if="characteristic.unit_type !== 'значение'">{{
                  characteristic.unit_type
                }}</span>
              </p>
            </div>
          </div>
          <hr class="w-full" />
        </div>
      </div>
    </div>
  </div>
  <div class="py-22 px-40 flex flex-col gap-2">
    <p class="text-[56px] ml-8">{{ product?.rating }}</p>
    <p class="opacity-50">of {{ product?.count_review }} reviews</p>
    <div class="flex" v-if="product">
      <img v-if="product.rating >= 1" src="/stars.svg" />
      <img v-if="product.rating >= 2" src="/stars.svg" />
      <img v-if="product.rating >= 3" src="/stars.svg" />
      <img v-if="product.rating >= 4" src="/stars.svg" />
      <img v-if="product.rating >= 5" src="/stars.svg" />
    </div>
  </div>
  <div class="px-40 py-20">
    <p class="text-2xl italic pb-8">Related products</p>
    <div class="grid grid-cols-4 gap-5">
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
