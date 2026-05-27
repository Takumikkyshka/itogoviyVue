<script setup lang="ts"></script>
<template>
  <div class="hidden lg:grid grid-cols-4">
    <div>
      <img class="w-90 h-90 object-cover" src="/airpods1.png" />
      <div class="px-8 flex flex-col gap-4">
        <h1 class="text-3xl italic">Popular Products</h1>
        <p class="text-[#909090]">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking
          and ease of use.
        </p>
        <RouterLink class="border py-4 w-47.5 text-center rounded-md mb-4" to="/catalog"
          >Shop Now</RouterLink
        >
      </div>
    </div>

    <div class="bg-[#F9F9F9]">
      <img class="w-90 h-90 object-cover" src="/ipad2.png" />
      <div class="px-8 flex flex-col gap-4">
        <h1 class="text-3xl italic">Ipad Pro</h1>
        <p class="text-[#909090]">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking
          and ease of use.
        </p>
        <RouterLink class="border py-4 w-47.5 text-center rounded-md mb-4" to="/catalog"
          >Shop Now</RouterLink
        >
      </div>
    </div>

    <div class="bg-[#EAEAEA]">
      <img class="w-90 h-90 object-cover" src="/samsung3.png" />
      <div class="px-8 flex flex-col gap-4">
        <h1 class="text-3xl italic">Samsung Galaxy</h1>
        <p class="text-[#909090]">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking
          and ease of use.
        </p>
        <RouterLink class="border py-4 w-47.5 text-center rounded-md mb-4" to="/catalog"
          >Shop Now</RouterLink
        >
      </div>
    </div>

    <div class="bg-[#2C2C2C]">
      <img class="w-90 h-90 object-cover" src="/macbook4.png" />
      <div class="px-8 flex flex-col gap-4">
        <h1 class="text-3xl text-white italic">Macbook Pro</h1>
        <p class="text-[#909090]">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking
          and ease of use.
        </p>
        <RouterLink class="border py-4 w-47.5 text-center rounded-md mb-4 text-white" to="/catalog"
          >Shop Now</RouterLink
        >
      </div>
    </div>
  </div>

  <div class="lg:hidden bg-[#F9F9F9]">
    <div class="flex justify-end">
      <img src="/IpadMobile.png" />
    </div>
    <div class="flex flex-col text-center items-center gap-4">
      <h1 class="pt-13 text-[49px]">Ipad Pro</h1>
      <p class="text-[#909090]">
        iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking
        and ease of use.
      </p>
      <RouterLink class="border py-4 w-47.5 text-center rounded-md mb-4" to="/catalog"
        >Shop Now</RouterLink
      >
      <div class="flex gap-2 py-14">
        <div class="w-2 h-2 bg-black rounded-full"></div>
        <div class="w-2 h-2 bg-black rounded-full opacity-10"></div>
        <div class="w-2 h-2 bg-black rounded-full opacity-10"></div>
        <div class="w-2 h-2 bg-black rounded-full opacity-10"></div>
      </div>
    </div>
  </div>
</template>
