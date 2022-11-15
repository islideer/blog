import ThemeProvider from './components/ThemeProvider'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='text-zinc-800 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-50'>
        <ThemeProvider />
        {children}
      </body>
    </html>
  )
}
