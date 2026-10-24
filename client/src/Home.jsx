import "./App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-mark">f.</span>
          <span>folio</span>
        </a>

        <nav className="nav-links">
          <a href="#journal">Journal</a>
          <a href="#about">About</a>
          <Link to="/login" className="login-button">Log in</Link>
          <Link to="/signup" className="signup-button">
           Get started ↗
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot"></span>
              YOUR PERSONAL EXPERIENCE JOURNAL
            </p>

            <h1>
              Life is made of
              <br />
              <span>little things.</span>
              <br />
              Keep them close.
            </h1>

            <p className="hero-description">
              A quiet space for the books that moved you, the places
              that stayed with you, and the things you're learning
              along the way.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="primary-button">
                Start your journal <span>↗</span>
            </Link>
              <a className="secondary-link" href="#journal">
                Explore Folio <span>↓</span>
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon">✳</span>
              <span>A little space for a life well noticed.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="A peaceful reading corner">
            <div className="art-sun"></div>
            <div className="art-window">
              <div className="window-pane pane-one"></div>
              <div className="window-pane pane-two"></div>
              <div className="window-pane pane-three"></div>
              <div className="window-pane pane-four"></div>
            </div>

            <div className="art-plant plant-one">✳</div>
            <div className="art-plant plant-two">❋</div>

            <div className="art-table"></div>
            <div className="art-book book-one"></div>
            <div className="art-book book-two"></div>
            <div className="art-book book-three"></div>

            <div className="art-card">
              <span className="card-sparkle">✳</span>
              <p className="card-label">A NOTE TO SELF</p>
              <p className="card-quote">
                "Pay attention.
                <br />
                The ordinary is
                <br />
                where life happens."
              </p>
              <span className="card-line"></span>
              <span className="card-date">SOMEDAY, SOMEWHERE</span>
            </div>

            <div className="art-caption">
              <span>01 /</span> COLLECT WHAT MATTERS
            </div>
          </div>
        </section>

        <section className="intro-strip" id="about">
          <p>NOT EVERYTHING NEEDS TO BE SHARED.</p>
          <span className="strip-star">✳</span>
          <p>SOME THINGS JUST NEED A PLACE TO LIVE.</p>
        </section>

        <section className="journal-section" id="journal">
          <div>
            <p className="eyebrow">A HOME FOR YOUR EXPERIENCES</p>
            <h2>Every experience has a story.</h2>
            <p className="section-description">
              Keep the things that make you, you — all in one
              thoughtful collection.
            </p>
          </div>

          <div className="category-grid">
            <article className="category-card">
              <span className="category-icon">▤</span>
              <p className="category-number">01</p>
              <h3>Books & ideas</h3>
              <p>Words that opened a new door.</p>
            </article>

            <article className="category-card">
              <span className="category-icon">▹</span>
              <p className="category-number">02</p>
              <h3>Films & stories</h3>
              <p>Stories that stayed after the credits.</p>
            </article>

            <article className="category-card">
              <span className="category-icon">⌁</span>
              <p className="category-number">03</p>
              <h3>Places & moments</h3>
              <p>Somewhere worth remembering.</p>
            </article>

            <article className="category-card">
              <span className="category-icon">✳</span>
              <p className="category-number">04</p>
              <h3>Things I'm learning</h3>
              <p>Small steps, meaningful growth.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="/">
          <span className="brand-mark">f.</span>
          <span>folio</span>
        </a>
        <p>A life, thoughtfully collected.</p>
        <span>MADE FOR THE THINGS THAT MATTER.</span>
      </footer>
    </div>
  );
}

export default Home;
