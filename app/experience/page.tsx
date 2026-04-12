import Navbar from "@/components/navbar";
import Experience from "@/components/experience";
import Footer from "@/components/footer";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Experience />
      </div>
      <Footer />
    </main>
  );
}