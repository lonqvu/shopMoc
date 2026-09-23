export const productCategories = [
  { slug: 'sofa', label: 'Sofa phòng khách' },
  { slug: 'ghe', label: 'Ghế thư giãn' },
  { slug: 'ban-an', label: 'Bàn & bàn ăn' },
  { slug: 'tu-luu-tru', label: 'Tủ & lưu trữ' },
]

export const products = [
  { id: 'sofa-an-nhien', category: 'sofa', name: 'Sofa An Nhiên', price: 24900000, description: 'Sofa 3 chỗ · Vải linen · Khung gỗ sồi', image: '/images/product-sofa-an-nhien.png', colors: ['#d8c7ad', '#777866', '#8e8b84'] },
  { id: 'sofa-linen-binh-minh', category: 'sofa', name: 'Sofa Linen Bình Minh', price: 21900000, description: 'Vải linen dệt thô · 3 chỗ ngồi', image: '/images/product-sofa-linen.jpg', colors: ['#c6b39b', '#898780', '#5e6259'] },
  { id: 'ghe-thu-gian-moc', category: 'ghe', name: 'Ghế thư giãn Mộc', price: 7900000, description: 'Gỗ sồi tự nhiên · Đệm vải', image: '/images/product-ghe-thu-gian-moc.png', colors: ['#ded2bd', '#c2beb5', '#605e57'], detailPath: '/san-pham/ghe-thu-gian-moc' },
  { id: 'ban-an-tron', category: 'ban-an', name: 'Bàn ăn Tròn', price: 12500000, description: 'Gỗ sồi tự nhiên · 4–6 người', image: '/images/product-ban-an-tron.png', colors: ['#d7c8b1', '#aaa9a2', '#545653'] },
  { id: 'bo-ban-an-am', category: 'ban-an', name: 'Bộ bàn ăn Ấm', price: 18900000, description: 'Bàn gỗ tự nhiên · 6 ghế bọc nệm', image: '/images/product-bo-ban-an-am.jpg', colors: ['#9a704e', '#d3c4ae', '#5e574e'] },
  { id: 'ban-an-soi', category: 'ban-an', name: 'Bàn ăn Sồi', price: 14900000, description: 'Thiết kế thanh thoát · 6 người', image: '/images/product-ban-an-soi.jpg', colors: ['#b08a65', '#dad0c0', '#79736b'] },
  { id: 'tu-trang-tri-lang', category: 'tu-luu-tru', name: 'Tủ trang trí Lặng', price: 11900000, description: 'Gỗ sồi tự nhiên · 3 ngăn', image: '/images/product-tu-trang-tri-lang.png', colors: ['#d7c5aa', '#b9ae98', '#4f504d'] },
  { id: 'tu-trang-tri-suong', category: 'tu-luu-tru', name: 'Tủ trang trí Sương', price: 9900000, description: 'Hoàn thiện màu sáng · Cánh phẳng', image: '/images/product-tu-trang-tri-suong.jpg', colors: ['#e1ddd3', '#c3bdb1', '#84827e'] },
  { id: 'tu-bep-den', category: 'tu-luu-tru', name: 'Tủ lưu trữ Trầm', price: 15900000, description: 'Gỗ sơn mờ · Phong cách tối giản', image: '/images/product-tu-bep-den.jpg', colors: ['#343530', '#8b7864', '#d3c5b4'] },
]

export const chair = products.find((product) => product.id === 'ghe-thu-gian-moc')
