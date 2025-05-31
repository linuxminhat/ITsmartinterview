"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Không thể lấy thông tin chi tiết phỏng vấn:", error);
      // Optionally add error toast or error state handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    // Chỉ chuyển câu hỏi sau một khoảng thời gian để tránh phát âm thanh đồng thời
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      // Đợi 3 giây để âm thanh "Cảm ơn bạn..." phát xong
      setTimeout(() => {
        setActiveQuestionIndex(prev => prev + 1);
      }, 3000);
    }
  };

  // Hàm để đọc thông báo kết thúc phỏng vấn
  const textToSpeachGoogle = async (text) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY;
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const requestData = {
      input: {
        text: text
      },
      voice: {
        languageCode: 'vi-VN',
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3'
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      const audioContent = data.audioContent;

      const audio = new Audio('data:audio/mp3;base64,' + audioContent);
      return audio.play();
    } catch (error) {
      console.error("Lỗi khi chuyển văn bản thành giọng nói:", error);
    }
  };

  // Hàm xử lý kết thúc phỏng vấn
  const handleEndInterview = () => {
    const completionMessage = "Cảm ơn bạn đã thực hiện xong buổi phỏng vấn hôm nay";
    return textToSpeachGoogle(completionMessage);
  };

  // Đảm bảo không có âm thanh bị chồng lên nhau khi chuyển câu hỏi
  const handleNextQuestion = () => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  }

  const handlePreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Đang tải thông tin chi tiết phỏng vấn...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Không tìm thấy câu hỏi phỏng vấn nào.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* video or audio recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
          onAnswerSave={handleAnswerSave}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={handlePreviousQuestion}>
            Câu hỏi trước
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={handleNextQuestion}>
            Câu hỏi tiếp theo
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/' + interViewData?.mockId + '/feedback'}>
            <Button onClick={handleEndInterview}>Kết thúc phỏng vấn</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;