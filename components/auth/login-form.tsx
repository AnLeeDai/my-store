"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";

import { useToast } from "@/lib/use-toast";
import { useAuth } from "@/lib/auth-context";

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function LoginForm({
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
}: LoginFormProps) {
  const { login } = useAuth();
  const toast = useToast();

  const validateLoginForm = (username: string, password: string) => {
    if (!username || username.trim().length < 3) {
      toast.error("Tên đăng nhập phải có ít nhất 3 ký tự");

      return false;
    }

    if (!password || password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");

      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error("Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới");

      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validate form
    if (!validateLoginForm(username, password)) {
      return;
    }

    setIsLoading(true);
    onError("");

    try {
      const result = await login(username, password);

      if (result.success) {
        toast.success("Đăng nhập thành công! Chào mừng bạn quay trở lại.");
        onSuccess();
      } else {
        toast.error(
          result.error || "Tên đăng nhập hoặc mật khẩu không chính xác",
        );
        onError(result.error || "Đăng nhập thất bại");
      }
    } catch {
      toast.error("Đã xảy ra lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
      onError("Lỗi kết nối máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <Form validationBehavior="native" onSubmit={onSubmit}>
          <Input
            isRequired
            className="mb-4"
            errorMessage="Tên đăng nhập phải có ít nhất 3 ký tự và chỉ chứa chữ cái, số, dấu gạch dưới"
            label="Tên đăng nhập"
            minLength={3}
            name="username"
            pattern="[a-zA-Z0-9_]+"
            placeholder="Nhập tên đăng nhập của bạn"
            variant="bordered"
          />

          <Input
            isRequired
            className="mb-4"
            errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
            label="Mật khẩu"
            minLength={6}
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            variant="bordered"
          />

          <Button fullWidth color="primary" isLoading={isLoading} type="submit">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
