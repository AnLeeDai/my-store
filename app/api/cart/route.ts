import { NextRequest, NextResponse } from "next/server";
import { CartStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

// GET user's cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    let cart = await prisma.cart.findFirst({
      where: {
        userId: parseInt(userId),
        status: CartStatus.ACTIVE,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      // Create a new cart if none exists
      cart = await prisma.cart.create({
        data: {
          userId: parseInt(userId),
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  category: true,
                  images: true,
                },
              },
            },
          },
        },
      });
    }

    return NextResponse.json(cart);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}

// POST add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId, quantity = 1 } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 },
      );
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: {
        userId: parseInt(userId),
        status: CartStatus.ACTIVE,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: parseInt(userId),
        },
      });
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: parseInt(productId),
      },
    });

    let cartItem;

    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + parseInt(quantity),
          price: product.basePrice,
        },
        include: {
          product: {
            include: {
              category: true,
              images: true,
            },
          },
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parseInt(productId),
          quantity: parseInt(quantity),
          price: product.basePrice,
        },
        include: {
          product: {
            include: {
              category: true,
              images: true,
            },
          },
        },
      });
    }

    return NextResponse.json(cartItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 },
    );
  }
}
