import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";
import { FiX } from "react-icons/fi";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
function SeriesPage() {
  const { id } = useParams();
  console.log(useParams());
  const [series, setSeries] = useState(null);
  const [director, setDirector] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
        );
        setSeries(response.data);
        // Fetch movie credits (cast and crew)
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`,
        );
        const crew = creditsResponse.data.crew;
        const castData = creditsResponse.data.cast;

        // Get the director from the crew list
        const directorData = crew.find((person) => person.job === "Director");
        setDirector(directorData);

        // Get top 5 cast members
        setCast(castData.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);
  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="mt-[6rem] flex items-center justify-center gap-6 bg-slate-950">
      {loading ? (
        <div className="bg-slate-950">
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
              className="h-[700px] w-[500px]"
            />
          </div>
          <div className="max-h-[700px] max-w-[500px]">
            <h1 className="text-4xl font-semibold text-orange-600">
              {series.original_name}
            </h1>
            <p className="text-2xl font-semibold text-orange-500">
              {`${series.vote_average.toFixed(1)} / 10`}
            </p>
            <p className="text-xl font-semibold text-orange-400">
              {series.first_air_date.split("-")[0]}
            </p>
            {/* <p className="text-xl text-orange-400">{movie.overview}</p> */}

            {/* Display genres */}
            {series.genres && (
              <p className="text-xl text-orange-500">
                <strong>Genres:</strong>{" "}
                {series.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
            <p className="text-xl text-orange-500">
              <strong>Seasons: </strong>
              {series.number_of_seasons}
            </p>

            <h2 className="text-xl text-orange-500">
              <strong>Cast:</strong>
            </h2>
            <ul className="text-xl text-orange-500">
              {cast.map((actor) => (
                <li key={actor.id}>
                  <p className="text-lg text-orange-300">
                    {actor.name} as <i>{actor.character}</i>
                  </p>
                </li>
              ))}
            </ul>
            <h2 className="text-xl text-orange-500">
              <strong>Description:</strong>
            </h2>
            <p className="text-md text-orange-300">{series.overview}</p>
          </div>
          <button
            className="self-start"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FiX className="h-6 w-6 cursor-pointer rounded-md bg-orange-200 text-orange-400 hover:bg-orange-600" />
          </button>
        </>
      )}
    </div>
  );
}

export default SeriesPage;