import React from "react";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <header className="site-header">
      <div className="nav-row">
        <a href="#top" className="wordmark">
          diya<span>.</span>
        </a>
        <nav className="social-links">
          <a href="https://github.com/diyatj" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/diyajibu" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://EDIT-LINK-your-art-site.com" target="_blank" rel="noopener noreferrer">
            Art
          </a>
          <a href="mailto:diyatresa.jibu@gmail.com">Email</a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
