import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
function NavBar() {
  return (
    <div className="flex min-h-[6rem] w-full items-center justify-between bg-slate-950">
      <div className="bg-slate-950">
        <NavLink to="/">
          <img
            src={logo}
            className="ml-4 mt-1 h-12 w-[12rem] bg-slate-950 pr-4"
          />
        </NavLink>
      </div>

      <div className="mt-1 flex items-center justify-center bg-slate-950">
        <form className="ml-[32rem] flex items-center justify-center bg-slate-950">
          <input
            type="text"
            placeholder="Search Movies"
            className="h-10 rounded-l-md bg-orange-200 pl-2 pr-16 outline-none"
          />
          <button
            type="submit"
            className="h-10 rounded-r-md bg-orange-200 px-2"
          >
            <FiSearch className="h-6 w-6 bg-orange-200 text-orange-500" />
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center bg-slate-950 pr-8 text-xl font-semibold">
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
            <NavLink className="bg-slate-950" to="/Trending">
              Trending
            </NavLink>
          </li>
          <li className="bg-slate-950">
            <LuUserCheck className="h-[26px] w-[26px] bg-slate-950" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
