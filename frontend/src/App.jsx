import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NitalumPasswordPage from "./pages/NitalumPasswordPage";
import HomePage            from "./pages/HomePage";
import AdminPage           from "./pages/AdminPage";
import BatchPage           from "./pages/BatchPage";
import AddProfilePage from "./pages/AddProfilePage";
import ProfilePage from "./pages/ProfilePage";

function ProtectedRoute({ role, children }) {
  const userRole = sessionStorage.getItem("role");
  if (!userRole) return <Navigate to="/" replace />;
  if (role && userRole !== role) return <Navigate to={userRole === "admin" ? "/admin" : "/home"} replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<NitalumPasswordPage />} />

        {/* Member + Admin */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/batch/:year" element={<ProtectedRoute><BatchPage /></ProtectedRoute>} />
        <Route path="/add-profile" element={<ProtectedRoute><AddProfilePage /></ProtectedRoute>} />        
        <Route path="/profile/:userNo" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Admin only */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}