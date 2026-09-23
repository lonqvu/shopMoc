import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import { Icon } from '@/shared/ui/Icons'

const promotions = [
  { label: 'Bộ sưu tập nội thất VLINE', link: '/san-pham', image: '/images/slideshow_3.webp', alt: 'Bộ sưu tập VLINE lưu giữ nét xưa trong không gian đương đại' },
  { label: 'Ưu đãi giường tháng 9', link: '/san-pham', image: '/images/slideshow_4.webp', alt: 'Giường xịn giá tốt tháng 9' },
  { label: 'Ưu đãi nệm chất lượng', link: '/san-pham', image: '/images/slideshow_7.webp', alt: 'Nệm chuẩn công năng, thăng hạng giấc ngủ' },
]

function PromotionCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef(null)
  const show = (index) => setActive((index + promotions.length) % promotions.length)

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => setActive((current) => (current + 1) % promotions.length), 6000)
    return () => window.clearInterval(timer)
  }, [paused])

  return <section className="promo-carousel" aria-roledescription="carousel" aria-label="Ưu đãi nổi bật" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) show(active + (distance < 0 ? 1 : -1)); touchStart.current = null }}>
    <div className="promo-track" aria-live="polite">
      {promotions.map((promotion, index) => <article className={`promo-slide${index === active ? ' active' : ''}`} aria-hidden={index !== active} key={promotion.image}>
        <Link className="promo-banner-link" to={promotion.link} tabIndex={index === active ? 0 : -1} aria-label={promotion.label}>
          <img src={promotion.image} alt={index === active ? promotion.alt : ''} />
        </Link>
      </article>)}
    </div>
    <button className="promo-arrow promo-prev" onClick={() => show(active - 1)} aria-label="Banner trước"><Icon name="arrowLeft" size={25} /></button>
    <button className="promo-arrow promo-next" onClick={() => show(active + 1)} aria-label="Banner tiếp theo"><Icon name="arrow" size={25} /></button>
    <div className="promo-dots" aria-label="Chọn banner">{promotions.map((promotion, index) => <button className={index === active ? 'active' : ''} onClick={() => show(index)} aria-label={`Xem banner ${index + 1}: ${promotion.label}`} aria-current={index === active ? 'true' : undefined} key={promotion.image} />)}</div>
  </section>
}

export function HomePage() {
  return <Layout>
    <PromotionCarousel />
    <section className="container section bestseller-section" id="featured"><div className="section-head"><h2>Sản phẩm bán chạy</h2><Link to="/san-pham"><span className="section-link-full">Xem tất cả sản phẩm</span><span className="section-link-short">Xem tất cả</span><Icon name="arrow" size={16} /></Link></div><div className="product-grid">{[products[0], products[2], products[3], products[6]].map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="container section"><div className="section-head"><h2>Sản phẩm nổi bật</h2><Link to="/san-pham"><span className="section-link-full">Xem tất cả sản phẩm</span><span className="section-link-short">Xem tất cả</span><Icon name="arrow" size={16} /></Link></div><div className="product-grid">{[products[1], products[4], products[5], products[7]].map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="container story" id="story"><div className="story-image"><img src={products[3].image} alt="Nội thất gỗ tự nhiên Mộc Nhà" /></div><div className="story-copy"><span className="eyebrow">CÂU CHUYỆN MỘC NHÀ</span><h2>Từ thiên nhiên,<br />cho những tổ ấm Việt</h2><p>Chúng tôi tin rằng, một không gian sống đẹp có thể tạo nên những thay đổi tích cực trong cuộc sống. Mộc Nhà mang đến những sản phẩm nội thất bền vững, tinh giản và gần gũi với thiên nhiên.</p><button className="btn olive">Tìm hiểu thêm <Icon name="arrow" /></button></div></section>
    <section className="container benefits">{[['leaf', 'Chất liệu tự nhiên', 'An toàn cho bạn và môi trường'], ['truck', 'Giao hàng toàn quốc', 'Nhanh chóng, an toàn'], ['shield', 'Bảo hành 2 năm', 'Yên tâm sử dụng'], ['headset', 'Tư vấn tận tâm', 'Luôn đồng hành cùng bạn']].map(([icon, title, sub]) => <div key={title}><Icon name={icon} size={32} /><span><b>{title}</b><small>{sub}</small></span></div>)}</section>
  </Layout>
}
