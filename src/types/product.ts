export type Product = {
  id?: string | number
  name: string
  description: string
  availableCount: string
  price: string
  categoryId: string
  attributes: string[]
  images: Blob[]
  imageUrls?: string[]
}
