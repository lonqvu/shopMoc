import { useCart } from '@/features/cart'
import { ProductCard } from './ProductCard'
import { useProducts } from '../hooks/useProducts'

export function ProductGrid({ limit }) {
  const { products, isLoading, error } = useProducts()
  const { addItem } = useCart()

  if (isLoading) return <div className="status" role="status">Đang chọn những món đồ phù hợp…</div>
  if (error) return <div className="status error" role="alert">Không thể tải sản phẩm. Vui lòng thử lại.</div>

  const visibleProducts = limit ? products.slice(0, limit) : products
  return <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addItem} />)}</div>
}
