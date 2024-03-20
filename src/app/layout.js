import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthProvider";
import { WatchlistProvider } from "@/context/WatchListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZenAnime",
  description:
    "ZenAnime is a web app that provides you with anime recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WatchlistProvider>
            <main className="mx-auto bg-[#0F1117]">
              <div className="bg-hero bg-center bg-cover bg-no-repeat">
                <Navbar />
                <Hero />
              </div>
              {children}
              <Footer />
            </main>
          </WatchlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
