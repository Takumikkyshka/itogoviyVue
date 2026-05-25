import type { CartItem, Product } from '@/types/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  const savedCart = localStorage.getItem('cart')

  if (savedCart) {
    cartItems.value = JSON.parse(savedCart)
  }

  watch(
    cartItems,
    () => {
      localStorage.setItem('cart', JSON.stringify(cartItems.value))
    },
    { deep: true },
  )

  function addToCart(product: Product) {
    const item = cartItems.value.find((item) => item.product.id === product.id)

    if (item) {
      item.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1 })
    }
  }

  function deleteFromCart(productId: number) {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
  }

  function decreaseQuantity(productId: number) {
    const item = cartItems.value.find((item) => item.product.id === productId)

    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        deleteFromCart(productId)
      }
    }
  }

  function getPrice(product: Product) {
    return product.discount_price ?? product.price
  }

  const totalPrice = computed(() => {
    return cartItems.value.reduce((acc, item) => {
      return acc + item.quantity * getPrice(item.product)
    }, 0)
  })

  return {
    cartItems,
    addToCart,
    deleteFromCart,
    decreaseQuantity,
    totalPrice,
  }
})
