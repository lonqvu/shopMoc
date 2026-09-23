import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ProductPage } from '@/pages/ProductPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
export const router = createBrowserRouter([{ path: '/', element: <HomePage/> },{ path: '/san-pham', element: <CatalogPage/> },{ path: '/san-pham/chi-tiet/:productId', element: <ProductPage/> },{ path: '/san-pham/ghe-thu-gian-moc', element: <ProductPage/> },{ path: '/san-pham/:category', element: <CatalogPage/> },{ path: '*', element: <NotFoundPage/> }])
