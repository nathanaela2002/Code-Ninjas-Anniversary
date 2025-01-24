import NinjaImage from "./ninja.png";

const LoginPage = () => {
  return (
    <div
      className="flex w-screen h-screen overflow-hidden items-stretch relative"
      // 1) Entire page gets the gradient background and is constrained to the viewport height
      style={{
        background: "linear-gradient(to bottom, #68c4ee, #005dab)",
      }}
    >
      {/* Left Section (Text) */}
      <div className="hidden md:flex w-1/3 relative flex-col justify-center mt-[-22rem] pl-14">
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Kids have Fun
        </h1>
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Parents See Results!
        </h1>
      </div>

      {/* Ninja Image (hidden on small screens) */}
      <div className="pointer-events-none hidden md:flex absolute left-1/3 inset-y-0 items-center justify-center">
        <img
          src={NinjaImage}
          alt="Ninja"
          className="h-[750px] w-[750px] object-contain -translate-x-1/2 mt-[10rem]"
        />
      </div>

      {/* Right Section: White background fills entire right panel */}
      <div className="w-full md:w-2/3 bg-white rounded-l-[2rem] flex flex-col items-center justify-center py-16">
        <div className="w-3/4 px-8">
          <h2
            className="text-5xl font-semibold font-syne text-create-blue text-center mb-20"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome to the 2nd Year Anniversary Challenge!
          </h2>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md px-8">
          <h3
            className="text-4xl font-semibold font-syne text-left mb-6"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome!
          </h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 underline">
              Sign Up
            </a>
          </p>
          <p className="text-center text-gray-600 mt-2">
            Forgot passsord?{" "}
            <a href="/reset-password" className="text-blue-500 underline">
              Click Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
