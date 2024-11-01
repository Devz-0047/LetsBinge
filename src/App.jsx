// eslint-disable-next-line
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../src/features/Navbar";
// eslint-disable-next-line
import Login from "./pages/Login";
// eslint-disable-next-line
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";
import MoviePage from "./ui/MoviePage";
import SeriesPage from "./ui/SeriesPage";
// import Footer from "./ui/Footer";
import TrendingSeries from "./ui/TrendingSeries";
import TrendingMovies from "./ui/TrendingMovies";
import TopRattedContent from "./ui/TopRattedContent";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "rgb(254 215 170)",
            },
          }}
        />
      </div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Discover" element={<Discover />} />
        <Route
          path="/Trending/movies/:timeWindowMovies"
          element={<TrendingMovies />}
        />
        <Route
          path="/Trending/series/:timeWindowSeries"
          element={<TrendingSeries />}
        />

        <Route path="/top+ratted/:topRatted" element={<TopRattedContent />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/series/:id" element={<SeriesPage />} />
        {/* Dynamic route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
