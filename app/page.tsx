import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import ArticlesPreview from "@/components/articles-preview";

import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Hero />
        <ArticlesPreview />
      </div>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
    </main>
  );
}
