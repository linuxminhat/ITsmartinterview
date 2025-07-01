'use client'
import { useState } from 'react'
import {
  Users,
  Target,
  Award,
  Briefcase,
  BookOpen,
  Rocket
} from 'lucide-react'

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const tabContent = {
    mission: {
      icon: <Target className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-base md:text-lg">ITSmartMockInterview đang thực hiện sứ mệnh cách mạng hóa việc chuẩn bị phỏng vấn bằng cách cung cấp dịch vụ huấn luyện AI thông minh, được cá nhân hóa phù hợp với nguyện vọng nghề nghiệp của từng cá nhân.</p>
          <p className="text-base md:text-lg">Với ITSmartMockInterview, mục tiêu là thu hẹp khoảng cách giữa sự chuẩn bị và thành công, trao quyền cho người dùng để phát huy hết tiềm năng của họ.</p>
        </div>
      )
    },
    story: {
      icon: <BookOpen className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-base md:text-lg">Ý tưởng về ITSmartMockInterview xuất phát từ những trải nghiệm thực tế với những thách thức trong quá trình chuẩn bị phỏng vấn. Là một nhà phát triển đơn lẻ, tôi muốn tạo ra một nền tảng giúp đơn giản hóa quy trình và xây dựng sự tự tin ở mỗi cá nhân.</p>
          <p className="text-base md:text-lg">Hành trình này là minh chứng cho sức mạnh của niềm đam mê và sự đổi mới, dẫn đến việc tạo ra một công cụ có tác động to lớn cho sự phát triển nghề nghiệp.</p>
        </div>
      )
    },
    approach: {
      icon: <Rocket className="mr-2 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-base md:text-lg">ITSmartMockInterview tận dụng các thuật toán AI tiên tiến để tạo ra các câu hỏi phỏng vấn năng động, phù hợp với ngữ cảnh dựa trên nền tảng chuyên môn và mục tiêu của bạn.</p>
          <p className="text-base md:text-lg">Thông qua phân tích và phản hồi theo thời gian thực, nền tảng này cung cấp thông tin chi tiết có thể thực hiện được, cho phép người dùng cải thiện sau mỗi lần thử phỏng vấn thử.</p>
        </div>
      )
    }
  }

  const coreValues = [
    {
      icon: <Award className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Học tập liên tục",
      description: "Luôn nỗ lực cải thiện và cung cấp các công cụ tốt hơn cho sự phát triển."
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Sự trao quyền",
      description: "Hỗ trợ cá nhân xây dựng sự tự tin và đạt được thành công trong sự nghiệp."
    },
    {
      icon: <Briefcase className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Sự xuất sắc",
      description: "Cung cấp các tính năng chất lượng cao, có tác động mạnh mẽ để đơn giản hóa việc chuẩn bị phỏng vấn."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
            Giới thiệu về ITSmartMockInterview
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Trao cho ứng viên công nghệ sự tự tin vượt qua phỏng vấn với trợ lý AI thông minh và cá nhân hóa.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row border-b">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full sm:flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center 
                  ${activeTab === tab
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {tabContent[tab].icon}
                <span className="hidden sm:inline">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            {tabContent[activeTab].content}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12">
            Giá trị cốt lõi của chúng tôi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage