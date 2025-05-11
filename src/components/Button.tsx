import { Link } from "react-router-dom";
import React from "react";

interface ButtonProps {
  color: string;
  hoverColor: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color,
  hoverColor,
  to,
  disabled = false,
  onClick,
  children,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  if (to && !disabled) {
    return (
      <Link
        to={to}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          borderRadius: "20px",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          backgroundColor: disabled
            ? "#cccccc"
            : isHovered
            ? hoverColor
            : color,
          color: disabled ? "#666666" : "black",
          boxShadow: disabled
            ? "none"
            : isHovered
            ? `0 0 12px ${hoverColor}80`
            : `0 0 8px ${color}80`,
          transform: isHovered && !disabled ? "scale(1.03)" : "scale(1)",
          textDecoration: "none",
          display: "inline-block",
          textAlign: "center",
          opacity: disabled ? 0.7 : 1,
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
        padding: "1rem 2rem",
        fontSize: "1.1rem",
        fontWeight: 600,
        borderRadius: "20px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        backgroundColor: disabled ? "#cccccc" : isHovered ? hoverColor : color,
        color: disabled ? "#666666" : "black",
        boxShadow: disabled
          ? "none"
          : isHovered
          ? `0 0 12px ${hoverColor}80`
          : `0 0 8px ${color}80`,
        transform: isHovered && !disabled ? "scale(1.03)" : "scale(1)",
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center",
        opacity: disabled ? 0.7 : 1,
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
