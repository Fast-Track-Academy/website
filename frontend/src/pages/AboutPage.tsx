import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/" className="brand-link">🚀 Fast Track Academy</Link>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/classroom" className="nav-link nav-link-primary">
              Enter Classroom
            </Link>
          </div>
        </nav>
      </header>

      <main className="about-main">
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>About Fast Track Academy</h1>
              <p className="hero-subtitle">
                Revolutionizing Education Through AI & Technology
              </p>
              <p className="hero-description">
                Empowering young minds to achieve academic excellence beyond traditional constraints
              </p>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-content">
                <h2>🌟 What We're Building</h2>
                <p>
                  Fast Track Academy is transforming education from a time-based system to a 
                  competency-based, AI-enhanced learning ecosystem that accelerates student 
                  achievement while fostering creativity, critical thinking, and real-world skills.
                </p>
              </div>
              <div className="mission-visual">
                <div className="learning-path">
                  <div className="path-step">
                    <div className="step-icon">🎯</div>
                    <div className="step-text">Set Goals</div>
                  </div>
                  <div className="path-connector"></div>
                  <div className="path-step">
                    <div className="step-icon">🤖</div>
                    <div className="step-text">AI Assistance</div>
                  </div>
                  <div className="path-connector"></div>
                  <div className="path-step">
                    <div className="step-icon">🚀</div>
                    <div className="step-text">Accelerate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="goals-section">
          <div className="container">
            <h2>🎯 Our Impact Goals</h2>
            <div className="goals-grid">
              <div className="goal-card">
                <div className="goal-icon">⚡</div>
                <h3>3x Faster Learning</h3>
                <p>Achieve traditional learning outcomes in 1/3 the time</p>
              </div>
              <div className="goal-card">
                <div className="goal-icon">🛠️</div>
                <h3>Real-World Skills</h3>
                <p>Focus on practical, applicable knowledge and abilities</p>
              </div>
              <div className="goal-card">
                <div className="goal-icon">🤖</div>
                <h3>AI Collaboration</h3>
                <p>Teach students to leverage AI as a learning and creative partner</p>
              </div>
              <div className="goal-card">
                <div className="goal-icon">🔮</div>
                <h3>Future-Ready</h3>
                <p>Prepare learners for careers and challenges that don't exist yet</p>
              </div>
            </div>
          </div>
        </section>

        <section className="framework-section">
          <div className="container">
            <h2>🛠️ Our Learning Framework</h2>
            <div className="framework-grid">
              <div className="framework-category">
                <h3>🧠 STEM Acceleration</h3>
                <ul>
                  <li>Advanced math & science</li>
                  <li>Real-world applications</li>
                  <li>Problem-solving mastery</li>
                </ul>
              </div>
              <div className="framework-category">
                <h3>💻 Digital Creation</h3>
                <ul>
                  <li>Programming & AI</li>
                  <li>Web/app development</li>
                  <li>Open-source contribution</li>
                </ul>
              </div>
              <div className="framework-category">
                <h3>🎨 Creative Arts</h3>
                <ul>
                  <li>Design & storytelling</li>
                  <li>Digital art & media</li>
                  <li>Creative expression</li>
                </ul>
              </div>
              <div className="framework-category">
                <h3>📚 Communication</h3>
                <ul>
                  <li>Advanced writing</li>
                  <li>Public speaking</li>
                  <li>Digital media</li>
                </ul>
              </div>
              <div className="framework-category">
                <h3>🌍 Global Awareness</h3>
                <ul>
                  <li>Cultural competency</li>
                  <li>Language learning</li>
                  <li>Global challenges</li>
                </ul>
              </div>
              <div className="framework-category">
                <h3>💡 Entrepreneurship</h3>
                <ul>
                  <li>Business development</li>
                  <li>Innovation mindset</li>
                  <li>Startup creation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="ai-section">
          <div className="container">
            <h2>🤖 AI-Enhanced Learning</h2>
            <p className="section-subtitle">
              We integrate cutting-edge AI tools to personalize and accelerate learning:
            </p>
            <div className="ai-features">
              <div className="ai-feature">
                <div className="feature-header">
                  <span className="feature-emoji">🎯</span>
                  <h3>Personalized Tutoring</h3>
                </div>
                <p>AI assistants adapted to individual learning styles</p>
              </div>
              <div className="ai-feature">
                <div className="feature-header">
                  <span className="feature-emoji">🤝</span>
                  <h3>Project Collaboration</h3>
                </div>
                <p>AI as creative and technical partner</p>
              </div>
              <div className="ai-feature">
                <div className="feature-header">
                  <span className="feature-emoji">⚡</span>
                  <h3>Instant Feedback</h3>
                </div>
                <p>Real-time assessment and improvement suggestions</p>
              </div>
              <div className="ai-feature">
                <div className="feature-header">
                  <span className="feature-emoji">🔍</span>
                  <h3>Research Acceleration</h3>
                </div>
                <p>AI-powered information gathering and analysis</p>
              </div>
            </div>
          </div>
        </section>

        <section className="comparison-section">
          <div className="container">
            <h2>📊 Our Learning Model</h2>
            <div className="comparison-table">
              <div className="comparison-header">
                <div className="comparison-col">Traditional Education</div>
                <div className="comparison-col">Fast Track Academy</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-item traditional">
                  <span className="comparison-icon">⏰</span>
                  Time-based progression
                </div>
                <div className="comparison-item modern">
                  <span className="comparison-icon">🎯</span>
                  Competency-based advancement
                </div>
              </div>
              <div className="comparison-row">
                <div className="comparison-item traditional">
                  <span className="comparison-icon">📚</span>
                  Passive content consumption
                </div>
                <div className="comparison-item modern">
                  <span className="comparison-icon">🔧</span>
                  Active project creation
                </div>
              </div>
              <div className="comparison-row">
                <div className="comparison-item traditional">
                  <span className="comparison-icon">🏫</span>
                  Fixed curriculum
                </div>
                <div className="comparison-item modern">
                  <span className="comparison-icon">🔄</span>
                  Adaptive learning paths
                </div>
              </div>
              <div className="comparison-row">
                <div className="comparison-item traditional">
                  <span className="comparison-icon">📝</span>
                  Standardized testing
                </div>
                <div className="comparison-item modern">
                  <span className="comparison-icon">📈</span>
                  Portfolio-based assessment
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-section">
          <div className="container">
            <h2>👨‍💻 About Our Founder</h2>
            <div className="founder-card">
              <div className="founder-avatar">
                <div className="avatar-placeholder">🧠</div>
              </div>
              <div className="founder-content">
                <h3>Fast Track Academy Team</h3>
                <p className="founder-title">Educational Innovators & Technology Enthusiasts</p>
                <p className="founder-bio">
                  Our team is passionate about revolutionizing education through cutting-edge 
                  technology and innovative teaching methodologies. We believe that learning 
                  should be personalized, engaging, and accelerated through the power of AI 
                  and modern tools.
                </p>
                <div className="founder-quote">
                  <blockquote>
                    "The future belongs to those who learn, unlearn, and relearn faster than everyone else."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="success-section">
          <div className="container">
            <h2>🚀 Success Stories</h2>
            <div className="success-stories">
              <div className="story-card">
                <div className="story-icon">🏆</div>
                <p>13-year-old builds AI-powered environmental monitoring app</p>
              </div>
              <div className="story-card">
                <div className="story-icon">💻</div>
                <p>Student creates open-source learning platform used by 100+ peers</p>
              </div>
              <div className="story-card">
                <div className="story-icon">🎨</div>
                <p>Digital art portfolio leads to freelance design opportunities</p>
              </div>
              <div className="story-card">
                <div className="story-icon">📱</div>
                <p>Mobile app addressing mental health wins regional competition</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Experience the Future of Learning?</h2>
            <p>Join our virtual classroom and see how we're revolutionizing education</p>
            <Link to="/classroom" className="btn btn-primary btn-large">
              🏫 Enter Virtual Classroom
            </Link>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🚀 Fast Track Academy</h3>
              <p>Empowering minds through AI & technology</p>
            </div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/classroom">Virtual Classroom</Link>
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

export default AboutPage;