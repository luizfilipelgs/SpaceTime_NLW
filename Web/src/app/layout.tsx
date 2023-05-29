import { ReactNode } from 'react'
import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as Bai } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const bai = Bai({ subsets: ['latin'], weight: '700', variable: '--font-bai' })

export const metadata = {
  title: 'NLW Space Time',
  description: 'Capsula do tempo usando: React, Next, Typescript e Tailwind. ',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bai.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
