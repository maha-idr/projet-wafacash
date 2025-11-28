import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserRole } from "./components/auth";
import Menu from "./components/Menu";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Affectation from "./pages/Affectation";
import AgencyForm from "./pages/Saisie";

export default function App() {
  const userRole = getUserRole();
  return (
    <BrowserRouter>
    <Menu userRole={userRole} />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {userRole === "Admin" && <Route path="/affectation" element={<Affectation />} />}
        {userRole === "Commercial" && <Route path="/saisie" element={<AgencyForm />} />}
      </Routes>
    </BrowserRouter>
  );
}