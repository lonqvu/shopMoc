import { ButtonLink } from '@/shared/ui/ButtonLink'

export function NotFoundPage() {
  return <section className="not-found container"><p className="eyebrow">Lỗi 404</p><h1>Trang này không tồn tại.</h1><ButtonLink to="/">Về trang chủ</ButtonLink></section>
}
