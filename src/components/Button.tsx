// Button.tsx
import { Link } from "react-router-dom";
import React from "react";

interface ButtonProps {
  color: string;
  hoverColor: string;
  to?: string; // New prop for navigation
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color,
  hoverColor,
  to,
  onClick,
  children,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // If 'to' prop is provided, return a Link, otherwise return a button
  if (to) {
    return (
      <Link
        to={to}
        style={{
          padding: "10px 24px",
          fontSize: "1.3rem",
          fontWeight: 600,
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
          backgroundColor: isHovered ? hoverColor : color,
          color: "black",
          boxShadow: isHovered
            ? `0 0 12px ${hoverColor}80`
            : `0 0 8px ${color}80`,
          transform: isHovered ? "scale(1.03)" : "scale(1)",
          textDecoration: "none",
          display: "inline-block",
          textAlign: "center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={{
        padding: "10px 24px",
        fontSize: "0.9rem",
        fontWeight: 600,
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: isHovered ? hoverColor : color,
        color: "black",
        boxShadow: isHovered
          ? `0 0 12px ${hoverColor}80`
          : `0 0 8px ${color}80`,
        transform: isHovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
