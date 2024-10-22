import logo from "../assets/logo.png";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="flex min-h-[12rem] items-center justify-evenly bg-zinc-900 text-orange-400">
      <div>
        <img src={logo} className="mt-1 h-12 w-[12rem] bg-slate-950 pr-4" />
        <p className="mt-2">Copyright &copy; {year} Let&apos;sBinge </p>
        <div>
          <Link className="mt-3 flex justify-evenly text-orange-600">
            <FaInstagram size={28} />
            <FaFacebook size={28} />
            <FaTwitter size={28} />
            <FaGithub size={28} />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-[1.12rem] font-semibold text-orange-600">
          Let&apos;Binge{" "}
        </p>
        <ul>
          <Link>
            <li className="mt-1">Create Account</li>
            <li>Log In</li>
            <li>Pricing</li>
            <li>API</li>
          </Link>
        </ul>
      </div>
      <div>
        <p className="text-[1.12rem] font-semibold text-orange-600">Company</p>
        <ul>
          <Link>
            <li className="mt-1">About</li>
            <li>Community</li>
            <li>Contact</li>
            <li>Learn</li>
          </Link>
        </ul>
      </div>
      <div>
        <p className="text-[1.12rem] font-semibold text-orange-600">
          Tools & Resources
        </p>
        <ul>
          <Link>
            <li className="mt-1">Blog</li>
            <li>API Docs</li>
            <li>Library</li>
            <li>Use Cases</li>
          </Link>
        </ul>
      </div>
      <div>
        <p className="text-[1.12rem] font-semibold text-orange-600">Policy</p>
        <ul>
          <Link>
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
