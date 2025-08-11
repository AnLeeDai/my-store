import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, fullName, email, phoneNumber, address } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Tên đăng nhập và mật khẩu là bắt buộc" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 },
      );
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Tên đăng nhập đã tồn tại" },
        { status: 409 },
      );
    }

    // Kiểm tra email đã tồn tại chưa (nếu có)
    if (email) {
      const existingEmail = await prisma.user.findFirst({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: "Email đã được sử dụng" },
          { status: 409 },
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullName,
        email,
        phoneNumber,
        address,
        role: "USER",
      },
    });

    // Response không bao gồm password
    const userResponse = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
    };

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        user: userResponse,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);

    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}
