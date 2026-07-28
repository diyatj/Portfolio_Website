import React from "react";
import { timelineData } from "../data/timeline";
import "../styles/Timeline.css";

const Timeline = () => {
  return (
    <section id="timeline">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">How it lined up</h2>
          <p className="section-note">
            Scroll sideways — engineering, art, and school, running at the same time.
          </p>
        </div>

        <div className="tl-scroll">
          <div className="tl-track">
            <div className="tl-line"></div>
            {timelineData.map((node, i) => (
              <div className="tl-node" key={i}>
                <div className="tl-year">{node.year}</div>
                <div className="tl-dot"></div>
                <div className="tl-label">{node.label}</div>
                <div className="tl-desc">{node.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
