"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  //Interview data fetch function
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Không tìm thấy chi tiết phỏng vấn");
      }
    } catch (error) {
      toast.error("Lỗi khi tải thông tin chi tiết phỏng vấn");
      console.error("Đang kiểm tra chi tiết lỗi khi tạo phỏng vấn:", error);
    }
  };

  const handleWebcamToggle = () => {
    if (!webCamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          setWebCamEnabled(true);
          toast.success("Webcam và micrô được bật");
        })
        .catch((error) => {
          toast.error("Không thể truy cập webcam hoặc micrô");
          console.error("Lỗi truy cập webcam:", error);
        });
    } else {
      setWebCamEnabled(false);
    }
  };

  if (!interviewData) {
    return <div>Đang tải thông tin chi tiết phỏng vấn...</div>;
  }

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Chúng ta hãy bắt đầu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Chức vụ/Vị trí công việc: </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Mô tả công việc/Công nghệ: </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Số năm kinh nghiệm:</strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <span>Thông tin</span>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Bật Video Web Cam và Micrô để Bắt đầu Cuộc phỏng vấn giả do AI tạo ra.
              Có 5 câu hỏi mà bạn có thể trả lời và sẽ cung cấp báo cáo dựa trên câu trả lời của bạn.
              LƯU Ý: Chúng tôi không bao giờ ghi lại video của bạn. Có thể tắt quyền truy cập Web cam bất cứ lúc nào.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              style={{ height: 300, width: "auto" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => {
                toast.error("Lỗi truy cập webcam");
                setWebCamEnabled(false);
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 bg-secondary" />
              <Button
                className="w-full"
                variant="ghost"
                onClick={handleWebcamToggle}
              >
                Bật Web Cam và Micrô
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Bắt đầu phỏng vấn</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;