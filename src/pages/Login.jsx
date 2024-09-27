import loginImage from "../assets/login.jpeg";
function login() {
  return (
    <div className="flex max-h-[45rem] max-w-3xl items-center justify-center bg-stone-950 p-12 text-orange-500">
      <div>
        <h2 className="pt-4 text-3xl font-semibold">
          Welcome Back, Let&apos;s Binge
        </h2>
        <p className="text-md font-medium leading-8 text-orange-400">
          Please Enter your Details
        </p>
        <form>
          <div>
            <label className="text-[16px] font-semibold">Email</label>
          </div>
          <div>
            <input
              placeholder="Enter your email"
              type="email"
              className="bg-stone-700 text-orange-400 placeholder:text-orange-200"
            />
          </div>
          <div>
            <label className="text-[16px] font-semibold">Password</label>
          </div>
          <div>
            <input
              placeholder="Enter your password"
              className="bg-stone-700 text-orange-400 placeholder:text-orange-200"
            />
          </div>
          <div className="flex justify-start">
            <div>
              <label className="text-[14px] font-medium">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded border-stone-700 bg-stone-700 text-orange-400 focus:ring-orange-500"
                />
                Remember me
              </label>
            </div>
            <div>
              <a className="text-[14px] font-medium">Forget Password</a>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-sm bg-orange-600 px-[8rem] py-1.5 text-[14px] text-gray-200"
          >
            Login
          </button>
          <div className="flex justify-start">
            <div>
              <p>Don&apos;t have account,</p>
            </div>
            <div>
              <a>signup now for free</a>
            </div>
          </div>
        </form>
      </div>
      <div>
        <img src={loginImage} alt="Login Image" className="pl-auto h-80 w-64" />
      </div>
    </div>
  );
}

export default login;
