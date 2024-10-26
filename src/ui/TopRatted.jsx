import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function TopRatted({ topRatted }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${topRatted}/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        );

        setTrendingMovies(response.data.results.slice(0, 8));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [topRatted]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full max-w-full overflow-hidden">
      {trendingMovies.length > 0 ? (
        topRatted === "movie" ? (
          <div className="h-[20rem] w-full max-w-[100%] overflow-x-auto">
            <ul className="flex items-center justify-start gap-4">
              {trendingMovies.map((trendingMovie) => (
                <li
                  className="min-w-[10rem] cursor-pointer bg-slate-900 hover:shadow-md"
                  key={trendingMovie.id}
                  onClick={() => navigate(`/movie/${trendingMovie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w154${trendingMovie.poster_path}`}
                    alt={trendingMovie.title}
                    className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
                  />
                  <p className="text-[0.95rem] font-semibold text-orange-500">
                    {trendingMovie.title}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-orange-400">
                      {trendingMovie.release_date}
                    </p>
                    <p className="text-sm text-orange-400">
                      {trendingMovie.vote_average.toFixed(1)}/10
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="h-[20rem] w-full max-w-[100%] overflow-x-auto">
            <ul className="flex items-center justify-start gap-4">
              {trendingMovies.map((trendingMovie) => (
                <li
                  className="min-w-[10rem] cursor-pointer bg-slate-900 hover:shadow-md"
                  key={trendingMovie.id}
                  onClick={() => navigate(`/series/${trendingMovie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w154${trendingMovie.poster_path}`}
                    alt={trendingMovie.title}
                    className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
                  />
                  <p className="text-[0.95rem] font-semibold text-orange-500">
                    {trendingMovie.original_name}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-sm text-orange-400">
                      {trendingMovie.first_air_date}
                    </p>
                    <p className="text-sm text-orange-400">
                      {trendingMovie.vote_average.toFixed(1)}/10
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TopRatted;
