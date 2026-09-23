import { RouterProvider } from 'react-router-dom'
import { CartProvider } from '@/features/cart'
import { router } from './router'

export function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
