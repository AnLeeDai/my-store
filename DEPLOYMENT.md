# Deploy TechStore to Vercel với SQLite Database

## Hướng dẫn Deploy

### 1. Deploy lên Vercel

1. Connect project với Vercel:
```bash
npx vercel
```

2. Vercel sẽ tự động detect Next.js project và build

### 2. Database Setup

Ứng dụng sử dụng SQLite cho cả development và production:
- File database: `dev.db`
- Prisma sẽ tự động tạo database khi chạy migrations

### 3. Setup Database sau khi deploy

```bash
# Local development
npm run db:reset

# Or step by step
npx prisma db push
npm run db:seed
```

### 4. Cấu trúc Database

Database sẽ được tạo với:
- **categories**: Danh mục sản phẩm (Laptop, Smartphone, Tablet, Accessories)
- **users**: 
  - Admin: admin@mystore.com (pass: admin123)
  - Test user: user@test.com (pass: test123)
- **products**: 12 sản phẩm công nghệ với mô tả tiếng Việt
- **orders**, **cart**, **order_items**: Bảng cho shopping cart và orders

### 5. Environment Variables

Chỉ cần thiết lập:
```
DATABASE_URL=file:./dev.db
NODE_ENV=production
```

### 6. Commands hữu ích

```bash
# Development
npm run dev
npm run db:studio  # Xem database
npm run db:reset   # Reset và seed lại database

# Build
npm run build
npm start
```

### 7. Troubleshooting

Nếu gặp lỗi database:
1. Xóa file `dev.db` 
2. Chạy `npm run db:reset`
3. Check Prisma schema trong `prisma/schema.prisma`
