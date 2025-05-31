'use client'
import { useState } from 'react'
import {
  Book,
  Code,
  PenTool,
  Target,
  FileText,
  Globe,
  Award,
  Brain,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import HeroSection from './dashboard/_components/HeroSection'

const ResourceCard = ({ icon, title, description, links }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4 flex-grow">{description}</p>
    <div className="space-y-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          {link.logo && <img src={link.logo} alt={`${link.name} logo`} className="w-6 h-6 mr-2 object-contain" />}
          {link.name}
          <ArrowRight
            className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </a>
      ))}
    </div>
  </div>
)

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('tech')

  const resourceCategories = {
    tech: {
      icon: <Code className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Các nền tảng thực hành mã hóa phổ biến",
          description: "Các nền tảng thực hành mã hóa và giải quyết vấn đề thuật toán nổi tiếng khác",
          icon: <Code className="w-8 h-8 text-indigo-600" />,
          links: [
            {
              name: "GeeksforGeeks",
              url: "https://www.geeksforgeeks.org/",
              logo: "https://media.geeksforgeeks.org/gfg-gg-logo.svg"
            },
            {
              name: "LeetCode",
              url: "https://leetcode.com/",
              logo: "https://leetcode.com/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png"
            },
            {
              name: "HackerRank",
              url: "https://www.hackerrank.com/",
              logo: "https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png"
            },
            {
              name: "CodeChef",
              url: "https://www.codechef.com/",
              logo: "https://cdn.codechef.com/images/cc-logo.svg"
            }
          ]
        },
        {
          title: "Các nền tảng luyện phỏng vấn chuyên sâu phổ biến",
          description: "Các nền tảng chuẩn bị phỏng vấn với các bài tập thiết kế và kỹ thuật chuyên sâu",
          icon: <Target className="w-8 h-8 text-indigo-600" />,
          links: [
            {
              name: "InterviewBit",
              url: "https://www.interviewbit.com/",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBKE9Z-CKUHmJH_lDCq4rdrLZnGh_k4PR04rZ&s=0"
            },
            {
              name: "System Design Primer",
              url: "https://github.com/donnemartin/system-design-primer",
              logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            },
            {
              name: "Pramp",
              url: "https://www.pramp.com/",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg6KjYQZsvN0PzAGHKz_LpzYrLLjQ7hQIn15vCRw&s=0"
            }
          ]
        }
      ]
    },
    aptitude: {
      icon: <Brain className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Năng khiếu & Lý luận",
          description: "Thực hành các kỹ năng suy luận định lượng và logic",
          icon: <PenTool className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "IndiaBix", url: "https://www.indiabix.com/" },
            { name: "Freshersworld Aptitude", url: "https://www.freshersworld.com/aptitude-questions" },
            { name: "MathsGuru Reasoning", url: "https://www.mathsguru.com/reasoning-questions/" }
          ]
        },
        {
          title: "Chuẩn bị cho kỳ thi cạnh tranh",
          description: "Tài nguyên cho các kỳ thi cạnh tranh và xếp lớp",
          icon: <Award className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "GATE Overflow", url: "https://gateoverflow.in/" },
            { name: "Career Power", url: "https://careerpower.in/" },
            { name: "Brilliant.org", url: "https://brilliant.org/" }
          ]
        }
      ]
    },
    interview: {
      icon: <FileText className="w-10 h-10 text-indigo-600" />,
      resources: [
        {
          title: "Hướng dẫn phỏng vấn",
          description: "Tài nguyên chuẩn bị phỏng vấn toàn diện",
          icon: <Book className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Insider Tips", url: "https://www.ambitionbox.com/" },
            { name: "InterviewStreet", url: "https://www.interviewstreet.com/" },
            { name: "Career Guidance", url: "https://www.shiksha.com/" }
          ]
        },
        {
          title: "Nền tảng học tập toàn cầu",
          description: "Các khóa học trực tuyến và tài nguyên học tập",
          icon: <Globe className="w-8 h-8 text-indigo-600" />,
          links: [
            { name: "Coursera", url: "https://www.coursera.org/" },
            { name: "edX", url: "https://www.edx.org/" },
            { name: "Udacity", url: "https://www.udacity.com/" }
          ]
        }
      ]
    }
  }

  return (
    <>
      <HeroSection />
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Tài nguyên luyện tập viết mã và phỏng vấn
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Bộ sưu tập toàn diện các nguồn lực hỗ trợ sự phát triển nghề nghiệp và chuẩn bị phỏng vấn của bạn
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.tech.resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>

          {/* Additional Resources Section */}
          <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nền tảng tìm việc làm công nghệ tại Việt Nam
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Khám phá các nguồn bổ sung để nâng cao hành trình phỏng vấn và tìm việc làm công nghệ của bạn
              </p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 p-8 pt-0">
              {[
                {
                  title: "Các nền tảng tìm việc IT nổi tiếng tại Việt Nam",
                  description: "Các trang web tìm việc làm chuyên về IT nổi tiếng tại Việt Nam",
                  icon: <Book className="w-12 h-12 text-indigo-600 mx-auto mb-4" />,
                  links: [
                    {
                      name: "ITviec",
                      url: "https://itviec.com/",
                      logo: "/images/itviec.jpg"
                    },
                    {
                      name: "TopDev",
                      url: "https://topdev.vn/",
                      logo: "/images/topdev.png"
                    },
                    {
                      name: "VietnamWorks",
                      url: "https://www.vietnamworks.com/",
                      logo: "/images/vietnamworks.png"
                    },
                    {
                      name: "TopCV",
                      url: "https://www.topcv.vn/",
                      logo: "/images/topcv.png"
                    }
                  ]
                },
                {
                  title: "Phỏng vấn giả",
                  description: "Thực hành với mô phỏng phỏng vấn được hỗ trợ bởi AI",
                  icon: <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />,
                  url: "/dashboard"
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all group"
                >
                  {tip.icon}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tip.description}</p>
                  {tip.url ? (
                    <a
                      href={tip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-indigo-800 text-indigo-600 flex items-center justify-center"
                    >
                      Khám phá
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  ) : (
                    <div className="space-y-2">
                      {tip.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          {link.logo && <img src={link.logo} alt={`${link.name} logo`} className="w-6 h-6 mr-2 object-contain" />}
                          {link.name}
                          <ArrowRight
                            className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}