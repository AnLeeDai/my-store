import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import NextLink from "next/link";

import AuthTabs from "@/components/auth/auth-tabs";

interface AuthPageProps {
  searchParams: Promise<{
    tab?: "login" | "register";
  }>;
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const defaultTab = params.tab || "login";

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center pb-2">
          <div className="w-full">
            <NextLink href="/">
              <Button color="primary" size="sm" variant="light">
                ← Về trang chủ
              </Button>
            </NextLink>
          </div>
        </CardHeader>
        <CardHeader className="text-center pt-0">
          <div className="w-full">
            <h1 className="text-2xl font-bold">Chào mừng quay lại</h1>
            <p className="text-small text-default-500">
              Đăng nhập vào tài khoản của bạn hoặc tạo tài khoản mới
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <AuthTabs defaultTab={defaultTab} />
        </CardBody>
      </Card>

      <div className="text-center mt-4">
        <p className="text-small text-default-500">
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <Link color="primary" href="/terms" size="sm">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link color="primary" href="/privacy" size="sm">
            Chính sách bảo mật
          </Link>
        </p>
      </div>
    </div>
  );
}
