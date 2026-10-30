import React from "react";
export const Footer=({ copyrightText })=>{
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "10px 20px",
        background: "#f1f5f9",
        borderTop: "1px solid #e2e8f0",
        height: "40px",
        boxSizing: "border-box",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>{copyrightText}</p>
    </footer>
  );
};