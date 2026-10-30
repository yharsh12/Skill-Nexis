import React from "react";
export const Card=({ title, subtitle, content })=>{
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        padding: "16px 20px",
        marginBottom: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          margin: "0 0 4px 0",
          color: "#0f172a",
          fontSize: "1.8rem",
          fontWeight: "700",
          lineHeight: "1.2",
        }}
      >
        {title}
      </h3>
      {subtitle && (
        <span
          style={{
            display: "inline-block",
            color: "#0284c7",
            fontWeight: "600",
            fontSize: "1rem",
            marginBottom: "6px",
          }}
        >
          {subtitle}
        </span>
      )}
      <p
        style={{
          margin: 0,
          color: "#334155",
          fontSize: "1.1rem",
          lineHeight: "1.5",
        }}
      >
        {content}
      </p>
    </div>
  );
};