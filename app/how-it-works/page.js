"use client";

import React from "react";
import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={48} className="text-indigo-600" />,
      title: "Đăng ký hoặc Đăng nhập",
      description: "Tạo tài khoản hoặc đăng nhập bằng Clerk. Xây dựng hồ sơ cá nhân theo dõi hành trình phỏng vấn của bạn và lưu trữ sở thích."
    },
    {
      icon: <Settings size={48} className="text-indigo-600" />,
      title: "Chọn loại phỏng vấn của bạn",
      description: "Chọn từ các cuộc phỏng vấn kỹ thuật, hành vi hoặc hỗn hợp. Tùy chỉnh độ khó, chủ đề và thời lượng để phù hợp với mục tiêu nghề nghiệp của bạn."
    },
    {
      icon: <Play size={48} className="text-indigo-600" />,
      title: "Bắt đầu cuộc phỏng vấn giả",
      description: "AI của chúng tôi tạo ra các câu hỏi năng động, có liên quan theo ngữ cảnh được hỗ trợ bởi Gemini. Từng câu hỏi một giúp bạn tập trung và tham gia."
    },
    {
      icon: <Send size={48} className="text-indigo-600" />,
      title: "Gửi câu trả lời của bạn",
      description: "Trả lời qua tin nhắn hoặc các tùy chọn trắc nghiệm. Giao diện trực quan của chúng tôi theo dõi phản hồi của bạn và mang lại trải nghiệm liền mạch."
    },
    {
      icon: <ChartBar size={48} className="text-indigo-600" />,
      title: "Nhận phản hồi thời gian thực",
      description: "Nhận ngay phân tích phản hồi của bạn được hỗ trợ bởi AI. Hiểu được điểm mạnh, lĩnh vực cần cải thiện và nhận điểm chi tiết."
    },
    {
      icon: <Repeat size={48} className="text-indigo-600" />,
      title: "Tiếp tục thực hành",
      description: "Truy cập lịch sử phỏng vấn, theo dõi tiến độ và tiếp tục cải thiện kỹ năng của bạn với các buổi phỏng vấn thử không giới hạn và các thử thách thích ứng."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <Bot className="inline-block mr-3 text-indigo-600" size={48} />
          ITSmartMockInterview: Người bạn đồng hành chuẩn bị phỏng vấn của bạn
        </h1>
        <p className="text-xl text-gray-600">
          Làm chủ các cuộc phỏng vấn của bạn với thực hành hỗ trợ bởi AI và thông tin chi tiết được cá nhân hóa
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              {step.icon}
              <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                Bước {index + 1}: {step.title}
              </h2>
            </div>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/dashboard"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition-colors"
        >
          Bắt đầu hành trình phỏng vấn của bạn
        </a>
      </div>
    </div>
  );
};

export default HowItWorksPage;