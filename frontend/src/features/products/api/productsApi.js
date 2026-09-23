const products = [
  { id: 1, name: 'Ghế Nắng', category: 'Nội thất', price: 2490000, color: '#d6aa78', description: 'Gỗ sồi tự nhiên, đường nét êm và gọn.' },
  { id: 2, name: 'Đèn Trăng', category: 'Ánh sáng', price: 1290000, color: '#d8cdb8', description: 'Ánh sáng dịu cho những buổi tối chậm rãi.' },
  { id: 3, name: 'Bình An', category: 'Trang trí', price: 690000, color: '#83907d', description: 'Gốm thủ công với bề mặt mộc nguyên bản.' },
]

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

export async function getProducts() {
  await wait(350)
  return products
}
