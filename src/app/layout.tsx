import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

import SideBar from '@/components/SideBar'
import SessionProvider from '@/components/SessionProvider'
import Login from '@/components/Login'

import './globals.css'
import ClientProvider from '@/components/ClientProvider'

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
          {!session ? (
            <Login />
          ): (
            <div className='flex'>
              <div className='max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
                <SideBar />
              </div>

              {/* ClientProvider - Notification */}
              <ClientProvider />

              <div className='flex-1'>
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
