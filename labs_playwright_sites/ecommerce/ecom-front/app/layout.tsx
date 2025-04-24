import Header from "@/src/components/Header";
import Scroll from "@/src/components/scroll/Scroll";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <Scroll />
      <head />
      <body className="bg-gray-100 text-gray-900 overflow-x-hidden">
        <Header />
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="items-center justify-between mx-auto pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
