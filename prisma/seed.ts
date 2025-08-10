import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database cho cửa hàng công nghệ...')

  // Create categories - chỉ các danh mục công nghệ
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Smartphones',
        description: 'Điện thoại thông minh các loại',
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Laptops',
        description: 'Máy tính xách tay và ultrabooks',
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Accessories',
        description: 'Phụ kiện công nghệ: tai nghe, chuột, bàn phím',
      },
    }),
    prisma.category.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Gaming',
        description: 'Thiết bị gaming và console',
      },
    }),
    prisma.category.upsert({
      where: { id: 5 },
      update: {},
      create: {
        name: 'Smart Home',
        description: 'Thiết bị nhà thông minh và IoT',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: 'hashed_password_here', // Trong ứng dụng thực tế, sử dụng bcrypt
        fullName: 'Quản trị viên hệ thống',
        email: 'admin@techstore.com',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { username: 'customer1' },
      update: {},
      create: {
        username: 'customer1',
        password: 'hashed_password_here', // Trong ứng dụng thực tế, sử dụng bcrypt
        fullName: 'Nguyễn Văn A',
        email: 'customer1@example.com',
        phoneNumber: '0901234567',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        role: 'USER',
      },
    }),
  ])

  console.log('✅ Users created:', users.length)

  // Create products - chỉ sản phẩm công nghệ
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'iPhone 15 Pro Max',
        price: 29990000,
        thumbnail: '/images/iphone-15-pro-max.jpg',
        shortDescription: 'Điện thoại iPhone mới nhất với chip A17 Pro',
        fullDescription: 'iPhone 15 Pro Max với thiết kế titanium, chip A17 Pro mạnh mẽ, camera 48MP và pin lâu dài.',
        inStock: 25,
        brand: 'Apple',
        categoryId: categories[0].id, // Smartphones
      },
    }),
    prisma.product.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Samsung Galaxy S24 Ultra',
        price: 26990000,
        thumbnail: '/images/galaxy-s24-ultra.jpg',
        shortDescription: 'Flagship Android với S Pen và camera zoom 100x',
        fullDescription: 'Samsung Galaxy S24 Ultra với S Pen tích hợp, camera zoom 100x và hiệu năng AI mạnh mẽ.',
        inStock: 30,
        brand: 'Samsung',
        categoryId: categories[0].id, // Smartphones
      },
    }),
    prisma.product.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'MacBook Pro 14" M3',
        price: 52990000,
        shortDescription: 'Laptop chuyên nghiệp với chip M3',
        fullDescription: 'MacBook Pro 14 inch với chip M3, màn hình Liquid Retina XDR và thời lượng pin 18 giờ.',
        inStock: 15,
        brand: 'Apple',
        categoryId: categories[1].id, // Laptops
      },
    }),
    prisma.product.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Dell XPS 13 Plus',
        price: 35990000,
        thumbnail: '/images/dell-xps-13.jpg',
        shortDescription: 'Ultrabook cao cấp với thiết kế hiện đại',
        fullDescription: 'Dell XPS 13 Plus với màn hình 4K, Intel Core i7 thế hệ 13 và thiết kế không viền.',
        inStock: 20,
        brand: 'Dell',
        categoryId: categories[1].id, // Laptops
      },
    }),
    prisma.product.upsert({
      where: { id: 5 },
      update: {},
      create: {
        name: 'AirPods Pro 2',
        price: 6290000,
        thumbnail: '/images/airpods-pro-2.jpg',
        shortDescription: 'Tai nghe không dây với chống ồn chủ động',
        fullDescription: 'AirPods Pro thế hệ 2 với chống ồn chủ động nâng cao, âm thanh không gian và chip H2.',
        inStock: 50,
        brand: 'Apple',
        categoryId: categories[2].id, // Accessories
      },
    }),
    prisma.product.upsert({
      where: { id: 6 },
      update: {},
      create: {
        name: 'Logitech MX Master 3S',
        price: 2290000,
        thumbnail: '/images/logitech-mx-master-3s.jpg',
        shortDescription: 'Chuột không dây cao cấp cho productivity',
        fullDescription: 'Logitech MX Master 3S với cảm biến 8000 DPI, cuộn siêu tốc và kết nối đa thiết bị.',
        inStock: 40,
        brand: 'Logitech',
        categoryId: categories[2].id, // Accessories
      },
    }),
    prisma.product.upsert({
      where: { id: 7 },
      update: {},
      create: {
        name: 'PlayStation 5',
        price: 12990000,
        thumbnail: '/images/playstation-5.jpg',
        shortDescription: 'Console gaming thế hệ mới từ Sony',
        fullDescription: 'PlayStation 5 với SSD tốc độ cao, ray tracing và controller DualSense haptic feedback.',
        inStock: 10,
        brand: 'Sony',
        categoryId: categories[3].id, // Gaming
      },
    }),
    prisma.product.upsert({
      where: { id: 8 },
      update: {},
      create: {
        name: 'ASUS ROG Strix RTX 4070',
        price: 15990000,
        thumbnail: '/images/rtx-4070.jpg',
        shortDescription: 'Card đồ họa gaming cao cấp',
        fullDescription: 'ASUS ROG Strix GeForce RTX 4070 với DLSS 3, ray tracing và hệ thống tản nhiệt 3 fan.',
        inStock: 8,
        brand: 'ASUS',
        categoryId: categories[3].id, // Gaming
      },
    }),
    prisma.product.upsert({
      where: { id: 9 },
      update: {},
      create: {
        name: 'Google Nest Hub Max',
        price: 6990000,
        thumbnail: '/images/nest-hub-max.jpg',
        shortDescription: 'Màn hình thông minh với Google Assistant',
        fullDescription: 'Google Nest Hub Max với màn hình 10 inch, camera tích hợp và điều khiển nhà thông minh.',
        inStock: 22,
        brand: 'Google',
        categoryId: categories[4].id, // Smart Home
      },
    }),
    prisma.product.upsert({
      where: { id: 10 },
      update: {},
      create: {
        name: 'Xiaomi Robot Vacuum S10+',
        price: 8990000,
        thumbnail: '/images/xiaomi-vacuum.jpg',
        shortDescription: 'Robot hút bụi thông minh với trạm rửa',
        fullDescription: 'Xiaomi Robot Vacuum S10+ với navigation LiDAR, trạm tự động rửa lau và ứng dụng điều khiển.',
        inStock: 18,
        brand: 'Xiaomi',
        categoryId: categories[4].id, // Smart Home
      },
    }),
  ])

  console.log('✅ Products created:', products.length)

  // Create product images
  const productImages = await Promise.all([
    prisma.productImage.create({
      data: {
        productId: products[0].id,
        imageUrl: '/images/iphone-15-pro-max-1.jpg',
      },
    }),
    prisma.productImage.create({
      data: {
        productId: products[0].id,
        imageUrl: '/images/iphone-15-pro-max-2.jpg',
      },
    }),
    prisma.productImage.create({
      data: {
        productId: products[1].id,
        imageUrl: '/images/galaxy-s24-ultra-1.jpg',
      },
    }),
    prisma.productImage.create({
      data: {
        productId: products[2].id,
        imageUrl: '/images/macbook-pro-14-1.jpg',
      },
    }),
    prisma.productImage.create({
      data: {
        productId: products[4].id,
        imageUrl: '/images/airpods-pro-2-1.jpg',
      },
    }),
  ])

  console.log('✅ Product images created:', productImages.length)

  // Create banners
  const banners = await Promise.all([
    prisma.banner.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Sale Cuối Năm - Giảm giá đến 30%',
        imageUrl: '/images/tech-sale-banner.jpg',
      },
    }),
    prisma.banner.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Ra mắt iPhone 15 Pro Max - Đặt hàng ngay',
        imageUrl: '/images/iphone-launch-banner.jpg',
      },
    }),
    prisma.banner.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'Gaming Zone - Thiết bị gaming cao cấp',
        imageUrl: '/images/gaming-banner.jpg',
      },
    }),
  ])

  console.log('✅ Banners created:', banners.length)

  console.log('🎉 Database seeded thành công cho cửa hàng công nghệ!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
