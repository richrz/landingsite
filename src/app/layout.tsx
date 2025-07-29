import { Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import PlasmaWave from "@/components/PlasmaWave";
import "./global.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: 'PassengerOS',
  description: 'PassengerOS Landing Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} antialiased bg-black relative`}>
        <PlasmaWave />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
