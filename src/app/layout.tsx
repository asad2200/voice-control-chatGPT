import SideBar from '@/components/SideBar'
import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Voice Chat GPT',
  description: 'Voice Control Chat GPT',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className='flex'>
            <div className='max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
              <SideBar />
            </div>

            {/* ClientProvider - Notification */}

            <div className='flex-1'>
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
