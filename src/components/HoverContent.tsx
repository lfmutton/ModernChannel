import React from "react";

type HoverEffectType = "scale" | "shadow" | "colorChange";

interface HoverableCardProps {
  children: React.ReactNode;
  hoverEffect?: HoverEffectType; // Optional prop with specific values
  onClick?: () => void;
}

const HoverableCard: React.FC<HoverableCardProps> = ({
  children,
  hoverEffect = "scale", // Default value ensures it's never undefined
  onClick,
}) => {
  const baseStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "3px dotted black",
    borderRadius: "4rem",
    padding: "6rem 28rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    height: "80%",
    width: "80%",
    margin: "0 auto",
  };

  const getHoverStyles = (): React.CSSProperties => {
    switch (
      hoverEffect // hoverEffect is now guaranteed to be a string
    ) {
      case "scale":
        return { transform: "scale(1.10)" };
      case "shadow":
        return { boxShadow: "0 10px 20px rgba(0,0,0,0.2)" };
      case "colorChange":
        return { backgroundColor: "rgba(0,0,0,0.1)" };
      default:
        return { transform: "scale(1.05)" };
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        ...baseStyles,
        ...(isHovered ? getHoverStyles() : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default HoverableCard;
