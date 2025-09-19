import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>🚀 Fast Track Academy</h1>
          </div>
          <div className="nav-links">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/classroom" className="nav-link nav-link-primary">
              Enter Classroom
            </Link>
          </div>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to the Virtual Classroom
            </h1>
            <p className="hero-subtitle">
              Experience interactive learning in our game-like educational environment
            </p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">👥</span>
                <span>Real-time Collaboration</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎮</span>
                <span>Interactive Learning</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💬</span>
                <span>Live Chat System</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🧠</span>
                <span>AI-Enhanced Education</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/classroom" className="btn btn-primary btn-large">
                🏫 Enter Virtual Classroom
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                📚 Learn More
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="classroom-preview">
              <div className="preview-screen">
                <div className="preview-classroom">
                  <div className="preview-board"></div>
                  <div className="preview-desk"></div>
                  <div className="preview-desk"></div>
                  <div className="preview-desk"></div>
                  <div className="preview-avatar student"></div>
                  <div className="preview-avatar teacher"></div>
                  <div className="preview-chat">
                    <div className="chat-bubble">Welcome to class! 👋</div>
                  </div>
                </div>
              </div>
              <p className="preview-caption">Interactive 2D Classroom Environment</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2>Revolutionizing Education Through Technology</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-card-icon">🎯</div>
                <h3>Competency-Based Learning</h3>
                <p>Progress at your own pace with skills-focused advancement</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">🤖</div>
                <h3>AI-Enhanced Tools</h3>
                <p>Personalized tutoring and instant feedback systems</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">🌍</div>
                <h3>Global Collaboration</h3>
                <p>Connect with learners and mentors worldwide</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon">⚡</div>
                <h3>Accelerated Learning</h3>
                <p>Achieve 3x faster learning outcomes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Active Learners</div>
              </div>
              <div className="stat">
                <div className="stat-number">42</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">8</div>
                <div className="stat-label">AI Tools Mastered</div>
              </div>
              <div className="stat">
                <div className="stat-number">156</div>
                <div className="stat-label">Skills Developed</div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join our community of learners who refuse to accept educational limitations</p>
            <Link to="/classroom" className="btn btn-primary btn-large">
              🚀 Enter Virtual Classroom Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🚀 Fast Track Academy</h3>
              <p>Empowering minds through AI & technology</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Learning</h4>
                <Link to="/classroom">Virtual Classroom</Link>
                <Link to="/about">About Us</Link>
              </div>
              <div className="footer-column">
                <h4>Community</h4>
                <a href="#" onClick={(e) => e.preventDefault()}>Discord</a>
                <a href="#" onClick={(e) => e.preventDefault()}>GitHub</a>
                <a href="#" onClick={(e) => e.preventDefault()}>YouTube</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Fast Track Academy. Built with ❤️ for learners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;