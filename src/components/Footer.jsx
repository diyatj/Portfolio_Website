import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <h3 className="footer-headline">
        </h3>
        <div className="footer-links">
          <a href="https://github.com/diyatj" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/in/diyajibu" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://EDIT-LINK-your-art-site.com" target="_blank" rel="noopener noreferrer">Art Studio ↗</a>
          <a href="mailto:diyatresa.jibu@gmail.com">Email ↗</a>
        </div>
        <p className="footer-fine">Built by Diya · Dallas, TX</p>
      </div>
    </footer>
  );
};

export default Footer;
