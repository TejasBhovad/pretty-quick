import { Inter } from "next/font/google";
import AuthProvider from "./components/auth-provider";
import Navbar from "./components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pretty Quick",
  description: "Fastest CRUD operations in the web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="pt-12 h-full"> {children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
