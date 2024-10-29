import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSearch, FiX } from "react-icons/fi";
// import { LuUserCheck } from "react-icons/lu";
import { FaUserAltSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10768, name: "News" },
  { id: 37, name: "Western" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "Reality" },
  { id: 10769, name: "Game Show" },
];

function NavBar() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mutate: googleSignIn, isLoading: isSingnIn } = useGoogleSignIn();
  const { data: session, isLoading: isSessionLoading } = useAuth();
  const avatarUrl = session?.user?.user_metadata?.avatar_url;
  useEffect(() => {
    let cancel;
    const fetchMovies = async () => {
      if (searchMovie.trim() === "") {
        setMovies([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        if (cancel) cancel();

        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchMovie}`,
          { cancelToken: new axios.CancelToken((c) => (cancel = c)) },
        );
        setMovies(response.data.results.slice(0, 5));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Previous request canceled");
        } else {
          setError("Failed to fetch books");
          // console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    const debounceFetch = setTimeout(() => {
      if (searchMovie) fetchMovies();
    }, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchMovie]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMovies([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleForm = (e) => {
    e.preventDefault();
    setSearchMovie("");
    setMovies([]);
  };
  const getMovieCoverUrl = (movie) => {
    if (movie.poster_path)
      return `https://image.tmdb.org/t/p/w154${movie.poster_path}`;
    return "https://via.placeholder.com/150x200?text=No+Poster";
  };
  const getGenreNames = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      return [];
    }
    return genreIds
      .map((id) => {
        const genre = genresList.find((g) => g.id === id); // Find the genre by ID
        return genre ? genre.name : "";
      })
      .filter(Boolean)
      .join(", "); // Filter out any null values and join genres
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-[6rem] w-full items-center justify-between bg-slate-950">
      <div className="bg-slate-950">
        <NavLink to="/">
          <img
            src={logo}
            className="ml-4 mt-1 h-12 w-[12rem] bg-slate-950 pr-4"
          />
        </NavLink>
      </div>

      <div className="mt-1 flex items-center justify-center bg-slate-950">
        <form
          className="relative ml-[32rem] flex items-center justify-center bg-slate-950"
          onSubmit={handleForm}
        >
          <input
            type="text"
            placeholder="Search Movies/Series"
            className="font-weight-bold h-10 rounded-l-md rounded-r-none bg-orange-200 pl-2 pr-16 text-lg text-orange-700 outline-none placeholder:text-orange-500"
            onChange={(e) => setSearchMovie(e.target.value)}
            value={searchMovie}
          />
          {searchMovie ? (
            <button
              className="h-10 rounded-r-none bg-orange-200 px-2"
              onClick={() => {
                setSearchMovie("");
                setMovies([]);
              }}
            >
              <FiX className="h-6 w-6 bg-orange-200 text-orange-500" />
            </button>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="h-10 rounded-r-md bg-orange-200 px-2"
          >
            <FiSearch className="h-6 w-6 bg-orange-200 text-orange-500" />
          </button>

          {loading ? (
            <div className="absolute top-14 z-10 mt-2 max-h-[20rem] w-full overflow-y-auto rounded-md border bg-orange-200 shadow-lg">
              <Spinner w="12" h="12" />
            </div>
          ) : (
            <>
              {movies.length > 0 && (
                <ul className="absolute top-14 z-10 mt-2 max-h-[20rem] w-full overflow-y-auto rounded-md border bg-orange-200 shadow-lg">
                  {movies.map((movie) => (
                    <li
                      key={movie.id}
                      className="flex cursor-pointer items-center border-b bg-orange-200 p-3"
                      onClick={() => {
                        let type =
                          movie.media_type === "tv" ? "series" : "movie";
                        setSearchMovie("");
                        setMovies([]);

                        navigate(`/${type}/${movie.id}`);
                        // navigate(`/movie/${movie.id}`) =   window.location.href = `/movie/${movie.id}`;
                      }}
                    >
                      <img
                        src={getMovieCoverUrl(movie)}
                        alt={movie.title}
                        className="mr-4 h-16 w-12"
                      />
                      <div className="bg-orange-200">
                        <strong className="bg-orange-200 text-orange-700">
                          {movie.title || movie.name}
                        </strong>
                        <p className="text-md font-md bg-orange-200 text-sm text-orange-600">
                          {getGenreNames(movie.genre_ids)}
                        </p>
                        <p className="text-md font-md bg-orange-200 text-sm text-orange-600">
                          {movie.release_date?.split("-")[0] ||
                            movie.first_air_date?.split("-")[0] ||
                            "N/A"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </form>
      </div>

      <div className="flex items-center justify-center bg-slate-950 pr-8 text-xl font-semibold text-orange-600">
        <ul className="flex items-center space-x-4 bg-slate-950">
          <li className="bg-slate-950">
            <NavLink className="bg-slate-950" to="/">
              Home
            </NavLink>
          </li>
          <li className="bg-slate-950">
            <NavLink className="bg-slate-950" to="/Library">
              Library
            </NavLink>
          </li>
          <li className="bg-slate-950">
            <NavLink className="bg-slate-950" to="/Discover">
              Discover
            </NavLink>
          </li>
          {!session ? (
            <li
              className="cursor-pointer bg-slate-950"
              onClick={() => {
                googleSignIn();
              }}
            >
              <FaUserAltSlash className="h-[26px] w-[26px] bg-slate-950" />
            </li>
          ) : (
            <li className="bg-slate-950">
              <img src={`${avatarUrl}`} className="h-8 rounded-full" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
