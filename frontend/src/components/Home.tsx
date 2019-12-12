import React from 'react';

const Home: React.FC = () => {

  return (
    <div>
      <h1>Conor Burke</h1>
      <h2>Software Engineer. Web Develper. AI Graduate Student.</h2>
      <div className="icon-container icons">
          <a href="https://www.linkedin.com/in/conorburke89/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-4x"></i>
          </a>
          <a href="https://github.com/conorburke" target="_blank"rel="noopener noreferrer">
            <i className="fab fa-github fa-4x"></i>
          </a>
        </div>
    </div>
  );
}

export default Home;