"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession, startInteractiveInterview } from "@/utils/GeminiAIModal";
import { LoaderCircle, Sparkles } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Job Role Suggestions
const JOB_ROLE_SUGGESTIONS = [
  'Lập trình viên Fullstack',
  'Lập trình viên Frontend',
  'Lập trình viên Backend',
  'Lập trình viên .NET',
  'Lập trình viên Java core',
  'Lập trình viên Python',
  'Lập trình viên PHP',
  'Kĩ sư phần mềm',
  'Kĩ sư DevOps',
  'Kĩ sư Data',
  'Kĩ sư Machine Learning',
  'Kĩ sư Cloud',
  'Kĩ sư Mobile',
  'Nhà thiết kế UI/UX',
  'Nhập môn lập trình',
  'Phỏng vấn Java FPT'
];

// Tech Stack Suggestions
const TECH_STACK_SUGGESTIONS = {
  'Lập trình viên Fullstack ': 'HTML5 / CSS3 / JavaScript (ES6+), Front-end framework / library (React, Vue hoặc Angular), Back-end runtime & framework (Node.js + Express/NestJS), Cơ sở dữ liệu & ORM (PostgreSQL hoặc MongoDB + Prisma/TypeORM), Version Control & DevOps (Git, Docker, CI/CD trên AWS/Azure/GCP)',
  'Lập trình viên Frontend': 'HTML5 / CSS3 / JavaScript (ES6+), Frontend Framework/Library (React.js / Vue.js / Angular), CSS-in-JS hoặc CSS Frameworks (Tailwind CSS, SCSS, Styled-components), State Management (Redux, Zustand, Vuex, Context API), Tooling & Build Tools (Vite / Webpack / Babel / ESLint / Prettier)',
  'Lập trình viên Backend': 'Hỏi về concept ngôn ngữ lập trình backend (không sâu ngôn ngữ), Hỏi về concept Cơ sở dữ liệu (Database), hỏi về concept API Design & Communication, hỏi về concept DevOps cơ bản & Deployment, hỏi về concept ',
  'Lập trình viên .NET': 'C#, .NET, ASP.NET, Entity Framework, LINQ, ASP.NET MVC, ASP.NET Web API, ASP.NET Core, SQL Server, MySQL, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, Azure, AWS, GCP',
  'Lập trình viên Java core': 'Java, Spring, Hibernate, JPA, JDBC, JSP, Servlet, JSTL, JUnit, Mockito, Maven, Gradle, Git, Docker, Kubernetes, AWS, Azure, GCP',
  'Lập trình viên Python': 'Python, Django, Flask, FastAPI, SQLAlchemy, Pandas, NumPy, Scikit-learn, Keras, TensorFlow, PyTorch, Docker, Kubernetes, AWS, Azure, GCP',
  'Lập trình viên PHP': 'PHP, Laravel, CodeIgniter, Symfony, Yii, CakePHP, Zend, Composer, Git, Docker, Kubernetes, AWS, Azure, GCP',
  'Kĩ sư phần mềm': 'Hỏi về concept ngôn ngữ lập trình (không sâu ngôn ngữ), Hỏi về concept OOP, Hỏi về concept Design Pattern, Hỏi về concept Database, Hỏi về concept API Design & Communication, Hỏi về concept DevOps cơ bản & Deployment',
  'Kĩ sư DevOps': 'Docker, Kubernetes, Jenkins, AWS, Azure, GCP, Terraform, Ansible, Puppet, Chef, Shell Scripting, CI/CD, Git, GitLab, GitHub, GitLab CI/CD, GitLab CI/CD Pipeline, GitLab CI/CD Jobs, GitLab CI/CD Triggers, GitLab CI/CD Variables, GitLab CI/CD Jobs, GitLab CI/CD Triggers, GitLab CI/CD Variables',
  'Kĩ sư Data': 'Hỏi về concept Database, Hỏi về concept API Design & Communication, Hỏi về concept DevOps cơ bản & Deployment',
  'Kĩ sư Machine Learning': 'Hỏi về concept ngôn ngữ lập trình (không sâu ngôn ngữ), Hỏi về concept OOP, Hỏi về concept Design Pattern, Hỏi về concept Database, Hỏi về concept API Design & Communication, Hỏi về concept DevOps cơ bản & Deployment',
  'Kĩ sư Cloud': 'AWS, Azure, GCP, Terraform, Kubernetes',
  'Kĩ sư Mobile': 'React Native, Flutter, Swift, Kotlin',
  'Nhà thiết kế UI/UX': 'Figma, Sketch, Adobe XD, InVision',
  'Nhập môn lập trình': 'Hỏi cơ bản về biến, vòng lặp, mảng ',
  'Phỏng vấn Java FPT': 'Java, OOP, Các khái niệm cơ bản của Java, Cấu trúc dữ liệu, Spring Framework, và kiến thức cốt lõi của Java'
};

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Auto-suggest tech stack based on job role
  const autoSuggestTechStack = (role) => {
    const suggestion = TECH_STACK_SUGGESTIONS[role];
    if (suggestion) {
      setJobDescription(suggestion);
      toast.info(`Auto-filled tech stack for ${role}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Xử lý đặc biệt cho Phỏng vấn Java FPT
    if (jobPosition === "Phỏng vấn Java FPT") {
      try {
        // Tạo 5 câu hỏi cố định cho Phỏng vấn Java FPT
        const javaFPTQuestions = [
          {
            "difficulty": 1,
            "question": "Giải thích lập trình hướng đối tượng (OOP) và các nguyên tắc cơ bản."
          },
          {
            "difficulty": 2,
            "question": "Các lớp wrapper trong Java là gì?"
          },
          {
            "difficulty": 3,
            "question": "Từ khóa \"static\" trong Java?"
          },
          {
            "difficulty": 4,
            "question": "Tại sao không sử dụng con trỏ trong Java?"
          },
          {
            "difficulty": 5,
            "question": "Java có hỗ trợ đa kế thừa (multiple inheritance) không? Nếu không, tại sao?"
          }
        ];

        // Lưu vào database
        const res = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(javaFPTQuestions),
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          }).returning({ mockId: MockInterview.mockId });

        toast.success('Các câu hỏi phỏng vấn Java FPT đã được tạo!');
        router.push(`dashboard/interview/${res[0]?.mockId}`);

      } catch (error) {
        console.error("Lỗi khi tạo phỏng vấn Java FPT:", error);
        toast.error('Không tạo được câu hỏi phỏng vấn.');
      } finally {
        setLoading(false);
      }
      return;
    }

    const inputPrompt = `
Vị trí công việc: ${jobPosition}
Mô tả công việc chi tiết: ${jobDescription}
Số năm kinh nghiệm ứng viên: ${jobExperience}

Tôi cần **5 câu hỏi phỏng vấn kỹ thuật chuyên sâu**, với độ khó tăng dần **nhưng TẤT CẢ phải phù hợp với số năm kinh nghiệm ở trên**.

### Quy tắc kinh nghiệm
- **< 1 năm** → kiểm tra kiến thức rất cơ bản (syntax, CSDL đơn giản, khái niệm OOP…).
- **2–3 năm** → kiểm tra kinh nghiệm dự án vừa, debug, best-practice, tối ưu nhỏ.
- **4–5 năm** → tập trung thiết kế hệ thống, hiệu năng, refactor, review code.
- **> 5 năm** → kiến trúc, scalability, chiến lược bảo trì, quyết định công nghệ.

👉 Nếu ứng viên nằm trong dải **n** năm, hãy viết 5 câu hỏi có độ khó ★1 → ★5, **đều nằm trong chính dải đó**  
(ví dụ ứng viên 2 năm → cả 5 câu hỏi ở mức 2–3 năm, từ cơ bản → nâng cao).

### Định dạng trả về *(chỉ JSON, không giải thích)*
[
  { "difficulty": 1, "question": "..." },
  { "difficulty": 2, "question": "..." },
  { "difficulty": 3, "question": "..." },
  { "difficulty": 4, "question": "..." },
  { "difficulty": 5, "question": "..." }
]
`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();

      const cleanedResponse = responseText.replace(/```json\n?|```/g, '').trim();

      const mockResponse = JSON.parse(cleanedResponse);

      const res = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });

      toast.success('Các câu hỏi phỏng vấn đã được tạo thành công!');
      router.push(`dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Lỗi khi tạo phỏng vấn:", error);
      toast.error('Không tạo được câu hỏi phỏng vấn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Thêm mới</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Chuẩn bị cho buổi phỏng vấn của bạn
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <div className="mt-7 my-3">
                  <label>Chức vụ/Vị trí công việc</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      value={jobPosition}
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      list="jobRoles"
                    />
                    <datalist id="jobRoles">
                      {JOB_ROLE_SUGGESTIONS.map(role => (
                        <option key={role} value={role} />
                      ))}
                    </datalist>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => autoSuggestTechStack(jobPosition)}
                      disabled={!jobPosition}
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="my-3">
                  <label>Mô tả công việc/Công nghệ sử dụng</label>
                  <Textarea
                    placeholder="Ví dụ  :  React, Angular, NodeJs, MySql etc"
                    value={jobDescription}
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Số năm kinh nghiệm</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="70"
                    value={jobExperience}
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Hủy bỏ
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" /> Tạo ra
                    </>
                  ) : (
                    'Bắt đầu phỏng vấn'
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;