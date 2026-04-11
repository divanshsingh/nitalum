import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <Navbar onLogout={handleLogout} activePath={location.pathname} />
      <main>{children}</main>
    </div>
  );
}