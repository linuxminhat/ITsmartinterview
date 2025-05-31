import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onDelete = async () => {
    try {
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview?.mockId));

      // Close dialog and show success toast
      setIsDialogOpen(false);
      toast.success("Đã xóa cuộc phỏng vấn thành công");

      // Use router to refresh instead of full page reload
      router.refresh();
    } catch (error) {
      console.error("Lỗi khi xóa cuộc phỏng vấn:", error);
      toast.error("Không xóa được cuộc phỏng vấn");
    }
  };

  return (
    <div className="relative border shadow-sm rounded-sm p-3">
      {/* Delete button in the top-right corner */}
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 flex items-center justify-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="text-red-600" />
      </Button>

      {/* Card Content */}
      <div>
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-500">Kinh nghiệm: {interview?.jobExperience} Year(s)</h2>
        <h2 className="text-sm text-gray-500">Được tạo ra tại: {interview?.createdAt}</h2>
      </div>

      <div className="flex justify-between gap-5 mt-2">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
          Nhận xét
        </Button>
        <Button className="w-full" size="sm" onClick={onStart}>
          Bắt đầu
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
            <p className="mb-4">Bạn có chắc chắn muốn xóa cuộc phỏng vấn này không?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy bỏ
              </Button>
              <Button
                variant="destructive"
                onClick={onDelete}
              >
                Xác nhận xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewItemCard;