import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedDatabase() {
  console.log("🌱 Seeding TechStore database với dữ liệu điện tử...");

  // 1. Create categories cho đồ điện tử
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Điện thoại",
        slug: "dien-thoai",
        description: "Smartphone, iPhone, Android các thương hiệu",
        imageUrl: "/categories/smartphone.jpg",
        sortOrder: 1,
      },
      {
        name: "Laptop",
        slug: "laptop", 
        description: "Laptop gaming, văn phòng, Macbook",
        imageUrl: "/categories/laptop.jpg",
        sortOrder: 2,
      },
      {
        name: "Tablet",
        slug: "tablet",
        description: "iPad, Android tablet, Surface",
        imageUrl: "/categories/tablet.jpg",
        sortOrder: 3,
      },
      {
        name: "Tai nghe",
        slug: "tai-nghe",
        description: "Tai nghe không dây, có dây, gaming",
        imageUrl: "/categories/headphones.jpg", 
        sortOrder: 4,
      },
      {
        name: "Phụ kiện",
        slug: "phu-kien",
        description: "Sạc, ốp lưng, bảo vệ màn hình",
        imageUrl: "/categories/accessories.jpg",
        sortOrder: 5,
      },
      {
        name: "Đồng hồ thông minh",
        slug: "dong-ho-thong-minh",
        description: "Apple Watch, Samsung Galaxy Watch, Xiaomi",
        imageUrl: "/categories/smartwatch.jpg",
        sortOrder: 6,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories created:", categories.count);

  // 2. Create brands
  const brands = await prisma.brand.createMany({
    data: [
      {
        name: "Apple",
        slug: "apple",
        logoUrl: "/brands/apple.png",
        description: "Công ty công nghệ hàng đầu thế giới",
        website: "https://apple.com",
      },
      {
        name: "Samsung",
        slug: "samsung", 
        logoUrl: "/brands/samsung.png",
        description: "Thương hiệu điện tử Hàn Quốc",
        website: "https://samsung.com",
      },
      {
        name: "Xiaomi",
        slug: "xiaomi",
        logoUrl: "/brands/xiaomi.png", 
        description: "Thương hiệu công nghệ Trung Quốc",
        website: "https://xiaomi.com",
      },
      {
        name: "ASUS",
        slug: "asus",
        logoUrl: "/brands/asus.png",
        description: "Laptop và linh kiện máy tính",
        website: "https://asus.com",
      },
      {
        name: "Dell",
        slug: "dell",
        logoUrl: "/brands/dell.png",
        description: "Laptop và máy tính doanh nghiệp",
        website: "https://dell.com",
      },
      {
        name: "Sony",
        slug: "sony",
        logoUrl: "/brands/sony.png",
        description: "Thiết bị âm thanh và điện tử",
        website: "https://sony.com",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Brands created:", brands.count);

  // 3. Get category and brand IDs
  const categoriesData = await prisma.category.findMany();
  const brandsData = await prisma.brand.findMany();

  const phoneCategory = categoriesData.find(c => c.slug === "dien-thoai");
  const laptopCategory = categoriesData.find(c => c.slug === "laptop");
  const tabletCategory = categoriesData.find(c => c.slug === "tablet");
  const headphoneCategory = categoriesData.find(c => c.slug === "tai-nghe");
  const accessoryCategory = categoriesData.find(c => c.slug === "phu-kien");
  const smartwatchCategory = categoriesData.find(c => c.slug === "dong-ho-thong-minh");

  const appleBrand = brandsData.find(b => b.slug === "apple");
  const samsungBrand = brandsData.find(b => b.slug === "samsung");
  const xiaomiBrand = brandsData.find(b => b.slug === "xiaomi");
  const asusBrand = brandsData.find(b => b.slug === "asus");
  const dellBrand = brandsData.find(b => b.slug === "dell");
  const sonyBrand = brandsData.find(b => b.slug === "sony");

  // 4. Create admin user
  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      email: "admin@techstore.com",
      password: hashedAdminPassword,
      fullName: "Admin TechStore",
      role: "ADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  // 5. Create sample user
  const hashedUserPassword = await bcrypt.hash("user123", 10);
  const sampleUser = await prisma.user.upsert({
    where: { username: "johndoe" },
    update: {},
    create: {
      username: "johndoe",
      email: "john@example.com",
      password: hashedUserPassword,
      fullName: "John Doe",
      phoneNumber: "0123456789",
      role: "USER",
    },
  });

  console.log("✅ Users created: 2 (admin, user)");

  // 6. Create products với variants
  const products = [
    // iPhone 15 Pro Max
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      sku: "IPH15PMAX",
      shortDescription: "iPhone mới nhất với chip A17 Pro, camera 48MP và thiết kế Titanium",
      fullDescription: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera chính 48MP, zoom quang học 5x và khung viền Titanium cao cấp. Màn hình Super Retina XDR 6.7 inch với Dynamic Island.",
      specifications: {
        display: "6.7 inch Super Retina XDR",
        chip: "A17 Pro",
        camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
        battery: "4441 mAh",
        os: "iOS 17",
        material: "Titanium",
      },
      basePrice: 29990000,
      thumbnail: "/products/iphone-15-pro-max.jpg",
      weight: 0.221,
      dimensions: { length: 159.9, width: 76.7, height: 8.25 },
      warranty: 12,
      categoryId: phoneCategory?.id,
      brandId: appleBrand?.id,
      totalStock: 50,
      isFeatured: true,
      metaTitle: "iPhone 15 Pro Max - Công nghệ tiên tiến",
      variants: [
        {
          sku: "IPH15PMAX-256-NTI",
          name: "iPhone 15 Pro Max 256GB Natural Titanium",
          color: "Natural Titanium",
          colorHex: "#F5F5DC",
          storage: "256GB",
          priceAdjust: 0,
          stock: 15,
        },
        {
          sku: "IPH15PMAX-256-BTI", 
          name: "iPhone 15 Pro Max 256GB Blue Titanium",
          color: "Blue Titanium",
          colorHex: "#4169E1",
          storage: "256GB",
          priceAdjust: 0,
          stock: 12,
        },
        {
          sku: "IPH15PMAX-512-NTI",
          name: "iPhone 15 Pro Max 512GB Natural Titanium",
          color: "Natural Titanium", 
          colorHex: "#F5F5DC",
          storage: "512GB",
          priceAdjust: 5000000,
          stock: 8,
        },
        {
          sku: "IPH15PMAX-1TB-BTI",
          name: "iPhone 15 Pro Max 1TB Blue Titanium",
          color: "Blue Titanium",
          colorHex: "#4169E1", 
          storage: "1TB",
          priceAdjust: 10000000,
          stock: 5,
        },
      ],
      images: [
        { imageUrl: "/products/iphone-15-pro-max-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/iphone-15-pro-max-2.jpg", isPrimary: false, sortOrder: 2 },
        { imageUrl: "/products/iphone-15-pro-max-3.jpg", isPrimary: false, sortOrder: 3 },
      ],
    },
    // MacBook Pro M3
    {
      name: "MacBook Pro 14-inch M3",
      slug: "macbook-pro-14-m3",
      sku: "MBP14M3",
      shortDescription: "MacBook Pro với chip M3, màn hình Liquid Retina XDR 14-inch",
      fullDescription: "MacBook Pro 14-inch với chip M3 8-core CPU, GPU 10-core, màn hình Liquid Retina XDR, hỗ trợ ProRes và ProRAW. Thiết kế mỏng nhẹ với thời lượng pin lên đến 18 giờ.",
      specifications: {
        display: "14.2-inch Liquid Retina XDR",
        chip: "Apple M3",
        memory: "8GB Unified Memory",
        storage: "512GB SSD",
        ports: "2x Thunderbolt 4, HDMI, SDXC, MagSafe 3",
        weight: "1.55 kg",
      },
      basePrice: 49990000,
      thumbnail: "/products/macbook-pro-14-m3.jpg",
      weight: 1.55,
      warranty: 12,
      categoryId: laptopCategory?.id,
      brandId: appleBrand?.id,
      totalStock: 30,
      isFeatured: true,
      variants: [
        {
          sku: "MBP14M3-8GB-512-SG",
          name: "MacBook Pro 14 M3 8GB 512GB Space Gray", 
          color: "Space Gray",
          colorHex: "#4A4A4A",
          memory: "8GB",
          storage: "512GB",
          priceAdjust: 0,
          stock: 12,
        },
        {
          sku: "MBP14M3-16GB-1TB-SG",
          name: "MacBook Pro 14 M3 16GB 1TB Space Gray",
          color: "Space Gray", 
          colorHex: "#4A4A4A",
          memory: "16GB",
          storage: "1TB",
          priceAdjust: 15000000,
          stock: 8,
        },
      ],
      images: [
        { imageUrl: "/products/macbook-pro-14-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/macbook-pro-14-2.jpg", isPrimary: false, sortOrder: 2 },
      ],
    },
    // Samsung Galaxy S24 Ultra
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra", 
      sku: "SGS24U",
      shortDescription: "Flagship Samsung với bút S Pen, camera 200MP và AI tích hợp",
      fullDescription: "Galaxy S24 Ultra với camera chính 200MP, zoom quang học 5x, bút S Pen tích hợp và tính năng Galaxy AI. Màn hình Dynamic AMOLED 2X 6.8 inch 120Hz.",
      specifications: {
        display: "6.8-inch Dynamic AMOLED 2X",
        chip: "Snapdragon 8 Gen 3",
        camera: "200MP Main, 50MP Periscope, 10MP Telephoto, 12MP Ultra Wide",
        battery: "5000 mAh",
        os: "Android 14, One UI 6.1",
        spen: "S Pen tích hợp",
      },
      basePrice: 26990000,
      thumbnail: "/products/galaxy-s24-ultra.jpg",
      weight: 0.232,
      warranty: 12,
      categoryId: phoneCategory?.id,
      brandId: samsungBrand?.id,
      totalStock: 40,
      variants: [
        {
          sku: "SGS24U-256-TBK",
          name: "Galaxy S24 Ultra 256GB Titanium Black",
          color: "Titanium Black",
          colorHex: "#1C1C1C",
          storage: "256GB",
          priceAdjust: 0,
          stock: 15,
        },
        {
          sku: "SGS24U-512-TGY",
          name: "Galaxy S24 Ultra 512GB Titanium Gray", 
          color: "Titanium Gray",
          colorHex: "#708090",
          storage: "512GB",
          priceAdjust: 4000000,
          stock: 10,
        },
      ],
      images: [
        { imageUrl: "/products/galaxy-s24-ultra-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/galaxy-s24-ultra-2.jpg", isPrimary: false, sortOrder: 2 },
      ],
    },
    // ASUS ROG Laptop
    {
      name: "ASUS ROG Strix G15 G513",
      slug: "asus-rog-strix-g15",
      sku: "ROG-G513",
      shortDescription: "Laptop gaming với AMD Ryzen 7, RTX 4060 và màn hình 144Hz",
      fullDescription: "ASUS ROG Strix G15 với processor AMD Ryzen 7 7735HS, NVIDIA GeForce RTX 4060, RAM 16GB DDR5, SSD 512GB. Màn hình 15.6 inch FHD 144Hz hoàn hảo cho gaming.",
      specifications: {
        display: "15.6-inch FHD 144Hz IPS",
        cpu: "AMD Ryzen 7 7735HS",
        gpu: "NVIDIA GeForce RTX 4060 8GB",
        memory: "16GB DDR5-4800",
        storage: "512GB PCIe 4.0 NVMe SSD",
        os: "Windows 11 Home",
      },
      basePrice: 32990000,
      thumbnail: "/products/asus-rog-g15.jpg",
      weight: 2.3,
      warranty: 24,
      categoryId: laptopCategory?.id,
      brandId: asusBrand?.id,
      totalStock: 20,
      variants: [
        {
          sku: "ROG-G513-16GB-512",
          name: "ASUS ROG Strix G15 16GB 512GB",
          memory: "16GB",
          storage: "512GB",
          priceAdjust: 0,
          stock: 15,
        },
        {
          sku: "ROG-G513-32GB-1TB", 
          name: "ASUS ROG Strix G15 32GB 1TB",
          memory: "32GB",
          storage: "1TB",
          priceAdjust: 8000000,
          stock: 5,
        },
      ],
      images: [
        { imageUrl: "/products/asus-rog-g15-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/asus-rog-g15-2.jpg", isPrimary: false, sortOrder: 2 },
      ],
    },
    // AirPods Pro
    {
      name: "AirPods Pro (2nd generation)",
      slug: "airpods-pro-2nd-gen",
      sku: "APP2",
      shortDescription: "Tai nghe không dây với chống ồn chủ động và chip H2",
      fullDescription: "AirPods Pro thế hệ thứ 2 với chip H2, chống ồn chủ động được cải tiến, Adaptive Transparency và Audio Space. Case sạc MagSafe với loa tích hợp.",
      specifications: {
        chip: "Apple H2",
        anc: "Active Noise Cancellation",
        battery: "Lên đến 6 giờ nghe nhạc",
        case: "MagSafe Charging Case",
        water_resistance: "IPX4",
        audio: "Adaptive EQ, Spatial Audio",
      },
      basePrice: 6490000,
      thumbnail: "/products/airpods-pro-2.jpg",
      weight: 0.056,
      warranty: 12,
      categoryId: headphoneCategory?.id,
      brandId: appleBrand?.id,
      totalStock: 60,
      isFeatured: true,
      variants: [
        {
          sku: "APP2-WHITE",
          name: "AirPods Pro 2nd Gen White",
          color: "White",
          colorHex: "#FFFFFF",
          priceAdjust: 0,
          stock: 60,
        },
      ],
      images: [
        { imageUrl: "/products/airpods-pro-2-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/airpods-pro-2-2.jpg", isPrimary: false, sortOrder: 2 },
      ],
    },
    // Apple Watch
    {
      name: "Apple Watch Series 9",
      slug: "apple-watch-series-9",
      sku: "AWS9",
      shortDescription: "Đồng hồ thông minh với chip S9, màn hình Retina và tính năng sức khỏe",
      fullDescription: "Apple Watch Series 9 với chip S9 SiP, màn hình Retina Always-On 45mm, GPS + Cellular, tính năng theo dõi sức khỏe toàn diện và watchOS 10.",
      specifications: {
        display: "45mm Retina LTPO OLED Always-On",
        chip: "S9 SiP",
        sensors: "Blood Oxygen, ECG, Temperature",
        connectivity: "GPS + Cellular",
        battery: "Lên đến 18 giờ",
        water_resistance: "50 meters",
      },
      basePrice: 12990000,
      thumbnail: "/products/apple-watch-s9.jpg",
      weight: 0.051,
      warranty: 12,
      categoryId: smartwatchCategory?.id,
      brandId: appleBrand?.id,
      totalStock: 35,
      variants: [
        {
          sku: "AWS9-45-GPS-PNK",
          name: "Apple Watch S9 45mm GPS Pink",
          color: "Pink",
          colorHex: "#FFB6C1",
          size: "45mm",
          priceAdjust: 0,
          stock: 15,
        },
        {
          sku: "AWS9-45-CELL-MNT",
          name: "Apple Watch S9 45mm GPS+Cellular Midnight",
          color: "Midnight",
          colorHex: "#191970",
          size: "45mm",
          priceAdjust: 3000000,
          stock: 20,
        },
      ],
      images: [
        { imageUrl: "/products/apple-watch-s9-1.jpg", isPrimary: true, sortOrder: 1 },
        { imageUrl: "/products/apple-watch-s9-2.jpg", isPrimary: false, sortOrder: 2 },
      ],
    },
  ];

  // Create products với variants và images
  for (const productData of products) {
    const { variants, images, ...productInfo } = productData;
    
    const product = await prisma.product.create({
      data: productInfo,
    });

    // Create variants
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            ...variant,
          },
        });
      }
    }

    // Create images  
    if (images && images.length > 0) {
      for (const image of images) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            ...image,
          },
        });
      }
    }
  }

  console.log("✅ Products with variants created:", products.length);

  // 7. Create banners
  const banners = await prisma.banner.createMany({
    data: [
      {
        title: "iPhone 15 Pro Max - Ra mắt",
        subtitle: "Titanium. Mạnh mẽ. Tinh tế.",
        description: "Trải nghiệm iPhone Pro Max mới với thiết kế Titanium và chip A17 Pro",
        imageUrl: "/banners/iphone-15-banner.jpg",
        mobileImageUrl: "/banners/iphone-15-banner-mobile.jpg",
        linkUrl: "/products/iphone-15-pro-max",
        buttonText: "Khám phá ngay",
        position: "HOME_SLIDER",
        sortOrder: 1,
      },
      {
        title: "MacBook Pro M3 - Sức mạnh chuyên nghiệp",
        subtitle: "Chip M3. Hiệu suất vượt trội.",
        description: "MacBook Pro với chip M3 mang lại hiệu suất đỉnh cao cho mọi tác vụ",
        imageUrl: "/banners/macbook-m3-banner.jpg", 
        linkUrl: "/products/macbook-pro-14-m3",
        buttonText: "Tìm hiểu thêm",
        position: "HOME_SLIDER",
        sortOrder: 2,
      },
      {
        title: "Gaming Laptop Sale",
        subtitle: "Giảm giá lên đến 20%",
        description: "Các dòng laptop gaming ASUS ROG, MSI Gaming với hiệu suất mạnh mẽ",
        imageUrl: "/banners/gaming-laptop-sale.jpg",
        linkUrl: "/products?category=laptop&brand=asus",
        buttonText: "Mua ngay",
        position: "HOME_BANNER",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Banners created:", banners.count);

  // 8. Create sample reviews
  const productsWithIds = await prisma.product.findMany({ select: { id: true } });
  
  if (productsWithIds.length > 0) {
    await prisma.review.createMany({
      data: [
        {
          productId: productsWithIds[0].id,
          userId: sampleUser.id,
          rating: 5,
          title: "Sản phẩm tuyệt vời!",
          comment: "iPhone 15 Pro Max thật sự ấn tượng. Camera cực kì sắc nét, pin trâu, thiết kế đẹp. Đáng đồng tiền bát gạo!",
          isVerified: true,
          isApproved: true,
        },
        {
          productId: productsWithIds[1].id,
          userId: sampleUser.id,
          rating: 5,
          title: "MacBook tốt nhất từng dùng",
          comment: "MacBook Pro M3 chạy cực mượt, pin khủng, màn hình đẹp. Rất phù hợp cho công việc thiết kế và lập trình.",
          isVerified: true,
          isApproved: true,
        },
      ],
      skipDuplicates: true,
    });

    console.log("✅ Reviews created: 2");
  }

  console.log("🎉 TechStore database seeded thành công với dữ liệu điện tử!");
}

async function main() {
  try {
    await seedDatabase();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}
