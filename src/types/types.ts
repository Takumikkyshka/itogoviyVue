export type Characteristic = Record<'characteristic' | 'unit_type' | 'value', string>

export type Product = {
  id: number
  createdAt: string
  price: number
  discount_price: number | null
  guarantee: number
  rating: number
  count_review: number
  is_available: boolean
  store_address: string | null
  color: string
  brand: string
  country: string
  category: string
  name: string
  images: string[]
  characteristics: Characteristic[]
}

export type CartItem = {
  product: Product
  quantity: number
}

export interface FilterOption {
  label: string
  count: number
  checked: boolean
}

export interface Filter {
  title: string
  isOpen: boolean
  hasSearch?: boolean
  options: FilterOption[]
}

export type Filters = Record<string, Filter>
