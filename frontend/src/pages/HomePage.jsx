import { Link } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import { Icon } from '@/shared/ui/Icons'

const categories = [
 ['sofa','Sofa phòng khách','Nơi những khoảnh khắc sum vầy bắt đầu',products[0].image],
 ['ghe','Ghế thư giãn','Một góc riêng để cơ thể được nghỉ ngơi',products[2].image],
 ['ban-an','Bàn & bàn ăn','Bữa ăn ngon, cuộc sống trọn vẹn hơn',products[3].image],
 ['tu-luu-tru','Tủ & lưu trữ','Sắp xếp ngôi nhà gọn gàng và tinh tế',products[6].image]
]
export function HomePage(){return <Layout>
 <section className="hero"><div className="hero-copy"><span className="eyebrow">NỘI THẤT THUẦN TỰ NHIÊN</span><h1>Sống giản dị,<br/>ở thật đẹp</h1><p>Nội thất từ chất liệu tự nhiên, thiết kế tinh tế cho những không gian sống an yên và bền vững.</p><Link className="btn clay" to="#featured">Khám phá bộ sưu tập <Icon name="arrow"/></Link><a className="text-link" href="#story">Xem câu chuyện thương hiệu <Icon name="arrow"/></a></div><div className="hero-visual"><div className="hero-product hero-sofa"><img src={products[0].image} alt="Không gian phòng khách Mộc Nhà"/></div><div className="hero-product hero-chair"><img src={products[1].image} alt="Ghế gỗ thư giãn"/></div><blockquote>“Nhà là nơi<br/>dịu dàng nhất.”</blockquote></div></section>
 <section className="container category-strip" id="khong-gian">{categories.map(([slug,name,desc,img])=><Link className="category" to={`/san-pham/${slug}`} key={slug}><div><img src={img} alt={name}/></div><h3>{name}</h3><p>{desc}</p><Icon name="arrow"/></Link>)}</section>
 <section className="container section" id="featured"><div className="section-head"><h2>Sản phẩm nổi bật</h2><Link to="/san-pham">Xem tất cả sản phẩm →</Link></div><div className="product-grid">{products.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
 <section className="container story" id="story"><div className="story-image"><img src={products[3].image} alt="Nội thất gỗ tự nhiên Mộc Nhà"/></div><div className="story-copy"><span className="eyebrow">CÂU CHUYỆN MỘC NHÀ</span><h2>Từ thiên nhiên,<br/>cho những tổ ấm Việt</h2><p>Chúng tôi tin rằng, một không gian sống đẹp có thể tạo nên những thay đổi tích cực trong cuộc sống. Mộc Nhà mang đến những sản phẩm nội thất bền vững, tinh giản và gần gũi với thiên nhiên.</p><button className="btn olive">Tìm hiểu thêm <Icon name="arrow"/></button></div></section>
 <section className="container benefits">{[['leaf','Chất liệu tự nhiên','An toàn cho bạn và môi trường'],['truck','Giao hàng toàn quốc','Nhanh chóng, an toàn'],['shield','Bảo hành 2 năm','Yên tâm sử dụng'],['headset','Tư vấn tận tâm','Luôn đồng hành cùng bạn']].map(([icon,title,sub])=><div key={title}><Icon name={icon} size={32}/><span><b>{title}</b><small>{sub}</small></span></div>)}</section>
 </Layout>}
