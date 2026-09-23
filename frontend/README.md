# Frontend — Mộc Store ReactJS

Đây là ứng dụng frontend ReactJS của Shop. Thư mục này nằm tại `shop/frontend` và được tổ chức theo kiến trúc **feature-first**. Backend được đặt riêng tại `shop/backend`.

Thay vì gom tất cả component, hook và service của toàn hệ thống vào những thư mục chung, mã nguồn liên quan đến cùng một nghiệp vụ được đặt cạnh nhau trong `features`.

Cách tổ chức này giúp:

- Dễ tìm nơi cần sửa khi một nghiệp vụ thay đổi.
- Hạn chế phụ thuộc chéo giữa các phần của ứng dụng.
- Dễ phát triển thêm tính năng mà không làm cấu trúc cũ trở nên lộn xộn.
- Dễ tách một feature thành package riêng nếu project phát triển lớn.

## Hiểu source trong 5 phút

Nếu bạn mới học React, hãy hình dung project hoạt động theo chuỗi sau:

```text
index.html
    ↓ tạo một vị trí có id="root"
src/main.jsx
    ↓ đưa ứng dụng React vào vị trí root
src/app/App.jsx
    ↓ bật giỏ hàng và hệ thống router
src/app/router.jsx
    ↓ kiểm tra URL để chọn trang
src/app/layouts/AppLayout.jsx
    ↓ vẽ khung chung: header, menu, nội dung, footer
src/pages/*.jsx
    ↓ vẽ nội dung riêng của từng trang
src/features/*
    ↓ cung cấp chức năng sản phẩm và giỏ hàng
src/shared/*
    ↓ cung cấp component, hàm tiện ích dùng chung
```

### 1. `index.html` — trang HTML ban đầu

Đây là file đầu tiên trình duyệt nhận được. Trong file có:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

`<div id="root">` ban đầu là một vùng trống. Dòng `script` yêu cầu trình duyệt chạy `src/main.jsx`. React sẽ đưa toàn bộ giao diện vào vùng trống `root` này.

Bạn thường chỉ sửa file này khi cần đổi tiêu đề trang, thêm thẻ SEO, favicon hoặc nhúng script dùng chung.

### 2. `src/main.jsx` — công tắc bật ứng dụng React

Đây là file JavaScript đầu tiên được chạy:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Ý nghĩa từng phần:

- `document.getElementById('root')`: tìm vùng `root` trong `index.html`.
- `createRoot(...)`: tạo nơi để React quản lý giao diện.
- `.render(<App />)`: yêu cầu React hiển thị component `App`.
- `<StrictMode>`: hỗ trợ phát hiện cách viết React chưa an toàn trong lúc development.
- `import './styles/index.css'`: nạp CSS dùng cho toàn ứng dụng.

`main.jsx` chỉ làm nhiệm vụ khởi động. Không nên viết giao diện trang, gọi API hoặc xử lý giỏ hàng trong file này.

### 3. `src/app/App.jsx` — lắp các hệ thống chính

Sau `main.jsx`, React chạy component `App`:

```jsx
<CartProvider>
  <RouterProvider router={router} />
</CartProvider>
```

- `CartProvider`: tạo vùng dữ liệu giỏ hàng dùng chung. Component nằm bên trong nó có thể đọc hoặc thêm sản phẩm vào giỏ.
- `RouterProvider`: bật React Router và sử dụng danh sách route trong `router.jsx`.

Hãy coi `App.jsx` là ổ điện tổng: nó kết nối những hệ thống cần dùng trong toàn ứng dụng.

### 4. `src/app/router.jsx` — chọn trang theo URL

Router xem URL hiện tại và quyết định render page nào:

| URL | Component được hiển thị |
| --- | --- |
| `/` | `HomePage` |
| `/san-pham` | `ProductsPage` |
| URL không tồn tại | `NotFoundPage` |

Tất cả các page trên được đặt bên trong `AppLayout`, vì vậy chúng dùng chung header, menu và footer.

Ví dụ khi người dùng mở `/san-pham`:

```text
router.jsx
├── AppLayout.jsx
│   ├── Header và menu
│   ├── ProductsPage.jsx ← được đặt vào vị trí <Outlet />
│   └── Footer
```

### 5. `src/app/layouts/AppLayout.jsx` — khung giao diện chung

File này vẽ những phần xuất hiện ở mọi trang:

- Logo Mộc.
- Menu “Trang chủ” và “Sản phẩm”.
- Số lượng sản phẩm trong giỏ.
- `<Outlet />` dành cho nội dung page hiện tại.
- Footer.

`AppLayout` gọi `useCart()` để lấy `itemCount`. Vì vậy mỗi lần thêm sản phẩm, con số trên nút giỏ hàng được cập nhật tự động.

### 6. `src/pages` — nội dung của từng màn hình

Mỗi file trong `pages` đại diện cho một màn hình hoàn chỉnh:

- `HomePage.jsx`: vẽ banner đầu trang và 3 sản phẩm nổi bật.
- `ProductsPage.jsx`: vẽ tiêu đề và toàn bộ danh sách sản phẩm.
- `NotFoundPage.jsx`: thông báo khi người dùng mở URL không tồn tại.

Page không tự xử lý chi tiết sản phẩm. Nó lấy component `ProductGrid` từ feature `products` và ghép vào đúng vị trí.

### 7. `src/features/products` — chức năng sản phẩm

Feature này được chia thành ba phần:

```text
productsApi.js ──► useProducts.js ──► ProductGrid.jsx ──► ProductCard.jsx
  lấy dữ liệu         quản lý state       vẽ danh sách        vẽ một sản phẩm
```

- `api/productsApi.js`: nơi lấy dữ liệu sản phẩm. Hiện tại file dùng dữ liệu mẫu; sau này có backend thì thay bằng `fetch` tại đây.
- `hooks/useProducts.js`: gọi `getProducts()`, sau đó ghi nhớ ba trạng thái: đang tải, có lỗi và danh sách sản phẩm.
- `components/ProductGrid.jsx`: dùng `useProducts()`. Khi đang tải thì hiện thông báo; nếu lỗi thì hiện lỗi; thành công thì render danh sách.
- `components/ProductCard.jsx`: nhận một `product` qua props và hiển thị tên, loại, mô tả, giá cùng nút “Thêm”.
- `index.js`: cửa ra vào chính của feature. File bên ngoài import từ đây thay vì truy cập sâu vào thư mục nội bộ.

### 8. `src/features/cart` — chức năng giỏ hàng

Feature này giữ giỏ hàng trong bộ nhớ của trình duyệt:

- `model/cartContext.js`: tạo một “kênh” để truyền dữ liệu giỏ hàng đến nhiều component.
- `model/CartProvider.jsx`: giữ danh sách sản phẩm, xử lý action thêm sản phẩm và tính số lượng.
- `model/useCart.js`: cách ngắn gọn để component truy cập kênh giỏ hàng.
- `index.js`: export những phần feature cho phép bên ngoài sử dụng.

Dữ liệu hiện chưa được lưu vào database hoặc `localStorage`, nên tải lại trang sẽ làm trống giỏ hàng.

### 9. Điều gì xảy ra khi bấm nút “Thêm”? 

```text
Người dùng bấm “Thêm”
        ↓
ProductCard.jsx gọi hàm onAdd(product)
        ↓
ProductGrid.jsx đã truyền addItem vào onAdd
        ↓
CartProvider.jsx nhận action cart/itemAdded
        ↓
Reducer thêm sản phẩm hoặc tăng quantity
        ↓
itemCount thay đổi
        ↓
AppLayout.jsx render lại số trên nút “Giỏ hàng”
```

Đây là luồng quan trọng nhất để hiểu cách các file phối hợp với nhau.

### 10. `src/shared` — đồ dùng chung

- `ui/ButtonLink.jsx`: link chuyển trang nhưng được trang trí giống button. Trang chủ và trang 404 đều có thể dùng lại.
- `lib/formatCurrency.js`: đổi số như `2490000` thành định dạng tiền Việt Nam.
- `lib/formatCurrency.test.js`: kiểm tra hàm định dạng tiền hoạt động đúng.

`shared` chỉ chứa code không thuộc riêng sản phẩm hoặc giỏ hàng.

### 11. `src/styles/index.css` — giao diện toàn project

File này quy định màu sắc, font chữ, khoảng cách, bố cục, card sản phẩm và responsive trên điện thoại. Các `className` trong file JSX như `hero`, `product-card` hoặc `header` sẽ tìm style tương ứng tại đây.

### Thứ tự nên đọc source

Người mới nên đọc theo thứ tự sau:

1. `index.html`
2. `src/main.jsx`
3. `src/app/App.jsx`
4. `src/app/router.jsx`
5. `src/app/layouts/AppLayout.jsx`
6. `src/pages/HomePage.jsx`
7. `src/features/products/components/ProductGrid.jsx`
8. `src/features/products/hooks/useProducts.js`
9. `src/features/products/api/productsApi.js`
10. `src/features/cart/model/CartProvider.jsx`

Sau khi đọc theo luồng này, bạn sẽ thấy mỗi file chỉ đảm nhận một nhiệm vụ nhỏ và được file phía trên ghép lại thành ứng dụng hoàn chỉnh.

## Công nghệ sử dụng

- **React**: xây dựng giao diện theo component.
- **Vite**: development server và công cụ build.
- **React Router**: điều hướng giữa các trang.
- **Vitest + Testing Library**: kiểm thử.
- **ESLint**: kiểm tra quy tắc và chất lượng mã nguồn.
- **CSS thuần**: quản lý giao diện và responsive layout.

## Bắt đầu

Yêu cầu: Node.js phiên bản 22 trở lên.

```bash
npm install
npm run dev
```

Các lệnh thường dùng:

| Lệnh | Công dụng |
| --- | --- |
| `npm run dev` | Khởi động development server. |
| `npm run build` | Build phiên bản production vào thư mục `dist`. |
| `npm run preview` | Chạy thử bản production đã build. |
| `npm run lint` | Kiểm tra mã nguồn bằng ESLint. |
| `npm test` | Chạy toàn bộ test một lần. |
| `npm run test:watch` | Tự động chạy lại test khi mã nguồn thay đổi. |

## Cấu trúc tổng thể

```text
frontend/
├── src/                            # Toàn bộ mã nguồn ứng dụng
│   ├── app/                        # Khởi tạo và lắp ghép ứng dụng
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx
│   │   ├── App.jsx
│   │   └── router.jsx
│   ├── features/                   # Các module nghiệp vụ độc lập
│   │   ├── cart/
│   │   │   ├── model/
│   │   │   │   ├── cartContext.js
│   │   │   │   ├── CartProvider.jsx
│   │   │   │   └── useCart.js
│   │   │   └── index.js
│   │   └── products/
│   │       ├── api/
│   │       │   └── productsApi.js
│   │       ├── components/
│   │       │   ├── ProductCard.jsx
│   │       │   └── ProductGrid.jsx
│   │       ├── hooks/
│   │       │   └── useProducts.js
│   │       └── index.js
│   ├── pages/                      # Component đại diện cho từng route
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── ProductsPage.jsx
│   ├── shared/                     # Mã dùng chung, không chứa nghiệp vụ riêng
│   │   ├── lib/
│   │   │   ├── formatCurrency.js
│   │   │   └── formatCurrency.test.js
│   │   └── ui/
│   │       └── ButtonLink.jsx
│   ├── styles/
│   │   └── index.css
│   ├── test/
│   │   └── setup.js
│   └── main.jsx                    # Entry point của ứng dụng
├── .env.example                    # Mẫu biến môi trường
├── .gitignore                      # File/thư mục Git không theo dõi
├── eslint.config.js                # Cấu hình ESLint
├── index.html                      # HTML gốc được Vite sử dụng
├── package.json                    # Thông tin, scripts và dependencies
├── package-lock.json               # Khóa chính xác phiên bản dependency
├── vite.config.js                  # Cấu hình Vite và Vitest
└── README.md                       # Tài liệu project
```

## Giải thích từng thư mục và file

### `src/main.jsx`

Entry point của ứng dụng. File này tìm phần tử `#root` trong `index.html`, khởi tạo React và render component `App`.

Đây cũng là nơi import global stylesheet. Không nên đặt logic nghiệp vụ hoặc gọi API trực tiếp tại đây.

### `src/app`

Chứa phần **khởi tạo và lắp ghép** toàn bộ ứng dụng. Tầng này biết các page, feature và provider đang tồn tại, nhưng không chứa logic chi tiết của từng nghiệp vụ.

#### `app/App.jsx`

Root component của React. File này:

- Bọc ứng dụng bằng các global provider như `CartProvider`.
- Khởi tạo hệ thống điều hướng bằng `RouterProvider`.

Nếu sau này có authentication provider, theme provider hoặc query provider, chúng thường được lắp ghép tại đây.

#### `app/router.jsx`

Khai báo bảng định tuyến của ứng dụng:

- `/`: trang chủ.
- `/san-pham`: danh sách sản phẩm.
- `*`: trang 404 khi URL không tồn tại.

Khi thêm một page mới, route của page đó được đăng ký trong file này.

#### `app/layouts/AppLayout.jsx`

Layout dùng chung cho các route, gồm header, navigation, nút giỏ hàng, vùng nội dung và footer.

`<Outlet />` là vị trí React Router render page tương ứng với URL hiện tại.

Nếu ứng dụng có nhiều loại bố cục, có thể bổ sung `AdminLayout.jsx`, `AuthLayout.jsx` hoặc `CheckoutLayout.jsx` trong cùng thư mục.

### `src/features`

Chứa các module theo **nghiệp vụ**. Mỗi feature tự quản lý component, hook, API và state của chính nó.

Một feature có thể có cấu trúc như sau:

```text
feature-name/
├── api/             # Hàm giao tiếp backend
├── components/      # UI chỉ thuộc feature này
├── hooks/           # Custom hook của feature
├── model/           # State, context, reducer và business logic
├── utils/           # Hàm tiện ích riêng của feature nếu cần
└── index.js         # Public API của feature
```

Không bắt buộc tạo tất cả các thư mục con. Chỉ tạo khi feature thực sự cần.

#### `features/cart`

Quản lý trạng thái giỏ hàng.

- `model/cartContext.js`: tạo React Context dùng để truyền dữ liệu giỏ hàng trong component tree.
- `model/CartProvider.jsx`: giữ state, reducer và các action như thêm sản phẩm vào giỏ.
- `model/useCart.js`: custom hook giúp component đọc và thay đổi giỏ hàng một cách an toàn.
- `index.js`: public API; những module bên ngoài chỉ nên import `CartProvider` và `useCart` từ file này.

Ví dụ import đúng:

```jsx
import { useCart } from '@/features/cart'
```

Hạn chế import xuyên vào file nội bộ như:

```jsx
import { useCart } from '@/features/cart/model/useCart'
```

#### `features/products`

Quản lý nghiệp vụ hiển thị sản phẩm.

- `api/productsApi.js`: mock API và hàm `getProducts`. Khi có backend thật, thay phần triển khai trong file này mà không cần sửa UI.
- `hooks/useProducts.js`: gọi API, đồng thời quản lý `products`, `isLoading` và `error`.
- `components/ProductCard.jsx`: hiển thị một sản phẩm và phát sự kiện thêm vào giỏ.
- `components/ProductGrid.jsx`: lấy danh sách sản phẩm, xử lý loading/error và render nhiều `ProductCard`.
- `index.js`: public API của feature, hiện export `ProductGrid`.

### `src/pages`

Chứa component cấp trang, mỗi component thường tương ứng với một route.

Page chịu trách nhiệm **lắp ghép feature thành một màn hình hoàn chỉnh**, nhưng không nên chứa quá nhiều business logic.

- `HomePage.jsx`: trang chủ, gồm hero section và một phần danh sách sản phẩm.
- `ProductsPage.jsx`: trang hiển thị toàn bộ sản phẩm.
- `NotFoundPage.jsx`: trang lỗi 404 cho URL không hợp lệ.

Khi thêm trang chi tiết sản phẩm, có thể tạo `ProductDetailPage.jsx`, sau đó đăng ký nó trong `app/router.jsx`.

### `src/shared`

Chứa mã nguồn thật sự dùng chung cho nhiều feature. `shared` không được phụ thuộc ngược lại vào `pages`, `features` hoặc `app`.

Không nên đưa một component vào `shared` chỉ vì “có thể sau này sẽ dùng lại”. Hãy để nó trong feature trước; chỉ di chuyển sang `shared` khi đã có ít nhất hai nơi sử dụng hợp lý.

#### `shared/ui/ButtonLink.jsx`

Component link có hình thức giống button. Nó dùng `Link` của React Router để chuyển trang mà không reload trình duyệt.

Đây là component UI dùng chung, không chứa logic sản phẩm hay giỏ hàng.

#### `shared/lib/formatCurrency.js`

Hàm tiện ích định dạng số thành tiền Việt Nam. Các hàm thuần, formatter và helper dùng chung có thể đặt trong `shared/lib`.

#### `shared/lib/formatCurrency.test.js`

Unit test đặt cạnh file được kiểm thử. Cách đặt test gần implementation giúp dễ tìm và cùng di chuyển khi tái cấu trúc.

### `src/styles/index.css`

Chứa:

- Design tokens dùng chung như màu sắc và font chữ.
- Reset và kiểu hiển thị toàn cục.
- Style cho layout, page và component hiện tại.
- Responsive breakpoint cho màn hình nhỏ.

Khi giao diện lớn hơn, có thể tách CSS theo component hoặc dùng CSS Modules, ví dụ `ProductCard.module.css` đặt cạnh `ProductCard.jsx`.

### `src/test/setup.js`

Thiết lập môi trường test trước khi Vitest chạy. File này hiện nạp matcher của `jest-dom`, cho phép viết assertion thân thiện như `toBeInTheDocument()`.

## Các file ở thư mục gốc

### `index.html`

HTML shell của ứng dụng. Phần tử `<div id="root">` là nơi React được mount. Vite tự động xử lý script trỏ đến `src/main.jsx`.

### `package.json`

Khai báo tên project, scripts, dependencies cần khi chạy ứng dụng và dev dependencies phục vụ build, lint, test.

### `package-lock.json`

Khóa chính xác phiên bản của toàn bộ dependency và dependency con, giúp các máy cài đặt cùng một bộ package. File này nên được commit vào Git và không chỉnh sửa thủ công.

### `vite.config.js`

Cấu hình Vite và Vitest. Project định nghĩa alias:

```js
'@': '/src'
```

Nhờ đó có thể import bằng `@/features/cart` thay vì đường dẫn tương đối dài như `../../../features/cart`.

File này cũng cấu hình test chạy trong môi trường `jsdom` và tự động nạp `src/test/setup.js`.

### `eslint.config.js`

Định nghĩa quy tắc kiểm tra JavaScript, React Hooks và React Fast Refresh. Chạy `npm run lint` trước khi commit để phát hiện lỗi sớm.

### `.env.example`

Mẫu các biến môi trường project cần. Sao chép file này thành `.env` để cấu hình máy local:

```bash
VITE_API_URL=/api
```

Chỉ biến bắt đầu bằng `VITE_` mới được Vite cung cấp cho mã nguồn phía trình duyệt. Không lưu secret như mật khẩu hoặc private API key trong biến frontend.

### `.gitignore`

Khai báo các file không đưa vào Git, ví dụ `node_modules`, `dist`, `coverage` và `.env`.

### `dist`

Được tạo sau khi chạy `npm run build`. Đây là output đã tối ưu để deploy, không phải nơi chỉnh sửa mã nguồn.

### `node_modules`

Chứa các package npm đã cài. Thư mục này được tạo bởi `npm install`, không chỉnh sửa trực tiếp và không commit vào Git.

## Quy tắc phụ thuộc giữa các tầng

```text
app  ───────► pages ───────► features ───────► shared
 │              │                │
 └──────────────┴────────────────┴───────────► shared
```

- `app` có thể import từ `pages`, `features` và `shared`.
- `pages` có thể import từ `features` và `shared`.
- `features` có thể import từ `shared`.
- Feature này chỉ truy cập feature khác qua public API `index.js`.
- `shared` không import từ `features`, `pages` hoặc `app`.

Quy tắc này giữ cho tầng bên dưới độc lập với tầng bên trên và tránh vòng lặp dependency.

## Nên đặt code mới ở đâu?

| Nhu cầu | Vị trí đề xuất |
| --- | --- |
| Thêm một màn hình/URL mới | `src/pages` và khai báo route trong `src/app/router.jsx` |
| Component chỉ dùng cho sản phẩm | `src/features/products/components` |
| API liên quan sản phẩm | `src/features/products/api` |
| State và business logic của giỏ hàng | `src/features/cart/model` |
| Component dùng chung cho nhiều feature | `src/shared/ui` |
| Formatter hoặc helper dùng chung | `src/shared/lib` |
| Provider dùng cho toàn ứng dụng | Khai báo trong feature tương ứng, lắp ghép tại `src/app/App.jsx` |
| Layout mới | `src/app/layouts` |
| Global style hoặc design token | `src/styles` |

## Quy ước đặt tên

- React component: `PascalCase.jsx`, ví dụ `ProductCard.jsx`.
- Custom hook: bắt đầu bằng `use`, ví dụ `useProducts.js`.
- Hàm tiện ích và API: `camelCase.js`, ví dụ `formatCurrency.js`.
- Test: cùng tên file nguồn và thêm `.test`, ví dụ `formatCurrency.test.js`.
- Feature và thư mục: chữ thường, số nhiều khi đại diện một tập hợp, ví dụ `products`.
- Dùng named export để dễ tìm kiếm và refactor.

## Khi kết nối backend thật

1. Sao chép `.env.example` thành `.env`.
2. Điền URL backend vào `VITE_API_URL`.
3. Thay mock data trong `features/products/api/productsApi.js` bằng `fetch` hoặc HTTP client.
4. Giữ nguyên contract trả về của `getProducts` để `useProducts` và UI không phải thay đổi.
5. Bổ sung xử lý authentication, timeout và chuẩn hóa lỗi nếu backend yêu cầu.
