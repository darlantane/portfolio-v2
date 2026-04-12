import Navbar from "@/components/navbar";
import Skills from "@/components/skills";
import Footer from "@/components/footer";

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Skills />
      </div>
      <Footer />
    </main>
  );
}