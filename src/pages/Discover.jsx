import { Suspense, useState } from "react";
import { FaFire } from "react-icons/fa";
import MovieCard from "../ui/MovieCard";
import SeriesCard from "../ui/SeriesCard";
import { FaTrophy } from "react-icons/fa";
import TopRatted from "../ui/TopRatted";
import Spinner from "../ui/Spinner";
// import { Outlet } from "react-router-dom";
function Trending() {
  const [timeWindowMovies, setTimeWindowMovies] = useState("day");
  const [timeWindowSeries, setTimeWindowSeries] = useState("day");
  const [topRatted, setTopRatted] = useState("movie");

  return (
    <div>
      {/* <Outlet /> */}
      <div className="mt-[6rem] flex flex-col items-center justify-start gap-4 bg-slate-950 pl-2">
        <div className="flex">
          <FaFire className="text-5xl text-orange-600" />
          <p className="text-[2.6rem] text-orange-500">Trending Movies</p>
        </div>
        <div className="ml-4 self-start font-semibold">
          <div>
            <button
              className={`rounded-l-md ${timeWindowMovies === "day" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTimeWindowMovies("day");
              }}
            >
              Today
            </button>
            <button
              className={`rounded-r-md ${timeWindowMovies === "week" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTimeWindowMovies("week");
              }}
            >
              This Week
            </button>
          </div>
          <div className="mt-4">
            <Suspense fallback={<Spinner />}>
              <MovieCard timeWindowMovies={timeWindowMovies} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 bg-slate-950">
        <div className="flex">
          <FaFire className="text-5xl text-orange-600" />
          <p className="text-[2.6rem] text-orange-500">Trending Series</p>
        </div>
        <div className="ml-4 self-start font-semibold">
          <div>
            <button
              className={`rounded-l-md ${timeWindowSeries === "day" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTimeWindowSeries("day");
              }}
            >
              Today
            </button>
            <button
              className={`rounded-r-md ${timeWindowSeries === "week" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTimeWindowSeries("week");
              }}
            >
              This Week
            </button>
          </div>
          <div className="mt-4">
            <SeriesCard timeWindowSeries={timeWindowSeries} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-4 bg-slate-950">
        <div className="flex items-center gap-2">
          <FaTrophy className="text-5xl text-orange-600" />
          <p className="text-[2.6rem] text-orange-500">Top Ratted</p>
        </div>
        <div className="ml-4 self-start font-semibold">
          <div>
            <button
              className={`rounded-l-md ${topRatted === "movie" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTopRatted("movie");
              }}
            >
              Movies
            </button>
            <button
              className={`rounded-r-md ${topRatted === "tv" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
              onClick={(e) => {
                e.preventDefault();
                setTopRatted("tv");
              }}
            >
              Series
            </button>
          </div>
          <div className="mt-4">
            <TopRatted topRatted={topRatted} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending; /* <div className="flex items-center justify-center min-h-screen transition-all bg-slate-950 dark:bg-gray-900">
        <label htmlFor="today" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="today"
              className="sr-only"
              checked={today}
              onChange={toggleToday}
            />
            <div className="block h-8 bg-gray-900 rounded-full w-14 dark:bg-gray-500"></div>
            <div
              className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform dark:bg-gray-200 ${
                today ? "translate-x-6 transform" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>*/
