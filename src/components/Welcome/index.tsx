import './index.css';

export const WelcomeMessage = () => {
    return (
      <div className="welcome-container">
        <h1 className="welcome-title">
          Welcome to <span className="gradient-text">Persona AI</span> Content Generator!
        </h1>
        <p className="welcome-subtitle">
          Transform your ideas into stunning visuals with AI
        </p>
        <div className="animated-arrow">
          <div className="arrow-line"></div>
          <div className="arrow-head"></div>
        </div>
      </div>
    );
  };