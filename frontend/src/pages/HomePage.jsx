import { ProductGrid } from '@/features/products'
import { ButtonLink } from '@/shared/ui/ButtonLink'

export function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Bộ sưu tập Thu 2026</p>
          <h1>Sống chậm.<br />Ở thật đẹp.</h1>
          <p>Những vật dụng tinh giản, gần gũi và được tạo nên để đồng hành thật lâu trong không gian của bạn.</p>
          <ButtonLink to="/san-pham">Khám phá bộ sưu tập <span aria-hidden="true">→</span></ButtonLink>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="sun" /><div className="vase" /><div className="table-line" /></div>
      </section>
      <section className="collection container">
        <div className="section-heading"><div><p className="eyebrow">Được yêu thích</p><h2>Món đồ kể chuyện</h2></div><ButtonLink to="/san-pham" variant="text">Xem tất cả →</ButtonLink></div>
        <ProductGrid limit={3} />
      </section>
    </>
  )
}
