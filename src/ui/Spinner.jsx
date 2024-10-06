function Spinner({ w = 12, h = 12 }) {
  return (
    <div className="mt-32 flex min-h-screen items-start justify-center">
      <div
        className={`h-${h} w-${w} animate-spin rounded-full border-4 border-orange-600 border-t-transparent`}
      ></div>
    </div>
  );
}

export default Spinner;
