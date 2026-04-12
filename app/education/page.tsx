import Navbar from "@/components/navbar";
import Education from "@/components/education";
import Footer from "@/components/footer";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Education />
      </div>
      <Footer />
    </main>
  );
}