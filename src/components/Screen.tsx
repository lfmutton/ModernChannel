interface ScreenProps {
  color: string;
  children: React.ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ color, children }) => {
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

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
        background: `radial-gradient(circle, rgba(${r},${g},${b},0.8) 0%, rgba(0,0,0,1) 100%)`,
      }}
    >
      {children}
    </div>
  );
};

export default Screen;
