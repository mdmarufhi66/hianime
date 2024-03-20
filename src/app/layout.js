import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { WatchlistProvider } from "@/context/WatchListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ZenAnime",
  description:
    "ZenAnime is a web app that provides you with anime recommendations.",
};

export default function RootLayout({ children }) {
  return (
<ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
          <WatchlistProvider>
            <main className="bg-[#0F1117]">
              <div className="bg-hero bg-center bg-cover bg-no-repeat">
                <Navbar />
                <Hero />
              </div>
              {children}
              <Footer />
            </main>
          </WatchlistProvider>
     
      </body>
    </html>
</ClerkProvider>
  );
}
