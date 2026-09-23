import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ProductCard } from '@/components/ProductCard'
import { productCategories, products } from '@/data/products'

export function CatalogPage() {
  const { category } = useParams()
  const [sort,setSort]=useState('default')
  const current=productCategories.find(item=>item.slug===category)
  const visible=useMemo(()=>{
    const list=current?products.filter(product=>product.category===current.slug):products
    return [...list].sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:0)
  },[current,sort])
  const title=current?.label||'Tất cả sản phẩm'
  return <Layout><div className="container catalog-page"><nav className="breadcrumb"><Link to="/">Trang chủ</Link> / {title}</nav><header className="catalog-hero"><div><span className="eyebrow">BỘ SƯU TẬP MỘC NHÀ</span><h1>{title}</h1></div><p>Mỗi sản phẩm được chọn lọc từ chất liệu tự nhiên, chú trọng tỷ lệ, công năng và cảm giác bình yên trong từng không gian.</p></header><nav className="catalog-tabs" aria-label="Danh mục sản phẩm"><Link className={!current?'active':''} to="/san-pham">Tất cả</Link>{productCategories.map(item=><Link className={item.slug===category?'active':''} key={item.slug} to={`/san-pham/${item.slug}`}>{item.label}</Link>)}</nav><div className="catalog-meta"><span><b>{visible.length}</b> sản phẩm</span><label>Sắp xếp<select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">Nổi bật</option><option value="low">Giá thấp đến cao</option><option value="high">Giá cao đến thấp</option></select></label></div><div className="product-grid catalog-products">{visible.map(product=><ProductCard product={product} key={product.id}/>)}</div></div></Layout>
}
