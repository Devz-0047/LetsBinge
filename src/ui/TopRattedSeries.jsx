import axios from "axios";
import { useEffect, useState } from "react";
import Series from "./Series";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
function TopRattedSeries() {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const movieList = Array.isArray(trendingMovies) ? trendingMovies : [];
  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = movieList.slice(
    startIndex,
    startIndex + moviesPerPage,
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(movieList.length / moviesPerPage);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        );
        setTrendingMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  });
  return (
    <div className="bg-slate-950">
      <h2 className="mb-[2rem] mt-[6rem] text-center text-4xl font-semibold text-orange-500">
        Highest Ratted Series
      </h2>
      {movieList.length > 0 ? (
        <ul className="ml-10 grid grid-cols-6 gap-4">
          {paginatedMovies.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                navigate(`/series/${movie.id}`);
              }}
            >
              <Series
                id={movie.id}
                title={movie.original_name}
                release_date={movie.first_air_date}
                vote_average={movie.vote_average}
                poster_path={movie.poster_path}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Spinner />
      )}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            key={index}
            className={`mb-4 rounded-md border px-3 py-1 ${currentPage === index + 1 ? "bg-orange-500 text-slate-950 hover:bg-orange-600" : "bg-orange-300 text-slate-950 hover:bg-orange-400"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopRattedSeries;
