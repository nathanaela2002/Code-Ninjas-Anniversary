import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NinjaImage from "./ninja.png";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!agreed) {
      setErrorMsg("You must agree to the terms and conditions to register.");
      return;
    }

    const registrationData = {
      token,
      firstName,
      lastName,
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(registrationData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Registration failed");
        return;
      }

      navigate("/tutorial-page");
    } catch (error) {
      console.error("Registration error: ", error);
      setErrorMsg("Server error");
    }
  };

  return (
    <div
      className="flex w-screen h-screen overflow-hidden items-stretch relative"
      style={{ background: "linear-gradient(to bottom, #68c4ee, #005dab)" }}
    >
      {/* Left Section (Text) - Hidden on screens smaller than xl */}
      <div className="hidden xl:flex w-1/3 relative flex-col justify-center mt-[-28rem] pl-14">
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          A World Where
        </h1>
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          Kids Write The Code!
        </h1>
      </div>

      {/* Ninja Image (hidden on screens smaller than xl) */}
      <div className="pointer-events-none hidden xl:flex absolute left-1/3 inset-y-0 items-center justify-center">
        <img
          src={NinjaImage}
          alt="Ninja"
          className="h-[600px] w-[600px] object-contain -translate-x-1/2 mt-[5rem]"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="w-full xl:w-2/3 bg-white rounded-none xl:rounded-l-[2rem] flex flex-col items-center justify-center py-8 md:py-16">
        <div className="w-3/4 px-4 md:px-8">
          <h2
            className="text-3xl md:text-5xl font-semibold font-syne text-create-blue text-center mb-8 md:mb-10"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Welcome to the 2nd Year Anniversary Challenge!
          </h2>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md px-4">
          <h3
            className="text-2xl md:text-4xl font-semibold font-syne text-left mb-4 md:mb-6"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Join the Challenge!
          </h3>
          {errorMsg && <div className="mb-4 text-red-500">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeCheckbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label
                htmlFor="agreeCheckbox"
                className="text-sm md:text-base text-gray-700"
              >
                I am between the ages 6-14
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-sm md:rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
