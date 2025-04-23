'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from '@nanostores/react'

import { LinearProgress } from '@mui/material'
import { loadProducts, productStore } from '../../../../stores/product'
import ProductDetails from '@/components/productPage'

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const products = useStore(productStore)
  
  // Загружаем продукты при монтировании, если их нет
  useEffect(() => {
    if (products.length === 0) {
      loadProducts()
    }
  }, [])

  // Находим текущий продукт
  const product = products.find(p => p.id.toString() === params.id)

  if (!product) {
    return <LinearProgress />
  }

  return <ProductDetails product={product} />
}


