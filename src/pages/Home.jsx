// import Footer from "../ui/Footer";
// import HeroSection from "../ui/HeroSection";
// import TrendingHome from "../ui/TrendingHome";
// function Home() {
//   return (
//     <div
//       className="grid w-full h-screen"
//       style={{
//         gridTemplateRows: "auto 1fr auto",
//         gridTemplateColumns: "2fr 6fr",
//       }}
//     >
//       <div className="col-span-1 row-span-1">
//         <TrendingHome />
//       </div>
//       <div className="col-span-1 row-span-1"></div>
//       <div className="col-span-2 row-span-1">
//         <HeroSection />
//       </div>
//       <div className="col-span-2">
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Home;
import Footer from "../ui/Footer";
import HeroSection from "../ui/HeroSection";
import TrendingHome from "../ui/TrendingHome";

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow">
        {/* Trending Section - 20% of the width */}
        <div className="max-h-screen w-1/6 bg-slate-950">
          <TrendingHome />
        </div>

        {/* Hero Section - 80% of the width */}
        <div className="flex w-5/6 items-center justify-center bg-slate-950">
          <HeroSection />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-zinc-900">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
