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

## Hướng dẫn Deploy theo Vercel Guide (Backup Reference)

### 1. Cài đặt libSQL client
```bash
npm install @libsql/client
```

### 2. Cấu hình Environment Variables trên Vercel

Trong Vercel Dashboard → Project Settings → Environment Variables, thêm:

```bash
# Production Database (Turso)
TURSO_DATABASE_URL=libsql://database-sqlite-vercel-icfg-zntu8wunaad3rltasca5vlay.aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTMxNDM2MDcsImlkIjoiNzk2ZDEwMjgtMWFlZC00YmUyLTg1MTEtZjY5ZmNmMGNmMjljIiwicmlkIjoiOGQzZTgxNWMtZGI1YS00MDYwLWE0YWQtMWMyZjgxODY3NjRkIn0._md1p8BURxfl9xF13sbwlO73OSf3lEII1vAInVaHRfv_fC_NtES1YC6tlsyP_E1evdO8X8IL64Y1Kidw3HwmDw

# Environment
NODE_ENV=production
```

### 3. Vercel CLI Setup
```bash
# Connect to your Vercel project
vercel link

# Pull environment variables
vercel env pull .env.development.local
```

### 4. Test Turso Connection

Sau khi deploy, test connection:
```bash
# Test endpoint
curl https://your-project.vercel.app/api/test-turso

# Hoặc truy cập browser
https://your-project.vercel.app/api/test-turso
```

### 5. Database Schema Setup

Với Turso, bạn cần setup schema bằng SQL commands:

```sql
-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT 1
);

-- Users table  
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT,
  address TEXT,
  avatar_url TEXT,
  password_changed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  role TEXT DEFAULT 'customer',
  is_active BOOLEAN DEFAULT 1
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NOT NULL,
  price REAL NOT NULL,
  thumbnail TEXT,
  short_description TEXT,
  full_description TEXT,
  extra_info TEXT,
  in_stock INTEGER DEFAULT 0,
  brand TEXT,
  category_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
```

### 5. Kiểm tra

- Truy cập: https://your-project.vercel.app
- Test authentication với Turso database
- Kiểm tra /auth và /products routes

## Notes

- Local development vẫn sử dụng SQLite file (./dev.db)
- Production tự động chuyển sang Turso
- Database được cấu hình tự động dựa trên NODE_ENV
