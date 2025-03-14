import { useState } from "react";
const RegisterTokenPage = () => {
  const [email, setEmail] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setRegistrationLink("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/generate-registration-url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setRegistrationLink(data.registrationLink);
      } else {
        setError(data.message || "Error generating registration link.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error generating registration link.");
    }
  };

  return (
    <div>
      <h2>Generate Registration Link</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Link</button>
      </form>

      {registrationLink && (
        <div>
          <p>
            <strong>Registration Link:</strong>
          </p>
          <pre>{registrationLink}</pre>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterTokenPage;
