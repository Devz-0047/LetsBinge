import { useState } from "react";
import { FaFire } from "react-icons/fa";
function Trending() {
  const [today, setToday] = useState(true);
  const [popular, setPopular] = useState("streaming");
  const toggleToday = () => {
    setToday((m) => !m);
  };

  return (
    <div className="mt-[6rem] flex h-[100vh] items-center justify-center bg-slate-950 text-5xl text-orange-500">
      <div className="flex">
        <FaFire className="text-orange-600" />
        <p>Trending</p>
      </div>
    </div>
  );
}

export default Trending;
/* <div className="flex items-center justify-center min-h-screen transition-all bg-slate-950 dark:bg-gray-900">
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
