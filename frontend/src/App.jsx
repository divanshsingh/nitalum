import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NitalumPasswordPage from "./pages/NitalumPasswordPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

function ProtectedRoute({ role, children }) {
  const userRole = sessionStorage.getItem("role");
  if (!userRole) return <Navigate to="/" replace />;
  if (role && userRole !== role) return <Navigate to={`/${userRole === "admin" ? "admin" : "home"}`} replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<NitalumPasswordPage />} />
        <Route path="/home"  element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        {/* <Route path="*"      element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}