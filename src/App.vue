<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <header class="my-4 flex items-center justify-around">
      <RouterLink to="/"><img src="/Logo.svg" /></RouterLink>
      <div class="flex bg-[#F5F5F5] py-5 px-4 w-92.5 gap-2 rounded-lg">
        <img src="/Search.svg" />
        <input class="outline-none" type="text" placeholder="Search" />
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
