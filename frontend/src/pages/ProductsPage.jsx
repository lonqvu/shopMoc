import { ProductGrid } from '@/features/products'

export function ProductsPage() {
  return (
    <section className="page-section container">
      <p className="eyebrow">Tất cả sản phẩm</p>
      <h1>Bộ sưu tập</h1>
      <p className="page-intro">Những món đồ thiết yếu, bền vững và đủ đẹp để bạn muốn giữ lại thật lâu.</p>
      <ProductGrid />
    </section>
  )
}
