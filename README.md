# TechStore - E-commerce Platform

A modern fullstack e-commerce application built with Next.js, Prisma, and PostgreSQL.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 👥 User authentication with JWT
- 🔐 Role-based access control (admin/user)
- 🎨 Modern UI with HeroUI components
- 🗄️ PostgreSQL database with Prisma ORM
- ⚡ Fast development with Turbopack
- 🚀 Deploy ready for Vercel

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM & Prisma Accelerate
- **UI**: HeroUI (v2), Tailwind CSS
- **Auth**: JWT with HTTP-only cookies
- **Dev Tools**: ESLint, Prettier, tsx

## Database Schema

The application includes the following main entities based on the pro1014_schema:

- **Categories**: Product categories with descriptions
- **Users**: User accounts with roles (admin/user)
- **Products**: Product catalog with images and inventory
- **Carts**: Shopping cart functionality
- **Orders**: Order management with status tracking
- **Banners**: Homepage promotional banners
- **Password Requests**: Password reset system

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or Vercel Postgres)
- Git

### Installation

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL credentials
   ```

3. **Set up the database**:
   ```bash
   # Push schema to database
   npx prisma db push
   
   # Seed with sample data
   npm run db:seed
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Database Management

### Available Scripts

- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma client

### Prisma Studio

To manage your database visually, run:
```bash
npm run db:studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your data.

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination and filtering)
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Soft delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Cart
- `GET /api/cart?userId=[id]` - Get user's cart
- `POST /api/cart` - Add item to cart

## Sample Data

The seed script creates:
- 4 product categories (Electronics, Clothing, Books, Home & Garden)
- 2 users (admin and regular user)
- 5 sample products with proper category relationships
- 3 product images
- 2 banner advertisements

## Next Steps

To extend this e-commerce platform, consider adding:

- User authentication (NextAuth.js)
- Payment processing (Stripe)
- Email notifications
- Product reviews and ratings
- Inventory management
- Analytics dashboard
- Search functionality
- Image upload capabilities
- Order tracking
- Coupon/discount system

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-app-template/blob/main/LICENSE).
