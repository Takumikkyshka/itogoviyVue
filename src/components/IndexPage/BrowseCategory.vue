<script setup lang="ts">
import { categories } from '@/category'

const data = categories
</script>
<template>
  <div class="hidden lg:block lg:px-40 lg:py-20">
    <div class="lg:flex lg:justify-between">
      <p class="lg:italic lg:text-2xl">Browse By Category</p>

      <div class="lg:flex lg:gap-4">
        <a href="#">
          <img src="/Arrow.svg" />
        </a>

        <a href="#">
          <img src="/Arrow-1.svg" />
        </a>
      </div>
    </div>

    <div class="lg:flex lg:justify-between lg:items-center lg:pt-8">
      <div
        class="lg:w-40 lg:bg-[#EDEDED] lg:flex lg:flex-col lg:items-center lg:justify-center lg:py-6 lg:rounded-2xl"
        v-for="category in data"
        :key="category.text"
      >
        <a class="lg:flex lg:flex-col lg:items-center lg:justify-center" href="#">
          <img :src="category.icon" />

          <p>{{ category.text }}</p>
        </a>
      </div>
    </div>
  </div>
  <div class="lg:hidden">
    <div class="px-4 py-16">
      <div class="flex justify-between items-center">
        <p class="text-2xl">Browse Be Category</p>
        <div class="flex gap-4">
          <a href="#">
            <img class="w-8 object-contain" src="/Arrow.svg" />
          </a>

          <a href="#">
            <img class="w-8 object-contain" src="/Arrow-1.svg" />
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 pt-12">
        <div
          class="bg-[#EDEDED] rounded-xl py-6"
          v-for="category in categories"
          :key="category.text"
        >
          <a class="flex flex-col items-center justify-center" href="#">
            <img :src="category.icon" />

            <p>{{ category.text }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
