import React, { useState } from "react";
import { experienceData } from "../data/experience";
import ExperienceModal from "./ExperienceModal";
import "../styles/ExperienceCards.css";

const ExperienceCards = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section id="work">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title">Experience, saved like pins</h2>
          <p className="section-note">
            Click a card to open the full board — details, stack, and what it taught me.
          </p>
        </div>

        <div className="pin-columns">
          {experienceData.map((item) => (
            <div
              key={item.id}
              className="pin-card"
              onClick={() => setActiveItem(item)}
            >
              <span className="pin-tag">{item.tag}</span>
              <h3 className="pin-role">{item.title}</h3>
              <p className="pin-org">{item.org}</p>
              <p className="pin-dates">{item.dates}</p>
              <p className="pin-blurb">{item.blurb}</p>
              <div className="pin-tags">
                {item.chips.map((chip) => (
                  <span className="chip" key={chip}>{chip}</span>
                ))}
              </div>
              <div className="pin-expand">Open board ↗</div>
            </div>
          ))}
        </div>
      </div>

      {activeItem && (
        <ExperienceModal item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
};

export default ExperienceCards;
