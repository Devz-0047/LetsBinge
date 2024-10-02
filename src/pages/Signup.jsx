import { useReducer, useState } from "react";
import SignupImage from "../assets/Signup.jpg";
import { signup } from "../services/auth";
const initialState = {
  email: "",
  password: "",
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

    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;

    response = await signup(state.email, state.password);
    if (response.error) {
      setMessage(response.error.message);
    } else {
      setMessage(`Welcome, ${response.user.email}!`);
    }
    console.log(message);

    dispatch({ type: "RESET" });
  };
  return (
    <div className="flex max-h-[45rem] max-w-3xl items-center justify-center gap-4 bg-stone-950 p-12 text-orange-500">
      <div>
        <h2 className="pt-4 text-[26px] font-semibold leading-8">
          Welcome, Let&apos;s Binge
        </h2>
        <p className="text-md font-medium leading-8 text-orange-400">
          Please Enter your Details for Signup
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
              className="mb-2 mt-1 bg-stone-700 py-1.5 pl-1 pr-24 text-orange-400 placeholder:text-orange-200"
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
              className="mb-2 mt-1 bg-stone-700 py-1.5 pl-1 pr-24 text-orange-400 placeholder:text-orange-200"
            />
          </div>

          <button
            type="submit"
            className="mb-2 mt-1.5 rounded-sm bg-orange-600 px-[8rem] py-1.5 text-[14px] font-medium text-gray-200"
          >
            SignUp
          </button>

          <a href="google.com" className="cursor-pointer">
            <p>Already have an account, Login now</p>
          </a>
        </form>
      </div>
      <div>
        <img
          src={SignupImage}
          alt="Login Image"
          className="pl-auto h-68 via-opacity-80 w-[46rem] bg-gradient-to-br opacity-60"
        />
      </div>
    </div>
  );
}
