import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Button from "../components/Button";
import HoverableCard from "../components/HoverContent";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { ImTv } from "react-icons/im";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
</style>;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleProfileNavigation = () => {
    navigate("/ProfilePage");
  };

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
          "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      <HoverableCard>
        <FaPlay size={90} />
        <h1>Assistir</h1>
      </HoverableCard>
      <div
        style={{
          backgroundColor: "black",
          opacity: "100%",
          height: "100vh",
          width: "100wh",
        }}
      ></div>

      <HoverableCard>
        <ImTv size={90} />
        <h1>Programar</h1>
      </HoverableCard>

      <FaBars
        size={40}
        onClick={handleProfileNavigation} // Adicione o evento de clique aqui
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          cursor: "pointer", // Adicione cursor pointer para indicar que é clicável
        }}
      />
    </div>
  );
};

export default HomePage;

//display: "grid",
//gridTemplateColumns: "49.9% 0.2% 49.9%",
//alignItems: "center",
