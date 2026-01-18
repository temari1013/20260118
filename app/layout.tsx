// In Next.js, this file would be called: app/layout.tsx
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}