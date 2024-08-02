"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
        <AntdRegistry>
    
          {children}
        </AntdRegistry>
        </SessionProvider>

      </body>
    </html>
  );
}



// import React from 'react';
// import { AntdRegistry } from '@ant-design/nextjs-registry';

// const RootLayout = ({ children }) => (
//   <html lang="en">
//     <body>
//       <AntdRegistry>{children}</AntdRegistry>
//     </body>
//   </html>
// );

// export default RootLayout;