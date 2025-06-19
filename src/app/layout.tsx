import "./globals.css";
import { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: 'Template',
  description: "Welcome to Beqa Tvildiani's personal Template",
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

        {/* Footer */}
        {/* <footer className="bg-gray-100 p-4 absolute b-0 w-full">
          <div className="container mx-auto text-center">
            <p>&copy; Potat-OS | Design by <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">BEQSONA-cmd</a></p>
          </div>
        </footer> */}
        <ToastContainer />
      </body>
    </html>
  );
}
