"use client";
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp
} from "lucide-react";

import AddNewInterview from './_components/AddNewInterview'//modal popup create new interview
import InterviewList from './_components/InterviewList'//Displays a list of interviews that have taken place.

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-indigo-600" />,
      title: "Tổng số cuộc phỏng vấn",
      value: "0"
    },
    {
      icon: <Trophy size={32} className="text-green-600" />,
      title: "Điểm cao nhất",
      value: "N/A"
    },
    {
      icon: <TrendingUp size={32} className="text-blue-600" />,
      title: "Tỷ lệ cải thiện",
      value: "0%"
    }
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Không tìm thấy email người dùng");
      return;
    }

    try {
      const response = await fetch('/api/fetchUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể lấy dữ liệu phỏng vấn');
      }

      const data = await response.json();
      const userSpecificInterviews = data.userAnswers.filter(
        interview => interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);
      const totalInterviews = userSpecificInterviews.length;
      const bestScore = totalInterviews > 0
        ? Math.max(...userSpecificInterviews.map(item => parseInt(item.rating || '0')))
        : 0;
      const improvementRate = calculateImprovementRate(userSpecificInterviews);

      setStatsCards([
        {
          ...statsCards[0],
          value: totalInterviews.toString()
        },
        {
          ...statsCards[1],
          value: bestScore ? `${bestScore}/10` : 'N/A'
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%`
        }
      ]);

      if (totalInterviews > 0) {
        toast.success(`Đã tải ${totalInterviews} phỏng vấn(s)`);
      }

    } catch (error) {
      console.error('Lỗi khi tải phỏng vấn:', error);
      toast.error(error.message || 'Không thể lấy được cuộc phỏng vấn');
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;

    const scores = interviews
      .map(interview => parseInt(interview.rating || '0'))
      .sort((a, b) => a - b);

    const improvement = ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* User Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Bot className="text-indigo-600" size={32} />
            Bảng điều khiển
          </h2>
          <h3 className="text-lg sm:text-xl text-gray-600 mt-2">
            Chào mừng, {user?.firstName || 'Interviewer'}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm sm:text-base">
            {user?.primaryEmailAddress?.emailAddress || 'Not logged in'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
          >
            {card.icon}
            <div className="ml-4">
              <p className="text-xs sm:text-sm text-gray-500">{card.title}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Section */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
            <Zap size={24} className="text-yellow-500" />
            Tạo cuộc phỏng vấn giả lập AI
          </h2>
          <button
            onClick={() => setIsNewInterviewModalOpen(true)}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Phỏng vấn mới
          </button>
        </div>

        {/* Add New Interview Component */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <AddNewInterview
            isOpen={isNewInterviewModalOpen}
            onClose={() => setIsNewInterviewModalOpen(false)}
          />
        </div>
      </div>

      {/* Interview History */}
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Lịch sử phỏng vấn
        </h2>
        <InterviewList interviews={interviewData} />
      </div>
    </div>
  );
}

export default Dashboard;