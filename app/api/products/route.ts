import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {
      isActive: true
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId)
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      price,
      thumbnail,
      shortDescription,
      fullDescription,
      extraInfo,
      inStock,
      brand,
      categoryId,
      images
    } = body

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Product name and price are required' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        thumbnail,
        shortDescription,
        fullDescription,
        extraInfo,
        inStock: parseInt(inStock) || 0,
        brand,
        categoryId: categoryId ? parseInt(categoryId) : null,
        images: images ? {
          create: images.map((url: string) => ({ imageUrl: url }))
        } : undefined
      },
      include: {
        category: true,
        images: true,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
