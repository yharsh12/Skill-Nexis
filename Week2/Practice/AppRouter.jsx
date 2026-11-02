import React from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
function Home(){
  return<div style={{
    padding:"20px"
    }}>
        <h2>Home Page</h2>
        <p>Welcome to the React Router multi-page demonstration.</p>
    </div>;
}
function About(){
  return<div style={{
    padding:"20px"
    }}>
        <h2>About Us</h2>
        <p>We build full-stack applications across the MERN stack.</p>
        </div>;
}
function Contact(){
  return<div style={{
    padding:"20px"}}>
        <h2>Contact Page</h2>
        <p>Email: contact@example.com</p>
        </div>;
}
export default function AppRouter(){
  return (
    <BrowserRouter>
      <div style={{
        fontFamily:"sans-serif",minHeight:"100vh",background:"#f8fafc"
        }}>
        <nav style={{
            display:"flex",gap:"20px",padding:"16px 20px",background:"#0f172a"
            }}>
          <Link to="/" style={{
            color:"#38bdf8",textDecoration:"none",fontWeight:"bold"
            }}>Home</Link>
          <Link to="/about" style={{
            color:"#f8fafc",textDecoration:"none"
            }}>About</Link>
          <Link to="/contact" style={{
            color:"#f8fafc",textDecoration:"none"
            }}>Contact</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}