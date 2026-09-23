import { NavLink, Outlet } from 'react-router-dom'
import { useCart } from '@/features/cart'

export function AppLayout() {
  const { itemCount } = useCart()

  return (
    <div className="site-shell">
      <header className="header container">
        <NavLink className="brand" to="/" aria-label="Mộc Store - Trang chủ">
          Mộc<span>.</span>
        </NavLink>
        <nav className="nav" aria-label="Điều hướng chính">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/san-pham">Sản phẩm</NavLink>
        </nav>
        <button className="cart-button" type="button" aria-label={`Giỏ hàng có ${itemCount} sản phẩm`}>
          Giỏ hàng <span>{itemCount}</span>
        </button>
      </header>
      <main><Outlet /></main>
      <footer className="footer container">
        <p>Mộc Store</p>
        <p>Thiết kế bền vững cho đời sống mỗi ngày.</p>
      </footer>
    </div>
  )
}
