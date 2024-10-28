function Spinner({ w = 12, h = 12 }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mt-32 flex min-h-screen items-start justify-center">
        <div
          className={`h-${h} w-${w} animate-spin rounded-full border-4 border-orange-600 border-t-transparent`}
        ></div>
      </div>
    </div>
  );
}

export default Spinner;
