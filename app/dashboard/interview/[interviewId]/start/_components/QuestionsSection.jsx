"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
    console.log("🚀 ~ file: QuestionsSection.jsx:4 ~ QuestionsSection ~ mockInterviewQuestion:", mockInterviewQuestion);
    const [isPlaying, setIsPlaying] = useState(false);
    const [initialSoundPlayed, setInitialSoundPlayed] = useState({});

    const textToSpeachGoogle = async (text) => {
        // Đánh dấu đang phát âm thanh
        setIsPlaying(true);
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
            // Đặt sự kiện kết thúc phát âm thanh
            audio.onended = () => setIsPlaying(false);
            audio.play();
        } catch (error) {
            console.error("Lỗi khi chuyển văn bản thành giọng nói:", error);
            // Đánh dấu kết thúc phát âm thanh nếu có lỗi
            setIsPlaying(false);
        }
    };

    // Khi activeQuestionIndex thay đổi, đặt lại trạng thái cho câu hỏi mới
    useEffect(() => {
        if (mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex]) {
            // Nếu câu hỏi này chưa được đọc lần đầu
            if (!initialSoundPlayed[activeQuestionIndex]) {
                // Đọc câu hỏi
                if (activeQuestionIndex === 0) {
                    const welcomeMessage = `Chào mừng bạn đến với buổi luyện tập phỏng vấn hôm nay. Câu số 1: ${mockInterviewQuestion[activeQuestionIndex]?.question}`;
                    textToSpeachGoogle(welcomeMessage);
                } else {
                    const questionMessage = `Câu số ${activeQuestionIndex + 1}: ${mockInterviewQuestion[activeQuestionIndex]?.question}`;
                    textToSpeachGoogle(questionMessage);
                }
                // Đánh dấu câu hỏi này đã được đọc
                setInitialSoundPlayed(prev => ({
                    ...prev,
                    [activeQuestionIndex]: true
                }));
            }
        }
    }, [activeQuestionIndex, mockInterviewQuestion]);

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                    <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bg-blue-700 text-white'}`}>Question #{index + 1}</h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <Volume2 className='cursor-pointer' onClick={() => {
                // Chỉ phát âm thanh khi không có âm thanh đang phát
                if (!isPlaying) {
                    if (activeQuestionIndex === 0) {
                        const welcomeMessage = `Chào mừng bạn đến với buổi luyện tập phỏng vấn hôm nay. Câu số 1: ${mockInterviewQuestion[activeQuestionIndex]?.question}`;
                        textToSpeachGoogle(welcomeMessage);
                    } else {
                        const questionMessage = `Câu số ${activeQuestionIndex + 1}: ${mockInterviewQuestion[activeQuestionIndex]?.question}`;
                        textToSpeachGoogle(questionMessage);
                    }
                }
            }} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-primary'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <div className='text-sm text-primary space-y-2 mt-3'>
                    <ul className='list-disc pl-5 space-y-2'>
                        <li><strong>Bắt đầu:</strong> Bật Video Web Cam và Micrô để bắt đầu cuộc phỏng vấn giả do AI tạo ra</li>
                        <li><strong>Quy trình:</strong> Trả lời 5 câu hỏi chuyên môn theo thứ tự</li>
                        <li><strong>Kết quả:</strong> Nhận báo cáo chi tiết dựa trên câu trả lời của bạn sau khi hoàn thành</li>
                        <li><strong>Quyền riêng tư:</strong> Chúng tôi không ghi lại video của bạn, quyền truy cập Web cam có thể tắt bất cứ lúc nào</li>
                    </ul>
                    <div className="bg-yellow-200 p-3 rounded-md border border-yellow-400 mt-3">
                        <p className="font-bold flex items-center gap-2">
                            ⚠️ <span>Lưu ý quan trọng:</span>
                        </p>
                        <p className="mt-1">Nhận dạng giọng nói có thể sai lệch. Bạn hãy soát lại và sửa câu trả lời nhé!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionsSection;
