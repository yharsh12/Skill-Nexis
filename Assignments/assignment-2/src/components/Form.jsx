import React, { useState } from "react";
import { Button } from "./Button";
export const Form=({ onAddCard })=>{
  const [title, setTitle]=useState("");
  const [content, setContent]=useState("");
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()) return;
    onAddCard({ title,content });
    setTitle("");
    setContent("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <input
        type="text"
        placeholder="Enter Large Card Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "12px 14px",
          border: "2px solid #cbd5e1",
          borderRadius: "6px",
          fontSize: "1.35rem",
          fontWeight: "600",
          outline: "none",
          boxSizing: "border-box",
          width: "100%",
        }}
      />
      <textarea
        placeholder="Enter Card Content / Description..."
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          padding: "12px 14px",
          border: "2px solid #cbd5e1",
          borderRadius: "6px",
          fontSize: "1.1rem",
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
          width: "100%",
          resize: "none",
        }}
      />
      <div style={{ marginTop: "4px" }}>
        <Button text="Add New Card" type="submit" variant="primary" />
      </div>
    </form>
  );
};