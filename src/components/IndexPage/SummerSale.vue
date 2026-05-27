<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="hidden lg:block relative w-full h-112.5 bg-linear-to-r from-[#2E2E2E] to-[#000000]">
    <img src="/image2.png" alt="" class="absolute top-0 left-10 object-contain z-10" />

    <img src="/image3.png" alt="" class="absolute top-40 left-0 object-contain z-9" />

    <img src="/image1.png" alt="" class="absolute top-0 left-55 object-contain z-0" />
    <div
      class="absolute top-1/2 left-1/2 z-11 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center px-4"
    >
      <h1 class="text-white text-nowrap text-[48px] lg:text-7xl">
        Big Summer <span class="italic font-medium">Sale</span>
      </h1>

      <p class="text-[#787878] mt-5">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>

      <RouterLink
        class="text-white border border-white py-4 px-14 inline-block mt-8 rounded-md"
        to="/catalog"
      >
        Shop Now
      </RouterLink>
    </div>
    <img src="/image4.png" alt="" class="absolute top-0 right-0 object-contain z-10" />

    <img src="/image5.png" alt="" class="absolute bottom-0 right-0 object-contain z-10" />
  </div>

  <div class="lg:hidden relative w-full h-112.5 bg-linear-to-r from-[#2E2E2E] to-[#000000]">
    <img src="/imgg1.png" alt="" class="absolute top-0 left-0 object-contain z-10" />

    <img src="/imgg2.png" alt="" class="absolute bottom-0 left-0 object-contain z-9" />

    <img
      src="/imgg3.png"
      alt=""
      class="absolute top-0 -translate-x-1/2 left-1/2 object-contain z-0"
    />
    <div
      class="absolute top-1/2 left-1/2 z-11 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center px-4"
    >
      <h1 class="text-white text-[48px] lg:text-7xl text-nowrap">Big Summer</h1>

      <span class="italic font-medium text-white text-[48px] lg:text-7x">Sale</span>

      <p class="text-[#787878] mt-5">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>

      <RouterLink
        class="text-white border border-white py-4 px-14 inline-block mt-8 rounded-md"
        to="/catalog"
      >
        Shop Now
      </RouterLink>
    </div>
    <img src="/imgg4.png" alt="" class="absolute top-0 right-0 object-contain z-10" />

    <img src="/imgg5.png" alt="" class="absolute bottom-0 right-0 object-contain z-10" />
  </div>
</template>
