import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Screen from "../components/Screen";
import Button from "../components/Button";
import React, { useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const LoginPage: React.FC = () => {
  const handleLogin = () => console.log("Login clicked");
  const handleSignUp = () => console.log("Sign Up clicked");

  return (
    <Screen color="1338b5">
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          textShadow: "0 0 8px rgba(127, 124, 124, 0.5)",
          letterSpacing: "1px",
        }}
      >
        Modern Channel
      </h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          marginBottom: "24px",
        }}
      >
        <textarea
          placeholder="username"
          required
          style={{
            height: "40px",
            width: "400px",
            paddingLeft: "15px",
            paddingTop: "7px",
            paddingBottom: "7px",
            border: "none",
            outline: "none",
            resize: "none",
            borderRadius: "5px",
          }}
        ></textarea>

        <textarea
          placeholder="password"
          required
          style={{
            height: "40px",
            width: "400px",
            paddingLeft: "15px",
            paddingTop: "7px",
            paddingBottom: "7px",
            border: "none",
            outline: "none",
            resize: "none",
            borderRadius: "5px",
          }}
        ></textarea>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <Button
          color="#f3f5f7"
          hoverColor="#0075ea"
          onClick={handleSignUp}
          to="/home"
        >
          Login
        </Button>
      </div>
    </Screen>
  );
};

export default LoginPage;
