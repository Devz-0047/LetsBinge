import axios from "axios";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TrendingHome() {
  const [trendingMovie, setTrendingMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}

  useEffect(() => {
    let cancel;
    const fetchMovies = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        if (cancel) cancel();
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          },
        );
        console.log(response); // This should now show the response in the console
        setTrendingMovie(response.data.results.slice(0, 5)); // Store movie results if needed
      } catch (err) {
        setError(err); // Set the error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMovies(); // Call the fetchMovies function

    // Optional: Cleanup function to cancel the request when the component unmounts
    return () => {
      if (cancel) cancel();
    };
  }, [API_KEY]); // Add API_KEY as a dependency (if it changes, the effect runs again)

  return (
    <div className="x mt-[6rem] max-h-[40rem] max-w-[17.5rem] overflow-y-auto rounded-r-md bg-slate-950">
      {loading ? (
        <Spinner w="12" h="12" />
      ) : (
        <>
          <p className="bg-slate-950 pb-2 text-center text-[22px] font-semibold text-orange-600">
            Trending
          </p>
          {trendingMovie &&
            trendingMovie.length > 0 && ( // Ensure trendingMovie has items
              <ul className="bg-slate-950">
                {trendingMovie.map((movie) => (
                  <li
                    className="mb-[0.12rem] rounded-md border border-orange-400 bg-slate-950 pl-1 font-semibold text-orange-400 shadow-md"
                    key={movie.id}
                  >
                    <div className="flex items-center justify-center gap-2 bg-slate-950 py-2">
                      <div>
                        <img
                          src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                          alt={movie.title}
                          className="w-[5rem] rounded-md"
                        />
                      </div>
                      <div className="bg-slate-950">
                        <p className="font-md bg-slate-950 text-[16px] text-orange-500">
                          {movie.title}
                        </p>
                        <p className="bg-slate-950 text-[14px] text-orange-400">
                          Rating: {movie.vote_average.toFixed(1)}/10
                        </p>
                        <p className="bg-slate-950 text-[14px] text-orange-400">
                          Release Date: {movie.release_date}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </>
      )}
    </div>
  );
}