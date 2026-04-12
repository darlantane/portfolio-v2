import Navbar from "@/components/navbar";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}