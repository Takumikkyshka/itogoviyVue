<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function checkout() {
  for (const product of cartStore.cartItems) {
    cartStore.deleteFromCart(product.product.id)
  }

  alert('Успешное выполнение заказа')
}
</script>
<template>
  <div class="px-40 py-28 flex">
    <div class="w-140">
      <p class="text-2xl pb-10">Shopping Cart</p>
      <div class="w-130" v-for="product in cartStore.cartItems" :key="product.product.id">
        <div class="flex py-10 items-center">
          <img class="w-30" :src="`http://localhost:1452/${product.product.images[0]}`" />

          <p class="ml-4 w-40">{{ product.product.brand }} || {{ product.product.name }}</p>

          <div class="flex items-center gap-2">
            <button @click="cartStore.decreaseQuantity(product.product.id)">
              <img src="/minus.svg" />
            </button>

            <p>{{ product.quantity }}</p>

            <button @click="cartStore.addToCart(product.product)">
              <img src="/plus.svg" />
            </button>
          </div>

          <p class="px-6">
            ${{ (product.product.discount_price ?? product.product.price) * product.quantity }}
          </p>

          <button class="ml-auto" @click="cartStore.deleteFromCart(product.product.id)">
            <img src="/Close.svg" />
          </button>
        </div>
        <hr class="text-[#A3A3A3]" />
      </div>
    </div>
    <div class="ml-11 pl-11 pt-14 border-l border-[#EBEBEB] w-140">
      <p class="text-xl">Order Summary</p>
      <div>
        <p class="pt-10 italic text-[#545454]">Discount code / Promo code</p>
        <input
          class="border rounded-md outline-none pl-4 py-4 w-full mt-2"
          type="text"
          placeholder="Code"
        />
      </div>
      <div class="pt-6">
        <p class="pt-10 italic text-[#545454]">Your bonus card number</p>
        <div class="relative">
          <input
            class="border rounded-md outline-none pl-4 py-4 w-full mt-2"
            type="text"
            placeholder="Enter card number"
          />
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-1 border rounded-md cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
      <div>
        <div class="flex w-full pt-12 italic font-medium">
          <p>Subtotal</p>
          <p class="ml-auto">${{ cartStore.totalPrice }}</p>
        </div>
        <div class="flex flex-col gap-2 py-4">
          <div class="flex w-full">
            <p class="text-[#545454]">Estimated Tax</p>
            <p class="italic font-medium ml-auto">$50</p>
          </div>
          <div class="flex w-full">
            <p class="text-[#545454]">Estimated shipping & Handling</p>
            <p class="italic font-medium ml-auto">$29</p>
          </div>
        </div>
        <div class="flex w-full pt-12 italic font-medium">
          <p>Total</p>
          <p class="ml-auto">${{ cartStore.totalPrice + 50 + 29 }}</p>
        </div>
      </div>
      <div class="flex w-full justify-center">
        <button
          @click="checkout()"
          class="w-100 py-4 bg-black text-white mt-12 rounded-md cursor-pointer"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
