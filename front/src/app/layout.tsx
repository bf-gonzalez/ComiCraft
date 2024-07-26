import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { UserProvider } from "@/context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComiCraft",
  description: "ComiCraft: All The Tropes...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
            <div className={inter.className}>{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}