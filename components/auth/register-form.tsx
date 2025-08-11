"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";

import { useToast } from "@/lib/use-toast";
import { useAuth } from "@/lib/auth-context";

interface RegisterFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function RegisterForm({
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
}: RegisterFormProps) {
  const { register } = useAuth();
  const toast = useToast();

  const validateForm = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    // Validate username
    if (!username || username.trim().length < 3) {
      toast.error("Tên đăng nhập phải có ít nhất 3 ký tự");

      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới");

      return false;
    }

    // Validate password
    if (!password || password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");

      return false;
    }

    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Mật khẩu phải chứa ít nhất 1 chữ cái thường");

      return false;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Mật khẩu phải chứa ít nhất 1 chữ cái hoa");

      return false;
    }

    if (!/(?=.*\d)/.test(password)) {
      toast.error("Mật khẩu phải chứa ít nhất 1 chữ số");

      return false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp với mật khẩu đã nhập");

      return false;
    }

    // Validate email if provided
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Định dạng email không hợp lệ");

        return false;
      }
    }

    // Validate phone number if provided
    if (phoneNumber && phoneNumber.trim() !== "") {
      const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

      if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ""))) {
        toast.error("Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx)");

        return false;
      }
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Validate form
    if (!validateForm(formData)) {
      return;
    }

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;

    setIsLoading(true);
    onError("");

    try {
      const dataToSend = {
        username,
        password,
        fullName: fullName || undefined,
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
        address: address || undefined,
      };

      const result = await register(dataToSend);

      if (result.success) {
        onSuccess();
      } else {
        toast.error(
          result.error || "Đăng ký tài khoản thất bại. Vui lòng thử lại.",
        );
        onError(result.error || "Đăng ký tài khoản thất bại");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Đã xảy ra lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
      onError("Lỗi kết nối máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <Form
          className="space-y-4"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          {/* Thông tin đăng nhập */}
          <Input
            isRequired
            errorMessage="Tên đăng nhập phải có ít nhất 3 ký tự và chỉ chứa chữ cái, số, dấu gạch dưới"
            label="Tên đăng nhập"
            minLength={3}
            name="username"
            pattern="[a-zA-Z0-9_]+"
            placeholder="Nhập tên đăng nhập (ít nhất 3 ký tự)"
            variant="bordered"
          />

          {/* Mật khẩu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isRequired
              errorMessage="Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số"
              label="Mật khẩu"
              minLength={6}
              name="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
              placeholder="Nhập mật khẩu mạnh (ít nhất 6 ký tự)"
              type="password"
              variant="bordered"
            />
            <Input
              isRequired
              errorMessage="Vui lòng nhập lại mật khẩu để xác nhận"
              label="Xác nhận mật khẩu"
              minLength={6}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              type="password"
              variant="bordered"
            />
          </div>

          {/* Thông tin cá nhân */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              errorMessage="Họ tên chỉ được chứa chữ cái và khoảng trắng (2-50 ký tự)"
              label="Họ và tên"
              name="fullName"
              pattern="^[a-zA-ZÀ-ỹ\s]{2,50}$"
              placeholder="Nhập họ và tên đầy đủ (tùy chọn)"
              variant="bordered"
            />
            <Input
              errorMessage="Vui lòng nhập đúng định dạng email"
              label="Email"
              name="email"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              placeholder="Nhập địa chỉ email (tùy chọn)"
              type="email"
              variant="bordered"
            />
          </div>

          {/* Thông tin liên hệ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              errorMessage="Số điện thoại không hợp lệ (định dạng: 0xxxxxxxxx)"
              label="Số điện thoại"
              name="phoneNumber"
              pattern="^(0[3|5|7|8|9])+([0-9]{8})$"
              placeholder="Nhập số điện thoại (VD: 0901234567)"
              variant="bordered"
            />
            <Input
              errorMessage="Địa chỉ không được vượt quá 200 ký tự"
              label="Địa chỉ"
              maxLength={200}
              name="address"
              placeholder="Nhập địa chỉ của bạn (tùy chọn)"
              variant="bordered"
            />
          </div>

          <Button fullWidth color="primary" isLoading={isLoading} type="submit">
            {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
