import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";
// import { LuUserCheck } from "react-icons/lu";
import { FaUserAltSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";
import { useGoogleSignOut } from "../hooks/useGoogleSignOut";
import toast from "react-hot-toast";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: googleSignIn, isLoading: isSingnIn } = useGoogleSignIn();
  const { data: session, isLoading: isSessionLoading } = useAuth();
  const { mutate: googleSignOut, isLoading: isSigningOut } = useGoogleSignOut();
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
    <div className="fixed left-0 top-0 z-50 flex w-full flex-col items-center justify-between bg-slate-950 px-4 py-2 md:min-h-[6rem] md:flex-row md:px-8">
      <div className="relative z-50 flex w-full items-center justify-between bg-slate-950 md:w-auto md:justify-start">
        <NavLink to="/">
          <img
            src={logo}
            className="mt-1 h-[40px] w-auto bg-slate-950 md:h-[48px] md:w-[192px]"
            alt="LetsBinge Logo"
          />
        </NavLink>
        {/* Hamburger Menu Icon */}
        <button
          className="text-orange-600 focus:outline-none md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Overlay / Desktop Menu */}
      <div
        className={`${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 p-8 pt-24 transition-transform duration-300 ease-in-out md:static md:z-auto md:flex md:w-auto md:flex-grow md:translate-x-0 md:flex-row md:items-center md:justify-end md:gap-8 md:bg-transparent md:p-0 md:pt-0`}
      >
        {/* Search Bar */}
        <div className="flex w-full items-center justify-center bg-slate-950 md:w-auto">
          <form
            className="relative flex w-full max-w-lg items-center justify-center bg-slate-950"
            onSubmit={handleForm}
          >
            <input
              type="text"
              placeholder="Search Movies/Series"
              className="font-weight-bold h-10 w-full rounded-l-md rounded-r-none bg-orange-300 pl-2 pr-16 text-lg text-orange-700 outline-none placeholder:text-orange-500"
              onChange={(e) => setSearchMovie(e.target.value)}
              value={searchMovie}
            />
            {searchMovie ? (
              <button
                className="h-10 rounded-r-none bg-orange-300 px-2"
                onClick={() => {
                  setSearchMovie("");
                  setMovies([]);
                }}
              >
                <FiX className="h-6 w-6 bg-orange-300 text-orange-500" />
              </button>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="h-10 rounded-r-md bg-orange-300 px-2"
            >
              <FiSearch className="h-6 w-6 bg-orange-300 text-orange-500" />
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

        {/* Navigation Links */}
        <div className="mt-8 flex w-full flex-col items-center justify-center bg-slate-950 text-xl font-semibold text-orange-600 md:mt-0 md:w-auto md:flex-row md:justify-end">
          <ul className="flex flex-col items-center space-y-6 md:flex-row md:space-x-4 md:space-y-0 bg-slate-950">
            <li className="bg-slate-950">
              <NavLink
                className="bg-slate-950"
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="bg-slate-950">
              <NavLink
                className="bg-slate-950"
                to="/Library"
                onClick={() => setIsMenuOpen(false)}
              >
                Library
              </NavLink>
            </li>
            <li className="bg-slate-950">
              <NavLink
                className="bg-slate-950"
                to="/Discover"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </NavLink>
            </li>
            {!session ? (
              <li
                className="cursor-pointer bg-slate-950"
                onClick={() => {
                  googleSignIn();
                  toast.success("Successfully, Login In");
                  setIsMenuOpen(false);
                }}
              >
                <FaUserAltSlash className="h-[26px] w-[26px] bg-slate-950" />
              </li>
            ) : (
              <li
                className="cursor-pointer bg-slate-950"
                onClick={() => {
                  googleSignOut();
                  toast.success("Successfully, Sign Out");
                  setIsMenuOpen(false);
                }}
              >
                <img src={`${avatarUrl}`} className="h-8 rounded-full" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
