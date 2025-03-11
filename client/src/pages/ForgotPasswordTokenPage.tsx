import { useState } from "react";
const ForgotPasswordTokenPage = () => {
  const [email, setEmail] = useState("");
  const [resetPasswordLink, setResetPasswordLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResetPasswordLink("");

    try {
      const response = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setResetPasswordLink(data.resetLink);
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
      <h2>Generate Reset Password Link</h2>
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

      {resetPasswordLink && (
        <div>
          <p>
            <strong>Reset Password Link:</strong>
          </p>
          <pre>{resetPasswordLink}</pre>
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

export default ForgotPasswordTokenPage;
