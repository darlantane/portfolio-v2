import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}