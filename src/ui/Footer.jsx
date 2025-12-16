import logo from "../assets/logo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="grid min-h-[12rem] grid-cols-1 gap-8 bg-zinc-900 p-8 text-orange-400 md:grid-cols-5 md:gap-4 md:p-12">
      <div className="flex flex-col items-center md:items-start">
        <img src={logo} className="mt-1 h-12 w-[12rem] bg-slate-950 pr-4" />
        <p className="mt-2 text-center md:text-left">
          Copyright &copy; {year} Let&apos;sBinge{" "}
        </p>
        <div className="w-full">
          <Link className="mt-3 flex justify-center space-x-4 text-orange-600 md:justify-start">
            <FaInstagram size={28} />
            <FaFacebook size={28} />
            <FaTwitter size={28} />
            <FaGithub size={28} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="text-[1.12rem] font-semibold text-orange-600">
          Let&apos;Binge{" "}
        </p>
        <ul className="flex flex-col items-center md:items-start">
          <Link className="flex flex-col items-center md:items-start">
            <li className="mt-1">Create Account</li>
            <li>Log In</li>
            <li>Pricing</li>
            <li>API</li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="text-[1.12rem] font-semibold text-orange-600">Company</p>
        <ul className="flex flex-col items-center md:items-start">
          <Link className="flex flex-col items-center md:items-start">
            <li className="mt-1">About</li>
            <li>Community</li>
            <li>Contact</li>
            <li>Learn</li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="text-[1.12rem] font-semibold text-orange-600">
          Tools & Resources
        </p>
        <ul className="flex flex-col items-center md:items-start">
          <Link className="flex flex-col items-center md:items-start">
            <li className="mt-1">Blog</li>
            <li>API Docs</li>
            <li>Library</li>
            <li>Use Cases</li>
          </Link>
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="text-[1.12rem] font-semibold text-orange-600">Policy</p>
        <ul className="flex flex-col items-center md:items-start">
          <Link className="flex flex-col items-center md:items-start">
            <li className="mt-1">Terms of Use</li>
            <li>API Terms of Use</li>
            <li>Privacy</li>
            <li>DMCA</li>
          </Link>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
