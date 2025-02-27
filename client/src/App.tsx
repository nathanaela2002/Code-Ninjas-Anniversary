import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RiddlePage from "./pages/RiddlePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import SetProfileImagePage from "./pages/SetProfileImagePage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import PrizePage from "./pages/PrizePage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/riddle/:id" element={<RiddlePage />} />
          <Route path="/pfp" element={<SetProfileImagePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />'
          <Route path="/prizes" element={<PrizePage />} />         
          <Route path="/privacy" element={<PrivacyPage />} />'         
          <Route path="/terms" element={<TermsPage />} />'
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
