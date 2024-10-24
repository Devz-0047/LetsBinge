import { useState } from "react";
import { FaFire } from "react-icons/fa";
function Trending() {
  const [timeWindow, setTimeWindow] = useState("Today");
  const [popular, setPopular] = useState("streaming");

  return (
    <div>
      <div className="mt-[6rem] flex h-[100vh] flex-col items-center justify-start gap-4 bg-slate-950">
        <div className="flex">
          <FaFire className="text-5xl text-orange-600" />
          <p className="text-5xl text-orange-500">Trending</p>
        </div>
        <div className="ml-4 self-start font-semibold">
          <div>
            <button
              className={`rounded-l-md ${timeWindow === "Today" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500 active:bg-orange-500`}
              onClick={() => setTimeWindow("Today")}
            >
              Today
            </button>
            <button
              className={`rounded-r-md ${timeWindow === "This Week" ? "bg-orange-400" : "bg-orange-300"} px-4 py-1 text-2xl text-orange-900 hover:bg-orange-500`}
              onClick={() => setTimeWindow("This Week")}
            >
              This Week
            </button>
          </div>
          <div></div>
        </div>
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
