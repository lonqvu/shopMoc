import { useEffect, useState } from 'react'
import { getProducts } from '../api/productsApi'

export function useProducts() {
  const [state, setState] = useState({ products: [], isLoading: true, error: null })

  useEffect(() => {
    let active = true
    getProducts()
      .then((products) => active && setState({ products, isLoading: false, error: null }))
      .catch((error) => active && setState({ products: [], isLoading: false, error }))
    return () => { active = false }
  }, [])

  return state
}
