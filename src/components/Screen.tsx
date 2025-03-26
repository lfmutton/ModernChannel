import "bootstrap/dist/css/bootstrap.css";
import App from "../App";
import "../App.css";

import React from "react";

interface GradientBlackScreenProps {
  centerOpacity?: number;
  midOpacity?: number;
  edgeOpacity?: number;
  size?: string;
  zIndex?: number;
}

const GradientBlackScreen: React.FC<GradientBlackScreenProps> = ({
  centerOpacity = 0.8,
  midOpacity = 0.9,
  edgeOpacity = 1,
  size = "70%",
  zIndex = 1000,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: `radial-gradient(circle, 
          rgba(0,0,0,${centerOpacity}) 0%, 
          rgba(0,0,0,${midOpacity}) ${size}, 
          rgba(0,0,0,${edgeOpacity}) 100%)`,
        zIndex: zIndex,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white", // Applying the text color
      }}
    >
      <App></App>
    </div>
  );
};

export default GradientBlackScreen;
