import React, { useEffect } from "react";
import "../styles/ExperienceModal.css";

const ExperienceModal = ({ item, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <span className="modal-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p className="modal-org">{item.org}</p>
        <p className="modal-dates">{item.dates}</p>
        <ul>
          {item.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceModal;
