import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Screen from "../components/Screen";
import Button from "../components/Button";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { ImTv } from "react-icons/im";
import { FaBars } from "react-icons/fa6";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const HomePage: React.FC = () => {
  const handleLogin = () => console.log("Login clicked");
  const handleSignUp = () => console.log("Sign Up clicked");

  return (
    <Screen color="000000">
      <FaBars
        size={40}
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          gap: "500px",
        }}
      >
        <div>
          <FaPlay size={100} />
          <h1>Assistir</h1>
        </div>
        <div>
          <ImTv size={100} />
          <h1>Programar</h1>
        </div>
      </div>
    </Screen>
  );
};

export default HomePage;
