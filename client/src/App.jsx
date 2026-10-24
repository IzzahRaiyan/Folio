
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Journal from "./pages/Journal";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/journal" element={<Journal />} />
      <Route
        path="*"
        element={
          <main className="auth-page">
            <section className="auth-card">
              <h1>Page not found.</h1>
              <p className="auth-description">
                Looks like this page wandered off.
              </p>
              <Link className="back-link" to="/">
                ← Back to Folio
              </Link>
            </section>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
