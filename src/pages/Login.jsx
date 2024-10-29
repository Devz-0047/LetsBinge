import { useReducer, useState } from "react";
import loginImage from "../assets/login.jpeg";
import { login } from "../services/auth";
import Google from "../assets/Google.png";
import { useGoogleSignIn } from "../hooks/useGoogleSignIn";
const initialState = {
  email: "",
  password: "",
  rememberMe: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_REMEMBER_ME":
      return { ...state, rememberMe: !state.rememberMe };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default function Login() {
  const { mutate: googleSignIn, isLoading: isSingnIn } = useGoogleSignIn();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    response = await login(state.email, state.password);
    if (response.error) {
      setMessage(response.error.message);
    } else {
      setMessage(`Welcome, ${response.user.email}!`);
      console.log(message);
    }
    dispatch({ type: "RESET" });
  };
  return (
    <div className="relative z-50 flex max-h-[45rem] max-w-3xl items-center justify-center gap-4 bg-stone-950 p-12 text-orange-500">
      <div>
        <h2 className="pt-4 text-[32px] font-semibold leading-8">
          Welcome Back, Let&apos;s Binge
        </h2>
        <p className="text-md font-medium leading-8 text-orange-400">
          Please Enter your Details
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 text-[16px] font-semibold" htmlFor="email">
              Email
            </label>
          </div>
          <div>
            <input
              placeholder="Enter your email"
              type="email"
              id="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              required
              className="mb-2 mt-1 bg-stone-700 py-1.5 pl-1 pr-10 text-orange-400 placeholder:text-orange-200"
            />
          </div>
          <div>
            <label
              className="mt-2 text-[16px] font-semibold"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={state.password}
              required
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              placeholder="Enter your password"
              className="mb-2 mt-1 bg-stone-700 py-1.5 pl-1 pr-10 text-orange-400 placeholder:text-orange-200"
            />
          </div>
          <div className="flex justify-start">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label
                  className="flex items-center gap-1 space-x-2 text-[14px] font-medium"
                  htmlFor="rememberMe"
                >
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={state.rememberMe}
                    onChange={() => dispatch({ type: "TOGGLE_REMEMBER_ME" })}
                    className="h-5 w-5 rounded border-2 border-stone-700 bg-stone-700 text-orange-400 checked:border-stone-700 checked:bg-stone-700 focus:outline-none focus:ring-0"
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a className="cursor-pointer text-[14px] font-medium" href="">
                  Forget Password
                </a>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mb-2 mt-1.5 rounded-sm bg-orange-500 px-[8rem] py-1.5 text-[14px] text-gray-200"
          >
            Login
          </button>
          <button
            type="button"
            className="mb-2 mt-1.5 flex items-center justify-start gap-2 rounded-sm bg-orange-600 px-[4.6rem] py-1.5 text-[14px] text-gray-200"
            onClick={() => {
              googleSignIn();
            }}
            disabled={isSingnIn}
          >
            {" "}
            <img src={Google} className="h-6" />
            <p>Login with google</p>
          </button>
          <div className="flex justify-start gap-1">
            <div>
              <p>Don&apos;t have an account,</p>
            </div>
            <div>
              <a href="google.com" className="cursor-pointer">
                signup now for free
              </a>
            </div>
          </div>
        </form>
      </div>
      <div>
        <img src={loginImage} alt="Login Image" className="pl-auto h-80 w-64" />
      </div>
      <div className="right-38 absolute top-1 text-sm text-orange-600">
        Login In Through Email is not working, Continue with google login
      </div>
    </div>
  );
}
