<script setup lang="ts">
import { categories } from '@/category'

const data = categories
</script>
<template>
  <div class="px-40 py-20">
    <div class="flex justify-between">
      <p class="italic text-2xl">Browse By Category</p>
      <div class="flex gap-4">
        <a href="#">
          <img src="/Arrow.svg" />
        </a>
        <a href="#">
          <img src="/Arrow-1.svg" />
        </a>
      </div>
    </div>
    <div class="flex justify-between items-center pt-8">
      <div
        class="w-40 bg-[#EDEDED] flex flex-col items-center justify-center py-6 rounded-2xl"
        v-for="category in data"
        :key="category.text"
      >
        <a class="flex flex-col items-center justify-center" href="#">
          <img :src="category.icon" />
          <p>{{ category.text }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
