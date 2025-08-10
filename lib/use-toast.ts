'use client'

import { addToast } from '@heroui/toast'

export const useToast = () => {
  const showSuccess = (message: string) => {
    addToast({
      title: 'Thành công',
      description: message,
      color: 'success',
      variant: 'flat',
    })
  }

  const showError = (message: string) => {
    addToast({
      title: 'Lỗi',
      description: message,
      color: 'danger',
      variant: 'flat',
    })
  }

  const showInfo = (message: string) => {
    addToast({
      title: 'Thông báo',
      description: message,
      color: 'primary',
      variant: 'flat',
    })
  }

  const showWarning = (message: string) => {
    addToast({
      title: 'Cảnh báo',
      description: message,
      color: 'warning',
      variant: 'flat',
    })
  }

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
  }
}
