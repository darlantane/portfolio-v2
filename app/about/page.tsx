import Navbar from "@/components/navbar";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <About />
      </div>
      <Footer />
    </main>
  );
}