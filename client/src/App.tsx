import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RiddlePage from "./pages/RiddlePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SetProfileImagePage from "./pages/SetProfileImagePage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/riddle:id" element={<RiddlePage />} />
          <Route path="/pfp" element={<SetProfileImagePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
