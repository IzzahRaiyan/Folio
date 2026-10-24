
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";
import "../App.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await signupUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/journal", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
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

        <p className="eyebrow">A NEW CHAPTER</p>
        <h1>Create your account.</h1>
        <p className="auth-description">
          Start collecting the little things that make life yours.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="What should we call you?"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
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
            {loading ? "Creating account..." : "Create account"}
            {!loading && <span> ↗</span>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <Link className="back-link" to="/">
          ← Back to home
        </Link>
      </section>
    </main>
  );
}

export default Signup;
