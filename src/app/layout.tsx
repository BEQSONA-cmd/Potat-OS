import "./globals.css";
import { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Potat-OS',
  description: "Welcome to Beqa Tvildiani's personal Potat-OS",
};

interface AppProps {
  children: ReactNode;
}

export default function App({ children }: AppProps) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
