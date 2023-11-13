import '../../styles/globals.scss';
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: "100", subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital World - Electronic Shop',
  description: 'Somos una tienda online de productos electrónicos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}