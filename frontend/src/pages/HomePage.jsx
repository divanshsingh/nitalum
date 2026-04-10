import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import Hero from "../components/Hero";


export default function HomePage() {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    navigate("/");
  };
 
  return (
    <div style={{ margin: 0, padding: 0, background: "#0f0f23" }}>
      <Navbar onLogout={handleLogout} />
      <Hero />
      <Gallery />
      <Footer />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </div>
  );
}