import React from "react";
export const Header=({ title, navLinks })=>{
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        background: "#0f172a",
        color: "#ffffff",
        height: "60px",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <h1 style={{ 
        margin: 0,fontSize: "1.6rem",fontWeight: "700" }}>{title}</h1>
      <nav style={{ 
        display: "flex",gap: "20px" }}>
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            style={{
              color: "#38bdf8",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};