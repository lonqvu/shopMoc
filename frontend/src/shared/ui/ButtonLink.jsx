import { Link } from 'react-router-dom'

export function ButtonLink({ children, to, variant = 'primary' }) {
  return <Link className={`button button-${variant}`} to={to}>{children}</Link>
}
