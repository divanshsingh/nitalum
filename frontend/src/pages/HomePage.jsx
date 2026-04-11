import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Layout from "../components/Layout";


export default function HomePage() {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    navigate("/");
  };
 
   return (
    <div style={{ margin: 0, padding: 0, background: "#fafaf8" }}>
      <Layout>
      <Hero />
      <Gallery />
      <Footer />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fafaf8; }
      `}</style>
      </Layout>
    </div>
  );
}