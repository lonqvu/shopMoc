import { formatCurrency } from '@/shared/lib/formatCurrency'

export function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-art" style={{ '--product-color': product.color }} aria-hidden="true">
        <span>{product.name.charAt(0)}</span>
      </div>
      <div className="product-content">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-action">
          <strong>{formatCurrency(product.price)}</strong>
          <button type="button" onClick={() => onAdd(product)}>Thêm</button>
        </div>
      </div>
    </article>
  )
}
