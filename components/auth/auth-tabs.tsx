'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs, Tab } from '@heroui/tabs'
import { Card, CardBody } from '@heroui/card'
import { useToast } from '@/lib/use-toast'
import LoginForm from './login-form'
import RegisterForm from './register-form'

interface AuthTabsProps {
  defaultTab?: 'login' | 'register'
}

export default function AuthTabs({ defaultTab = 'login' }: AuthTabsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const toast = useToast()
  
  // Lấy tab hiện tại từ URL
  const currentTab = searchParams.get('tab') || defaultTab

  const handleRegisterSuccess = () => {
    setError('')
    toast.success('Đăng ký thành công! Chào mừng bạn đến với TechStore.')
    setTimeout(() => {
      router.push('/products')
    }, 1000)
  }

  const handleLoginSuccess = () => {
    setError('')
    toast.success('Đăng nhập thành công! Chào mừng bạn đến với TechStore.')
    setTimeout(() => {
      router.push('/products')
    }, 1000)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="w-full">
      <Tabs 
        selectedKey={currentTab}
        fullWidth
      >
        <Tab key="login" title="Đăng nhập" href="/auth?tab=login">
          <LoginForm 
            onSuccess={handleLoginSuccess}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Tab>
        
        <Tab key="register" title="Đăng ký" href="/auth?tab=register">
          <RegisterForm 
            onSuccess={handleRegisterSuccess}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Tab>
      </Tabs>
    </div>
  )
}
