import { jwtDecode } from 'jwt-decode';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import localFont from 'next/font/local'
import "./main_style.scss"

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname !== '/login') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          const currentDate = new Date();
          if (expirationDate < currentDate) {
            console.log('Token expired');
            router.push('/login');
          }
        } else {
          console.log('Invalid token');
          router.push('/login');
        }
      } else {
        console.log('No token, please login');
        router.push('/login');
      }
    }
  }, [router]);
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}