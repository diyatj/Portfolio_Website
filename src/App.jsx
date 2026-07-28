import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ExperienceCards from "./components/ExperienceCards";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main id="top">
        <Hero />
        <ExperienceCards />
        <Timeline />
      </main>
      <Footer />
    </div>
  );
}

export default App;
