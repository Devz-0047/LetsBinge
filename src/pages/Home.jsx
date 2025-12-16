import Footer from "../ui/Footer";
import HeroSection from "../ui/HeroSection";
import TrendingHome from "../ui/TrendingHome";
// import Login from "../pages/Login";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Trending Section - Hidden on mobile, 1/6 width on desktop */}
        <div className="hidden max-h-screen bg-slate-950 md:block md:w-1/6">
          <TrendingHome />
        </div>

        {/* Hero Section - Full width on mobile, 5/6 on desktop */}
        <div className="flex w-full items-center justify-center bg-slate-950 md:w-5/6">
          <HeroSection />
        </div>
      </div>

      {/* Footer - Full width, no fixed margins */}
      <div className="w-full bg-zinc-900">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
