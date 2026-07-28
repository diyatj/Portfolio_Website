import React from "react";
import GemCanvas from "./GemCanvas";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Data Engineer → Product Builder</div>
          <h1 className="headline">
            Diya Jibu
          </h1>
          <p className="hero-sub">
            I build the pipelines behind the scenes and I'm working my way toward
            building the product in front of them. Currently engineering data
            systems at Sunoco.
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary">See the work</a>
            <a href="#timeline" className="btn btn-ghost">The timeline</a>
          </div>
        </div>

        <GemCanvas />
      </div>
    </section>
  );
};

export default Hero;
