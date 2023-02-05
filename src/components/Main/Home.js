import React from "react";
import Typewriter from "typewriter-effect";
import "./Home.css";
const Home = () => {
  return (
    <div className="home">
      Welcome to &nbsp;
      <Typewriter
        onInit={(typewriter) => {
          typewriter

            .typeString(" Crypto Funding")

            .pauseFor(600)
            .deleteAll()
            .typeString(" Blockchain Funding")
            .start();
        }}
      />
    </div>
  );
};

export default Home;
