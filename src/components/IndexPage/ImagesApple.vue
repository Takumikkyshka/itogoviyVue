<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div class="px-40 flex justify-between bg-[#211C24]">
      <div class="flex flex-col justify-center">
        <p class="text-[#909090]">Pro.Beyond.</p>
        <p class="text-8xl text-white">IPhone 14 Pro</p>
        <p class="text-[#909090] my-5 italic">
          Created to change everything for the better. For everyone
        </p>
        <RouterLink to="/catalog" class="text-white border w-50 text-center py-4 rounded-md italic"
          >Shop Now</RouterLink
        >
      </div>
      <div>
        <img src="/Iphone14pro.png" />
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col w-1/2">
        <div class="ps5 flex">
          <div><img src="/PlayStation5.png" /></div>
          <div class="flex flex-col justify-center gap-4">
            <p class="font-semibold text-5xl italic">Playstation 5</p>
            <p class="text-[#909090] italic max-w-82.5">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your
              PlayStation experience.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="podsMax w-1/2 flex bg-[#EDEDED] gap-12">
            <div>
              <img src="/AirpodsMax.png" />
            </div>
            <div class="max-w-40 flex flex-col justify-center">
              <p class="text-3xl italic">Apple AirPods Max</p>
              <p class="text-[#909090] italic">Computational audio. Listen, it's powerful</p>
            </div>
          </div>
          <div class="VisionPro w-1/2 bg-[#353535] flex items-center gap-4">
            <div><img src="/VisionPro.png" /></div>
            <div class="flex flex-col max-w-40 gap-2">
              <p class="text-3xl text-white italic">Apple Vision Pro</p>
              <p class="text-[#909090] italic">An immersive way to experience entertainment</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex py-10 bg-[#EDEDED] justify-between">
        <div class="flex flex-col justify-center pl-14 max-w-100">
          <p class="text-6xl">Macbook <span class="font-semibold italic">Air</span></p>
          <p class="py-4 text-[#909090] italic">
            The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid
            Retina display.
          </p>
          <RouterLink to="/catalog" class="border w-50 text-center py-4 rounded-md italic"
            >Shop Now</RouterLink
          >
        </div>
        <div class="flex justify-center items-center"><img src="/MacBookAir.png" /></div>
      </div>
    </div>
  </div>
</template>
