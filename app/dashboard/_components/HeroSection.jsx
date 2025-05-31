'use client'

import { useState } from 'react'

export default function HeroSection() {
  return (
    <div
      className="min-h-screen relative flex items-center"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/interviewAIthumbnail.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="relative z-10 px-6 pt-14 lg:px-8 w-full">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white bg-gray-900/70 ring-1 ring-gray-100/20 hover:ring-gray-100/40">
              Hướng dẫn dịch vụ ITF Smart Interview .{' '}
              <a href="/how-it-works" className="font-semibold text-indigo-300">
                <span aria-hidden="true" className="absolute inset-0" />
                Đọc thêm <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-gray-900/50 p-4 rounded-lg inline-block">
              Trợ lý luyện phỏng vấn AI dành riêng cho bạn
            </h1>
            <p className="mt-6 text-lg leading-8 text-white sm:text-xl bg-gray-900/50 p-3 rounded-lg inline-block">
              Tăng gấp đôi cơ hội trúng tuyển với công cụ luyện phỏng vấn AI của chúng tôi
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Bắt đầu
              </a>
              <a
                href="/dashboard"
                className="text-sm font-semibold leading-6 text-white hover:text-indigo-300 bg-gray-900/50 px-3 py-2 rounded"
              >
                Tìm hiểu thêm <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}