import React from "react";
import "./App.css"; // We'll create this next

const App: React.FC = () => {
  return (
    <div className="old-tv-screen">
      <div className="screen-content">
        {/* Your content goes here */}
        <h1>Welcome to the Old TV</h1>
        <p>This is a simulation of an old TV screen.</p>
      </div>
    </div>
  );
};

export default App;
