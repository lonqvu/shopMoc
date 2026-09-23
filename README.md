# Shop Monorepo

Thư mục `shop` là thư mục gốc, dùng để chứa cả frontend và backend của hệ thống.

```text
shop/
├── frontend/       # Ứng dụng giao diện ReactJS
└── backend/        # API, database và business logic phía server
```

## Frontend

Toàn bộ React app nằm trong `frontend`. Tài liệu chi tiết về cấu trúc source nằm tại [`frontend/README.md`](./frontend/README.md).

Chạy frontend:

```bash
cd frontend
npm install
npm run dev
```

Kiểm tra frontend:

```bash
cd frontend
npm run lint
npm test
npm run build
```

## Backend

Thư mục `backend` được dành sẵn cho server/API. Hiện backend chưa được khởi tạo; công nghệ backend có thể được chọn độc lập, chẳng hạn Node.js + Express, NestJS hoặc một nền tảng khác.

## Nguyên tắc tổ chức

- Frontend không đặt source trực tiếp ở thư mục gốc `shop`.
- Backend không đặt chung dependency hoặc cấu hình với frontend.
- Mỗi ứng dụng tự quản lý `package.json`, biến môi trường, test và tài liệu riêng.
- Chỉ đặt tài liệu hoặc cấu hình dùng chung cho toàn hệ thống tại thư mục gốc.
