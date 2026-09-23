import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '@/features/cart'
import { Icon } from '@/shared/ui/Icons'
import { money } from '@/shared/lib/format'
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa'

function CartDrawer({ open, onClose }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  return <><button className={`cart-backdrop ${open?'open':''}`} onClick={onClose} aria-label="Đóng giỏ hàng" tabIndex={open?0:-1}/><aside className={`cart-drawer ${open?'open':''}`} aria-hidden={!open} aria-label="Giỏ hàng">
    <div className="cart-heading"><div><span>GIỎ HÀNG</span><h2>Giỏ hàng của bạn</h2></div><button onClick={onClose} aria-label="Đóng giỏ hàng"><Icon name="close" size={24}/></button></div>
    {items.length===0?<div className="cart-empty"><Icon name="cart" size={42}/><h3>Giỏ hàng đang trống</h3><p>Hãy chọn một món đồ bạn yêu thích để bắt đầu.</p><button className="btn olive" onClick={onClose}>Tiếp tục mua sắm</button></div>:<><div className="cart-items">{items.map(item=><article className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div><h3>{item.name}</h3><p>{item.description}</p><strong>{money(item.price)}</strong><div className="cart-item-actions"><div><button onClick={()=>updateQuantity(item.id,item.quantity-1)} aria-label="Giảm số lượng"><Icon name="minus" size={15}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id,item.quantity+1)} aria-label="Tăng số lượng"><Icon name="plus" size={15}/></button></div><button className="cart-remove" onClick={()=>removeItem(item.id)} aria-label={`Xóa ${item.name}`}><Icon name="trash" size={18}/></button></div></div></article>)}</div><div className="cart-summary"><div><span>Tạm tính</span><strong>{money(subtotal)}</strong></div><p>Phí vận chuyển được tính ở bước thanh toán.</p><button className="btn olive">Tiến hành thanh toán</button><button className="cart-continue" onClick={onClose}>Tiếp tục mua sắm</button></div></>}
  </aside></>
}
export function Header() {
  const [open, setOpen] = useState(false); const [productOpen,setProductOpen]=useState(false); const [cartOpen,setCartOpen]=useState(false); const first = useRef(null); const { itemCount } = useCart()
  useEffect(() => { if (open) first.current?.focus() }, [open])
  useEffect(() => { const fn = (e) => {if(e.key==='Escape'){setOpen(false);setProductOpen(false);setCartOpen(false)}}; addEventListener('keydown', fn); return () => removeEventListener('keydown', fn) }, [])
  useEffect(()=>{document.body.style.overflow=(open||cartOpen)?'hidden':'';return()=>{document.body.style.overflow=''}},[open,cartOpen])
  const links=[['Không gian sống','/#khong-gian'],['Bộ sưu tập','/#featured'],['Câu chuyện','/#story']]
  const closeMenu=()=>{setOpen(false);setProductOpen(false)}
  const nav = <><div className={`product-nav ${productOpen?'mobile-open':''}`}><NavLink ref={first} to="/san-pham" aria-expanded={productOpen} onClick={e=>{if(window.matchMedia('(max-width: 639px)').matches){e.preventDefault();setProductOpen(value=>!value)}else closeMenu()}}>Sản phẩm <Icon name="chevronDown" size={15}/></NavLink><div className="product-dropdown"><span>Danh mục sản phẩm</span><Link to="/san-pham" onClick={closeMenu}>Tất cả sản phẩm <Icon name="arrow" size={16}/></Link><Link to="/san-pham/sofa" onClick={closeMenu}>Sofa phòng khách <Icon name="arrow" size={16}/></Link><Link to="/san-pham/ghe" onClick={closeMenu}>Ghế thư giãn <Icon name="arrow" size={16}/></Link><Link to="/san-pham/ban-an" onClick={closeMenu}>Bàn & bàn ăn <Icon name="arrow" size={16}/></Link><Link to="/san-pham/tu-luu-tru" onClick={closeMenu}>Tủ & lưu trữ <Icon name="arrow" size={16}/></Link></div></div>{links.map(([label,to]) => <NavLink key={label} to={to} onClick={closeMenu}>{label}</NavLink>)}</>
  return <><header className="site-header"><div className="header-inner"><Link className="logo" to="/" aria-label="Mộc Nhà - Trang chủ"><Icon name="leaf" size={28}/>Mộc Nhà</Link><nav className="desktop-nav">{nav}</nav><div className="header-actions"><button aria-label="Tìm kiếm"><Icon name="search"/></button><button className="desktop-only" aria-label="Tài khoản"><Icon name="user"/></button><button aria-label={`Giỏ hàng có ${itemCount} sản phẩm`} className="cart-icon" onClick={()=>setCartOpen(true)}><Icon name="cart"/>{itemCount>0&&<b>{itemCount}</b>}</button><button className="menu-btn" aria-label="Mở menu" onClick={()=>{setProductOpen(false);setOpen(true)}}><Icon name="menu"/></button></div></div></header><div className={`mobile-drawer ${open?'open':''}`} aria-hidden={!open}><button className="drawer-close" onClick={closeMenu} aria-label="Đóng menu"><Icon name="close"/></button>{nav}<div className="mobile-contact"><b>Liên hệ Mộc Nhà</b><a href="tel:0909123456"><Icon name="phone" size={17}/>0909 123 456</a><a href="mailto:hello@mocnha.vn"><Icon name="mail" size={17}/>hello@mocnha.vn</a><span><Icon name="map" size={17}/>TP. Hồ Chí Minh, Việt Nam</span></div></div><CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)}/></>
}
export function Newsletter() { return <section className="newsletter"><div><span className="serif">Đăng ký nhận tin từ Mộc Nhà</span><small>Cập nhật những bộ sưu tập mới, câu chuyện nhà đẹp và ưu đãi đặc biệt.</small></div><form onSubmit={e=>e.preventDefault()}><label className="sr-only" htmlFor="email">Email</label><input id="email" type="email" required placeholder="Nhập email của bạn..."/><button>Đăng ký</button></form></section> }
export function Footer() { return <><Newsletter/><footer><div className="footer-grid"><div><Link className="logo" to="/">Mộc Nhà</Link><p>Nội thất cho cuộc sống an yên</p></div><div><b>Về Mộc Nhà</b><a>Câu chuyện thương hiệu</a><a>Cam kết bền vững</a><a>Tin tức</a><a>Liên hệ</a></div><div><b>Hỗ trợ khách hàng</b><a>Hướng dẫn mua hàng</a><a>Giao hàng & đổi trả</a><a>Bảo hành</a><a>Câu hỏi thường gặp</a></div><div><b>Kết nối với chúng tôi</b><div className="social-links"><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF/></a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram/></a><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube/></a><a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><FaPinterestP/></a></div><p>Cùng nhau kiến tạo<br/>những không gian sống đẹp hơn.</p></div></div><div className="copyright">© 2024 Mộc Nhà. Tất cả quyền được bảo lưu.<span>Điều khoản sử dụng | Chính sách bảo mật</span></div></footer></> }
function FixedContact() {
  return <aside className="fixed-contact" aria-label="Liên hệ nhanh">
    <a className="contact-phone" href="tel:0909123456" aria-label="Gọi điện" title="Gọi điện"><Icon name="phone" size={25}/></a>
    <a className="contact-zalo" href="https://zalo.me/" target="_blank" rel="noreferrer" aria-label="Liên hệ Zalo" title="Zalo">Zalo</a>
    <a className="contact-messenger" href="https://m.me/" target="_blank" rel="noreferrer" aria-label="Liên hệ Messenger" title="Messenger"><Icon name="message" size={26}/></a>
    <button className="contact-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Về đầu trang" title="Về đầu trang"><Icon name="up" size={30}/></button>
  </aside>
}
export function Layout({ children }) {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return <><Header/><main>{children}</main><Footer/><FixedContact/></>
}
