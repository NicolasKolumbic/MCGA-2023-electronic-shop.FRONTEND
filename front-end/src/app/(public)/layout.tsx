import Providers from '@/core/Providers';
import '../../globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión - Digital World - Electronic Shop',
  description: 'Somos una tienda online de productos electrónicos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}