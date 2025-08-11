"use client";

import AuthTabs from "./auth-tabs";

interface AuthContainerProps {
  defaultTab?: "login" | "register";
}

export default function AuthContainer({
  defaultTab = "login",
}: AuthContainerProps) {
  return (
    <div className="w-full">
      <AuthTabs defaultTab={defaultTab} />
    </div>
  );
}
