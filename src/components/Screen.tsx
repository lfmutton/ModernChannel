import "bootstrap/dist/css/bootstrap.css";
import App from "../App";
import "../App.css";
import React, { useState } from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const WelcomeScreen: React.FC = () => {
  const [isHovered, setIsHovered] = useState<"login" | "signup" | null>(null);
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
          "radial-gradient(circle, rgba(29, 26, 26, 0.8) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "2rem",
          textShadow: "0 0 10px rgba(98, 95, 95, 0.5)",
          letterSpacing: "2px",
        }}
      >
        Welcome to Modern Channel
      </h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{
            padding: "12px 30px",
            fontSize: "23px",
            fontWeight: "bold",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backgroundColor: isHovered === "login" ? "#4a6bff" : "#ffffff",
            color: "black",
            boxShadow:
              isHovered === "login"
                ? "0 0 15px rgba(43, 47, 187, 0.7)"
                : "0 0 10px rgba(42, 74, 255, 0.5)",
            transform: isHovered === "login" ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered("login")}
          onMouseLeave={() => setIsHovered(null)}
          onClick={() => console.log("Login clicked")}
        >
          Login
        </button>

        <button
          style={{
            padding: "12px 30px",
            fontSize: "23px",
            fontWeight: "bold",
            borderRadius: "25px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backgroundColor: isHovered === "signup" ? "#ff6b4a" : "#ffffff",
            color: "black",
            boxShadow:
              isHovered === "signup"
                ? "0 0 15px rgba(255, 107, 74, 0.7)"
                : "0 0 10px rgba(255, 74, 42, 0.5)",
            transform: isHovered === "signup" ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered("signup")}
          onMouseLeave={() => setIsHovered(null)}
          onClick={() => console.log("Sign Up clicked")}
        >
          Sign Up
        </button>
      </div>

      {/* Optional decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "0.8rem",
          opacity: 0.7,
        }}
      >
        © 2025 Modern Channel
      </div>
    </div>
  );
};

export default WelcomeScreen;
