import React from 'react';
import { SignIn } from '@clerk/nextjs';

const backgroundImageUrl = 'https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left image + features panel */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <img
          src={backgroundImageUrl}
          alt="Interview setup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full p-12 space-y-6 text-white">
          <h2 className="text-4xl font-bold leading-tight">
            Đăng nhập để luyện phỏng vấn với AI và nhận phản hồi chuyên sâu tức thì
          </h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="w-6 flex-shrink-0 text-green-400">✔️</span>
              <span>Luyện tập với ngân hàng câu hỏi chuẩn hoá cho các vị trí IT</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 flex-shrink-0 text-green-400">✔️</span>
              <span>Nhận chấm điểm tự động và phản hồi từ trợ lý AI</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 flex-shrink-0 text-green-400">✔️</span>
              <span>Xem video ghi hình để tự đánh giá ngôn ngữ cơ thể và giọng nói</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 flex-shrink-0 text-green-400">✔️</span>
              <span>Theo dõi tiến trình, đặt mục tiêu & cải thiện kỹ năng sau từng buổi</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right sign-in panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">ITF Smart Interview</h1>
            <p className="text-gray-500">Đăng nhập vào tài khoản của bạn</p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}