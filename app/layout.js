import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import Footer from "./dashboard/_components/Footer";
import Header from "./dashboard/_components/Header";
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ['system-ui', 'arial', 'sans-serif']
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ['Courier New', 'monospace']
});

export const metadata = {
  metadataBase: new URL('https://www.mockmateai.com'),
  title: {
    default: 'MockMate AI - AI-Powered Interview Preparation',
    template: '%s | MockMate AI'
  },
  description: 'Nâng cao kỹ năng phỏng vấn của bạn với các cuộc phỏng vấn thử được hỗ trợ bởi AI. Nhận hướng dẫn cá nhân, phản hồi theo thời gian thực và tăng sự tự tin của bạn.',
  keywords: [
    'Chuẩn bị phỏng vấn AI',
    'phỏng vấn thử',
    'huấn luyện phỏng vấn',
    'phát triển sự nghiệp',
    'trợ giúp phỏng vấn xin việc'
  ],
  authors: [{ name: 'ITSmartHire Team' }],
  creator: 'ITSmartHire Team',
  publisher: 'ITSmartHire Team',

  openGraph: {
    type: 'website',
    locale: 'en_VN',
    url: 'https://mockmateai-eta.vercel.app/',
    title: 'ITSmartMockInterview - Chuẩn bị phỏng vấn bằng AI',
    description: 'Nâng cao kỹ năng phỏng vấn của bạn với các cuộc phỏng vấn thử được hỗ trợ bởi AI. Nhận hướng dẫn cá nhân, phản hồi theo thời gian thực và tăng sự tự tin của bạn.',
    siteName: 'ITSmartMockInterview',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ITSmartMockInterview - Số hóa việc chuẩn phỏng vấn'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ITSmartMockInterview - Chuẩn bị phỏng vấn bằng AI',
    description: 'Nâng cao kỹ năng phỏng vấn của bạn với các cuộc phỏng vấn thử được hỗ trợ bởi AI. Nhận hướng dẫn cá nhân, phản hồi theo thời gian thực và tăng sự tự tin của bạn.',
    creator: '@ITSmartMockInterview',
    images: ['/twitter-image.png']
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  verification: {
    google: 'your-google-site-verification-code',
    // Add other verification codes as needed
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body
          className={`
            antialiased 
            min-h-screen 
            flex 
            flex-col 
            bg-white 
            text-gray-900 
            font-sans
          `}
        >
          <a
            href="#main-content"
            className="
              absolute 
              top-[-999px] 
              left-[-999px] 
              z-[-1] 
              focus:top-0 
              focus:left-0 
              focus:z-50 
              p-4 
              bg-indigo-600 
              text-white
            "
          >
            Skip to main content
          </a>

          <Header />
          <Toaster />

          <main
            id="main-content"
            className="
              flex-grow 
              pt-16 
              sm:pt-20 
              max-w-7xl 
              mx-auto 
              w-full 
              px-4 
              sm:px-6 
              lg:px-8
            "
          >
            {children}
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}