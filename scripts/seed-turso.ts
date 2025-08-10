import { client } from '../lib/turso.js';
import bcrypt from 'bcryptjs';

async function seedTursoDatabase() {
  console.log('🌱 Starting Turso database seeding...');

  try {
    // Check if data already exists
    const existingCategories = await client.execute('SELECT COUNT(*) as count FROM categories');
    if (Number(existingCategories.rows[0].count) > 0) {
      console.log('📦 Database already has data, skipping seed...');
      return;
    }

    // Seed categories
    console.log('📂 Seeding categories...');
    const categories = [
      { name: 'Điện thoại', description: 'Smartphone và phụ kiện di động' },
      { name: 'Laptop', description: 'Máy tính xách tay và linh kiện' },
      { name: 'Phụ kiện', description: 'Phụ kiện công nghệ đa dạng' }
    ];

    for (const category of categories) {
      await client.execute({
        sql: 'INSERT INTO categories (category_name, description) VALUES (?, ?)',
        args: [category.name, category.description]
      });
    }

    // Seed admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await client.execute({
      sql: `INSERT INTO users (username, password, full_name, email, role) 
            VALUES (?, ?, ?, ?, ?)`,
      args: ['admin', hashedPassword, 'Quản trị viên', 'admin@techstore.vn', 'admin']
    });

    // Seed test user
    console.log('👤 Creating test user...');
    const testPassword = await bcrypt.hash('user123', 10);
    await client.execute({
      sql: `INSERT INTO users (username, password, full_name, email, phone_number, address) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: ['testuser', testPassword, 'Người dùng test', 'test@techstore.vn', '0901234567', 'Hà Nội, Việt Nam']
    });

    // Seed products
    console.log('📱 Seeding products...');
    const products = [
      {
        name: 'iPhone 15 Pro Max',
        price: 32990000,
        description: 'Flagship iPhone mới nhất với chip A17 Pro',
        category: 1,
        brand: 'Apple',
        stock: 50
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        price: 30990000,
        description: 'Flagship Android với S Pen tích hợp',
        category: 1,
        brand: 'Samsung',
        stock: 45
      },
      {
        name: 'MacBook Pro M3',
        price: 45990000,
        description: 'Laptop chuyên nghiệp với chip M3 mạnh mẽ',
        category: 2,
        brand: 'Apple',
        stock: 30
      },
      {
        name: 'Dell XPS 13',
        price: 25990000,
        description: 'Ultrabook cao cấp cho doanh nhân',
        category: 2,
        brand: 'Dell',
        stock: 25
      },
      {
        name: 'AirPods Pro 2',
        price: 6490000,
        description: 'Tai nghe không dây với khử tiếng ồn',
        category: 3,
        brand: 'Apple',
        stock: 100
      },
      {
        name: 'Logitech MX Master 3',
        price: 2190000,
        description: 'Chuột không dây cao cấp cho productivity',
        category: 3,
        brand: 'Logitech',
        stock: 80
      },
      {
        name: 'iPad Pro 12.9"',
        price: 28990000,
        description: 'Tablet chuyên nghiệp với M2 chip',
        category: 3,
        brand: 'Apple',
        stock: 35
      }
    ];

    for (const product of products) {
      await client.execute({
        sql: `INSERT INTO products (product_name, price, short_description, category_id, brand, in_stock) 
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [product.name, product.price, product.description, product.category, product.brand, product.stock]
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('📊 Summary:');
    console.log('  - Categories: 3');
    console.log('  - Users: 2 (admin, testuser)');
    console.log('  - Products: 7');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedTursoDatabase();
}

export { seedTursoDatabase };
