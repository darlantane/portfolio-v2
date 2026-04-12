import Navbar from "@/components/navbar";
import Certifications from "@/components/certifications";
import Footer from "@/components/footer";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4">
        <Certifications />
      </div>
      <Footer />
    </main>
  );
}