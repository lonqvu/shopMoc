import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '@/features/cart'
import { Icon } from '@/shared/ui/Icons'
import { money } from '@/shared/lib/format'
export function ProductCard({ product, compact=false }) { const [liked,setLiked]=useState(false); const {addItem}=useCart(); const href=`/san-pham/chi-tiet/${product.id}`; return <article className={`product-card ${compact?'compact':''}`}><div className="product-img"><Link to={href}><img src={product.image} alt={product.name} loading="lazy"/></Link><button className={`heart ${liked?'liked':''}`} onClick={()=>setLiked(!liked)} aria-label="Yêu thích"><Icon name="heart"/></button><button className="quick-add" onClick={()=>addItem(product)}><Icon name="cart"/> Thêm nhanh</button></div><Link className="product-name" to={href}>{product.name}</Link>{!compact&&<p>{product.description}</p>}<strong>{money(product.price)}</strong>{compact?<small className="rating">★ 4.8 (20)</small>:<div className="swatches">{product.colors.map(c=><i key={c} style={{background:c}}/>)}</div>}</article> }
