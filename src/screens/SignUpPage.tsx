import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Button from "../components/Button";
import React, { useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const SignUpPage: React.FC = () => {
  const handleLogin = () => console.log("Login clicked");
  const handleSignUp = () => console.log("Sign Up clicked");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        color: "white",
        fontFamily: "IBM Plex Serif",
        background:
          "radial-gradient(circle, rgba(189, 58, 58, 0.8) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
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
          gap: "30px",
          flexDirection: "column",
          marginBottom: "24px",
        }}
      >
        <textarea
          placeholder="username"
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
          placeholder="e-mail"
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

        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
        >
          <textarea
            placeholder="user"
            style={{
              height: "40px",
              width: "185px",
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
            placeholder="confirm password"
            style={{
              height: "40px",
              width: "185px",
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

        <textarea
          placeholder="birthday"
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
          hoverColor="#ff6b4a"
          onClick={handleLogin}
          to="/login"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
