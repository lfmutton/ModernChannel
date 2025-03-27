import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./screens/WelcomePage";
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";
import HomePage from "./screens/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
