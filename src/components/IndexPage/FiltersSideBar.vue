<script setup lang="ts">
import { filters } from '@/filters'
import { ref } from 'vue'

const filters2 = ref(filters.map((filter) => ({ ...filter })))

function toggleFilter(filter: import('@/types/types').Filter) {
  filter.isOpen = !filter.isOpen
}
</script>
<template>
  <div class="hidden lg:block w-45">
    <div class="flex flex-col w-full" v-for="filter in filters2" :key="filter.title">
      <div class="flex flex-col gap-5 w-full py-3">
        <div class="flex">
          <p class="text-nowrap italic text-black">{{ filter.title }}</p>
          <button class="ml-auto" @click="toggleFilter(filter)">
            <img v-if="filter.isOpen" src="/ArrowUp.svg" />
            <img v-if="!filter.isOpen" src="/ArrowDown.svg" />
          </button>
        </div>
        <hr class="text-[#B5B5B5]" />
      </div>
      <div class="hidden lg:block" v-if="filter.title === 'Brand'">
        <div class="relative w-full bg-[#F5F5F5] py-2 px-4 pl-12 rounded-lg">
          <img class="absolute left-3 top-1/2 -translate-y-1/2" src="/Search.svg" />

          <input class="lg:outline-none w-full" type="text" placeholder="Search" />
        </div>
      </div>
      <div v-show="filter.isOpen">
        <label class="flex items-center" v-for="option in filter.options" :key="option.label">
          <input type="checkbox" v-model="option.checked" />
          <p class="ml-3">{{ option.label }}</p>
          <p class="ml-1 text-sm text-[#929292]">{{ option.count }}</p>
        </label>
      </div>
    </div>
  </div>
</template>
