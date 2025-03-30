import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Button from "../components/Button";
import Screen from "../components/Screen";
import React, { useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const WelcomeScreen: React.FC = () => {
  const handleLogin = () => console.log("Login clicked");
  const handleSignUp = () => console.log("Sign Up clicked");

  return (
    <Screen color="000000">
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1.5rem",
          textShadow: "0 0 8px rgba(127, 124, 124, 0.5)",
          letterSpacing: "1px",
        }}
      >
        Welcome to Modern Channel
      </h1>

      <div style={{ display: "flex", gap: "15px" }}>
        <Button
          color="#f3f5f7"
          hoverColor="#0075ea"
          onClick={handleLogin}
          to="/login"
        >
          Login
        </Button>

        <Button
          color="#f3f5f7"
          hoverColor="#ff6b4a"
          onClick={handleSignUp}
          to="/signup"
        >
          Sign Up
        </Button>
      </div>
    </Screen>
  );
};

export default WelcomeScreen;
