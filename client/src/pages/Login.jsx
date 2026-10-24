
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/journal", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand" to="/">
          <span className="brand-mark">f.</span>
          <span>folio</span>
        </Link>

        <p className="eyebrow">WELCOME BACK</p>
        <h1>Your story continues.</h1>
        <p className="auth-description">
          Return to the little things you've collected.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
            {!loading && <span> ↗</span>}
          </button>
        </form>

        <p className="auth-switch">
          New to Folio? <Link to="/signup">Create an account</Link>
        </p>

        <Link className="back-link" to="/">
          ← Back to home
        </Link>
      </section>
    </main>
  );
}

export default Login;
