// Composables — это функции, которые инкапсулируют и переиспользуют логику с отслеживанием состояния

import { ref } from 'vue'

const favoritesId = ref<number[]>([])

function loadFavorites() {
  const savedFavorites = localStorage.getItem('favorites')

  if (savedFavorites) {
    favoritesId.value = JSON.parse(savedFavorites)
  }
}

loadFavorites()

export function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favoritesId.value))
}

export function isFavorite(productId: number) {
  return favoritesId.value.includes(productId)
}

export function toggleFavorite(productId: number) {
  if (isFavorite(productId)) {
    favoritesId.value = favoritesId.value.filter((id) => id !== productId)
  } else {
    favoritesId.value.push(productId)
  }

  saveFavorites()
}

export { favoritesId }
