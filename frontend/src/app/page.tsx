import Banner from "@/components/banner";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HowItWorks from "@/components/how-it-works";
import KeyFeatures from "@/components/key-features";
import Pricing from "@/components/pricing";
import ReadyToStart from "@/components/ready-to-start";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-1 mt-20 md:mt-20">
        <Banner />
        <KeyFeatures />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <ReadyToStart />
      </main>
      <Footer />
    </div>
  );
}
