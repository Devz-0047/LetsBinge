import { useNavigate } from "react-router-dom";

function Movie({ id, title, release_date, vote_average, poster_path }) {
  const navigate = useNavigate();
  return (
    <div
      className="max-h-[18rem] min-w-[10rem] max-w-[11rem] cursor-pointer rounded-md bg-slate-900 hover:shadow-md"
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w154${poster_path}`}
        alt={title}
        className="h-[14rem] w-[10rem] opacity-90 hover:opacity-100"
      />
      <p className="text-[0.95rem] font-semibold text-orange-500">{title}</p>
      <div className="flex justify-between">
        <p className="text-sm text-orange-400">{release_date}</p>
        <p className="text-sm text-orange-400">{vote_average.toFixed(1)}/10</p>
      </div>
    </div>
  );
}

export default Movie;
