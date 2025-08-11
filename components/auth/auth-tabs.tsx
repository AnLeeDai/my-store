"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab } from "@heroui/tabs";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import { useToast } from "@/lib/use-toast";

interface AuthTabsProps {
  defaultTab?: "login" | "register";
}

export default function AuthTabs({ defaultTab = "login" }: AuthTabsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  // Lấy tab hiện tại từ URL
  const currentTab = searchParams.get("tab") || defaultTab;

  const handleRegisterSuccess = () => {
    setError("");
    toast.success("Đăng ký thành công! Chào mừng bạn đến với TechStore.");
    setTimeout(() => {
      router.push("/products");
    }, 1000);
  };

  const handleLoginSuccess = () => {
    setError("");
    toast.success("Đăng nhập thành công! Chào mừng bạn đến với TechStore.");
    setTimeout(() => {
      router.push("/products");
    }, 1000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="w-full">
      <Tabs fullWidth selectedKey={currentTab}>
        <Tab key="login" href="/auth?tab=login" title="Đăng nhập">
          <LoginForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onError={handleError}
            onSuccess={handleLoginSuccess}
          />
        </Tab>

        <Tab key="register" href="/auth?tab=register" title="Đăng ký">
          <RegisterForm
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onError={handleError}
            onSuccess={handleRegisterSuccess}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
