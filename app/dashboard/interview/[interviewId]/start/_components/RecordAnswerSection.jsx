"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff, Globe } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";


// Danh sách các thuật ngữ IT tiếng Anh phổ biến và cách chúng có thể bị nhận diện sai
const itTermsCorrections = {
  // Công nghệ & Ngôn ngữ lập trình
  "java": ["gia va", "da va", "giá va", "java"],
  "javascript": ["giá va script", "gia va script", "giá vác cờ rít", "giá va cờ rít", "javascript"],
  "python": ["pai thon", "pie thon", "py thon", "python"],
  "react": ["rê ác", "rê act", "ri ác", "ri act", "react"],
  "angular": ["an giu lơ", "an giu la", "angular"],
  "vue": ["viu", "vui", "vue"],
  "node": ["nốt", "nâu", "node"],
  "express": ["éc xờ pres", "ếch pờ rét", "express"],
  "mongodb": ["mông gô đê bê", "mông gô đi bi", "mongodb"],
  "sql": ["ét quy eo", "ét quy el", "sql"],
  "nosql": ["nô ét quy el", "nô ét quy eo", "nosql"],
  "api": ["ê pi ai", "a pi ai", "api"],
  "html": ["hờ tê em eo", "hờ tê em el", "html"],
  "css": ["cờ ét ét", "xi ét ét", "css"],
  "php": ["pê hát pê", "pi hát pi", "php"],
  "ruby": ["ru bi", "ru by", "ruby"],
  "framework": ["phờ rem vớc", "phơ rem vớc", "framework"],
  "library": ["lai bờ ra ri", "li bờ ra ri", "library"],

  // Các khái niệm phát triển phần mềm
  "frontend": ["phờ rôn én", "front end", "phờ rân én", "frontend"],
  "backend": ["béc en", "back end", "béc én", "backend"],
  "fullstack": ["phun sờ tắc", "full stack", "phun tắc", "fullstack"],
  "database": ["đa tà bết", "đề ta bết", "database"],
  "server": ["sơ vơ", "sờ vờ", "server"],
  "client": ["cờ lai ần", "cờ lai ăn", "client"],
  "bug": ["bắc", "búc", "bug"],
  "debug": ["đi bắc", "đi búc", "debug"],
  "algorithm": ["an gô rít", "al gô rít", "algorithm"],
  "repository": ["rê pô si tô ri", "rề pô di tô ri", "repository"],
  "commit": ["cơ mít", "cò mít", "commit"],
  "git": ["ghít", "gít", "git"],
  "github": ["ghít hấp", "gít háp", "github"],
  "agile": ["ê giồ", "a giain", "agile"],
  "scrum": ["cờ ram", "xì cờ ram", "scrum"],
  "sprint": ["xì prin", "sì print", "sprint"],
  "devops": ["đê vốp", "đi vốp", "devops"],

  // Công ty và nền tảng
  "google": ["gúc gồ", "gu gồ", "gồ gồ", "google"],
  "microsoft": ["mai cờ rô sốp", "mai cờ rô sốt", "microsoft"],
  "amazon": ["a ma dòn", "a mê dòn", "amazon"],
  "facebook": ["phây búc", "phết bút", "facebook"],
  "apple": ["áp pồ", "ép pồ", "apple"],
  "netflix": ["nét phờ lích", "nét phờ lich", "netflix"],

  // Thuật ngữ phổ biến khác
  "software": ["xốp vơ", "sốp vơ", "software"],
  "hardware": ["hát vơ", "hạt vơ", "hardware"],
  "engineer": ["en gi ni ơ", "in gi ni ơ", "engineer"],
  "software engineer": ["xốp vơ en gi ni ơ", "sốp vơ in gi ni ơ", "software engineer"],
  "cloud": ["cờ lao", "cờ lau", "cloud"],
  "security": ["sê quy ri ti", "sê cuộc ri ti", "security"],
  "data": ["đa ta", "đa tà", "data"],
  "machine learning": ["mờ sin lơ ninh", "mà sin lơ ning", "máy sin lơ ning", "machine learning"],
  "artificial intelligence": ["a ti phi si ồ in tê li gien", "ạc ti phi si ồ in tê li giăn", "artificial intelligence"],
  "ai": ["ê ai", "ai"],
  "blockchain": ["blốc chên", "block chên", "blockchain"],
  "hosting": ["hốt tinh", "hót ting", "hosting"],
  "domain": ["đô men", "dô men", "domain"],
  "bottleneck": ["bót tờ nét", "bốt tồ nét", "bottleneck"],
  "architecture": ["a ki téc chơ", "ac ki téc chờ", "architecture"],
  "kubernetes": ["cu bơ nét", "ku bơ nét", "kubernetes"],
  "docker": ["đốc cơ", "đóc cơ", "docker"],
  "code": ["cốt", "cót", "code"],
  "coding": ["cốt đing", "cô đing", "coding"],
  "programmer": ["prô gram mơ", "pro gram mơ", "programmer"],
  "developer": ["đê vê lốp pơ", "đi vê lốp pơ", "developer"],
  "interface": ["in tơ phết", "in tơ phết", "interface"],
  "function": ["phắc sừn", "phắng sừn", "function"],
  "object": ["ốp giét", "óp giết", "object"],
  "class": ["cờ lát", "cờ las", "class"],
  "method": ["mê thốt", "mê thót", "method"],
  "variable": ["vê ri ê bồ", "va ri ê bồ", "variable"],
  "constant": ["con xờ tần", "con tần", "constant"],
  "loop": ["lúp", "lụp", "loop"],
  "array": ["ơ rây", "a ray", "array"],
  "string": ["xờ trích", "sờ trích", "string"],
  "integer": ["in tơ giơ", "in tê giơ", "integer"],
  "boolean": ["bu lên", "bu li en", "boolean"],
  "tech": ["téc", "tét", "tech"],
  "technology": ["téc nô lô gi", "tét nô lô gi", "technology"]
};

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("vi-VN"); // Default language is Vietnamese


  const [stream, setStream] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);


  useEffect(() => {
    if (webcamEnabled && stream && webcamRef.current) {
      webcamRef.current.srcObject = stream;
      // một số browser yêu cầu gọi play() thủ công
      webcamRef.current.play().catch(() => { });
    }
  }, [webcamEnabled, stream]);


  // Speech recognition khởi tạo lại khi ngôn ngữ thay đổi
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // Dừng recognition hiện tại nếu đang chạy
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language; // Sử dụng ngôn ngữ từ state

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          }
        }
        if (finalTranscript.trim()) {
          // Xử lý văn bản trước khi thêm vào câu trả lời
          const processedText = processITTerms(finalTranscript);
          setUserAnswer((prev) => (prev + " " + processedText).trim());
        }
      };

      recognition.onerror = (event) => {
        toast.error(`Lỗi nhận diện giọng nói: ${event.error}`);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);
    }
  }, [language]); // Chạy lại khi ngôn ngữ thay đổi


  // Hàm chuyển đổi ngôn ngữ
  const toggleLanguage = () => {
    // Nếu đang ghi âm, dừng lại trước khi đổi ngôn ngữ
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    // Chuyển đổi giữa tiếng Việt và tiếng Anh
    if (language === "vi-VN") {
      setLanguage("en-US");
      toast.success("Đã chuyển sang nhận diện tiếng Anh");
    } else {
      setLanguage("vi-VN");
      toast.success("Đã chuyển sang nhận diện tiếng Việt");
    }
  };


  const EnableWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setWebcamEnabled(true);
      toast.success("Webcam đã được bật thành công");
    } catch (error) {
      toast.error("Không bật được webcam", {
        description: "Vui lòng kiểm tra quyền sử dụng máy ảnh của bạn",
      });
      console.error("Lỗi webcam:", error);
    }
  };

  const DisableWebcam = () => {
    // stop all track
    stream?.getTracks().forEach((t) => t.stop());
    setWebcamEnabled(false);
    setStream(null);
  };

  const StartStopRecording = () => {

    if (!recognitionRef.current) {
      toast.error("Không hỗ trợ chuyển giọng nói thành văn bản");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      toast.info("Đã dừng ghi âm");
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info(`Bắt đầu ghi âm (${language === "vi-VN" ? "Tiếng Việt" : "Tiếng Anh"})`);
    }
  };

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
      // Thêm sự kiện để biết khi nào âm thanh phát xong
      audio.onended = () => setIsPlaying(false);
      await audio.play();
      return new Promise((resolve) => {
        audio.onended = () => {
          setIsPlaying(false);
          resolve();
        };
      });
    } catch (error) {
      console.error("Lỗi khi chuyển văn bản thành giọng nói:", error);
      setIsPlaying(false);
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error("Xin vui lòng cung cấp một câu trả lời");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `Câu hỏi: ${mockInterviewQuestion[activeQuestionIndex]?.question}, Câu trả lời của người dùng: ${userAnswer}. Vui lòng đánh giá theo thang điểm 10 và phản hồi về cải tiến trong định dạng JSON { "rating": <number>, "feedback": <text> }`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '').trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);

      const answerRecord = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      // Phát âm thanh cảm ơn và đảm bảo đợi phát xong
      const thankMessage = `Cảm ơn bạn. Bạn vừa hoàn thành câu hỏi số ${activeQuestionIndex + 1}`;
      await textToSpeachGoogle(thankMessage);

      // Sau khi phát xong âm thanh cảm ơn mới gọi onAnswerSave
      onAnswerSave?.(answerRecord);

      toast.success("Câu trả lời đã được ghi lại thành công");

      setUserAnswer("");
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (error) {
      toast.error("Không lưu được câu trả lời", {
        description: error.message
      });
      console.error("Lỗi xảy ra khi lưu câu trả lời", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm hậu xử lý để cải thiện nhận dạng thuật ngữ IT
  const processITTerms = (text) => {
    // Chuyển văn bản về chữ thường để dễ so sánh
    let processedText = text.toLowerCase();

    // Tìm và thay thế các thuật ngữ IT
    Object.entries(itTermsCorrections).forEach(([correctTerm, incorrectVariants]) => {
      incorrectVariants.forEach(variant => {
        // Tạo regex để có thể phát hiện thuật ngữ với ranh giới từ
        const regex = new RegExp(`\\b${variant.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
        processedText = processedText.replace(regex, correctTerm);
      });
    });

    return processedText;
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-white mb-4" />
          <p className="text-white text-lg">Đang lưu câu trả lời của bạn...</p>
        </div>
      )}
      <div className="flex flex-col my-10 justify-center items-center bg-black rounded-lg p-8">
        {webcamEnabled ? (
          <video
            ref={webcamRef}
            autoPlay
            muted
            playsInline
            className="w-[400px] h-[400px] object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-[400px] h-[400px] flex justify-center items-center bg-gray-200 rounded-lg shadow-lg">
            <p className="text-gray-500 text-lg">Webcam bị vô hiệu hóa</p>
          </div>
        )}

        <Button
          variant="outline"
          className="mt-6"
          onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
        >
          {webcamEnabled ? (
            <>
              <CameraOff className="mr-2 h-5 w-5" /> Tắt Webcam
            </>
          ) : (
            <>
              <Camera className="mr-2 h-5 w-5" /> Bật Webcam
            </>
          )}
        </Button>
      </div>

      <div className="flex gap-4 mt-2">
        <Button
          disabled={loading}
          variant="outline"
          className="my-2"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-600 items-center animate-pulse flex gap-2">
              <StopCircle /> Dừng ghi âm
            </h2>
          ) : (
            <h2 className="text-primary flex gap-2 items-center">
              <Mic /> Ghi lại câu trả lời
            </h2>
          )}
        </Button>

        <Button
          variant="outline"
          className="my-2"
          onClick={toggleLanguage}
        >
          <Globe className="mr-2 h-4 w-4" />
          {language === "vi-VN" ? "Tiếng Việt" : "English"}
        </Button>
      </div>

      <textarea
        className="w-full h-40 p-4 mt-4 border rounded-md text-gray-800 text-base"
        placeholder="Phần mềm thu âm giọng nói có thể nhầm lẫn. Vui lòng gõ lại để chỉnh sửa câu trả lời"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <Button
        className="mt-4"
        onClick={UpdateUserAnswer}
        disabled={loading || !userAnswer.trim()}
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Lưu...</>
        ) : (
          "Save Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
