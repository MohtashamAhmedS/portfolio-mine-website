import { Architects_Daughter, Prompt } from 'next/font/google'
import PenCursor from '../../components/PenCursor'
import Loader from '../../components/Loader'
import './globals.css'

const architectsDaughter = Architects_Daughter({
  variable: '--font-architects',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const prompt = Prompt({
  variable: '--font-prompt',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  title: 'Mohtasham | Portfolio',
  description: 'Full Stack Developer portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${prompt.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#F0E4CA] font-primary text-black">
        <Loader />
        <PenCursor />
        {children}
      </body>
    </html>
  )
}
