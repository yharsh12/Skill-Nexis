import React from "react";
export const Button=({ text,onClick,variant="primary",type="button" })=>{
  const btnStyle={
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: variant === "primary" ? "#0284c7" : "#64748b",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background 0.2s",
  };
  return (
    <button type={type} style={btnStyle} onClick={onClick}>
      {text}
    </button>
  );
};