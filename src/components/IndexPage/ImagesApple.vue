<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div class="px-4 lg:px-40 lg:flex lg:justify-between bg-[#211C24]">
      <div class="flex flex-col text-center lg:text-left justify-center gap-4 lg:gap-0">
        <p class="text-[#909090] text-2xl pt-22 lg:pt-0">Pro.Beyond.</p>

        <p class="text-7xl lg:text-8xl text-white">IPhone 14 Pro</p>

        <p class="text-[#909090] lg:my-5 italic">
          Created to change everything for the better. For everyone
        </p>

        <RouterLink
          to="/catalog"
          class="mx-auto lg:mx-0 text-white border w-50 lg:text-center py-4 rounded-md italic"
        >
          Shop Now
        </RouterLink>
      </div>

      <div>
        <img src="/Iphone14pro.png" />
      </div>
    </div>

    <div class="hidden lg:flex">
      <div class="lg:flex lg:flex-col lg:w-1/2">
        <div class="lg:flex">
          <div>
            <img src="/PlayStation5.png" />
          </div>

          <div class="lg:flex lg:flex-col lg:justify-center lg:gap-4">
            <p class="lg:font-semibold lg:text-5xl lg:italic">Playstation 5</p>

            <p class="lg:text-[#909090] lg:italic lg:max-w-82.5">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your
              PlayStation experience.
            </p>
          </div>
        </div>

        <div class="lg:flex">
          <div class="lg:w-1/2 lg:flex lg:bg-[#EDEDED] lg:gap-12">
            <div>
              <img src="/AirpodsMax.png" />
            </div>

            <div class="lg:max-w-40 lg:flex lg:flex-col lg:justify-center">
              <p class="lg:text-3xl lg:italic">Apple AirPods Max</p>

              <p class="lg:text-[#909090] lg:italic">Computational audio. Listen, it's powerful</p>
            </div>
          </div>

          <div class="lg:w-1/2 lg:bg-[#353535] lg:flex lg:items-center lg:gap-4">
            <div>
              <img src="/VisionPro.png" />
            </div>

            <div class="lg:flex lg:flex-col lg:max-w-40 lg:gap-2">
              <p class="lg:text-3xl lg:text-white lg:italic">Apple Vision Pro</p>

              <p class="lg:text-[#909090] lg:italic">
                An immersive way to experience entertainment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-1/2 lg:flex lg:py-10 lg:bg-[#EDEDED] lg:justify-between">
        <div class="lg:flex lg:flex-col lg:justify-center lg:pl-14 lg:max-w-100">
          <p class="lg:text-6xl">
            Macbook
            <span class="lg:font-semibold lg:italic">Air</span>
          </p>

          <p class="lg:py-4 lg:text-[#909090] lg:italic">
            The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid
            Retina display.
          </p>

          <RouterLink
            to="/catalog"
            class="lg:border lg:w-50 lg:text-center lg:py-4 lg:rounded-md lg:italic"
          >
            Shop Now
          </RouterLink>
        </div>

        <div class="lg:flex lg:justify-center lg:items-center">
          <img src="/MacBookAir.png" />
        </div>
      </div>
    </div>
    <div class="lg:hidden">
      <div class="flex flex-col bg-[#EDEDED] text-center px-4 py-10">
        <img class="h-50 object-contain" src="/AirpodsMobile.png" />
        <h1 class="text-[34px]">Apple AirPods Max</h1>
        <p class="text-[#909090]">Computational audio. Listen, it's powerful</p>
      </div>
      <div class="flex flex-col bg-[#353535] text-center px-4 py-10">
        <img class="h-50 object-contain" src="/VisionProMobile.png" />
        <h1 class="text-[34px] text-white">Apple Vision Pro</h1>
        <p class="text-[#909090]">An immersive way to experience entertainment</p>
      </div>
      <div class="flex flex-col bg-[#FFFFFF] text-center px-4 py-10">
        <img class="h-50 object-contain" src="/PlayStation.png" />
        <h1 class="text-[34px]">Playstation 5</h1>
        <p class="text-[#909090]">
          Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your
          PlayStation experience.
        </p>
      </div>
      <div class="flex flex-col bg-[#EDEDED] text-center px-4 py-10">
        <img class="h-50 object-contain" src="/MacBook Pro 14.png" />
        <h1 class="text-[34px]">Macbook Air</h1>
        <p class="text-[#909090]">
          The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid
          Retina display.
        </p>
      </div>
    </div>
  </div>
</template>
