import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RiddlePage from "./pages/RiddlePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

function App() {
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/riddle:id" element={<RiddlePage />} />
  </Routes>;
}

export default App;
