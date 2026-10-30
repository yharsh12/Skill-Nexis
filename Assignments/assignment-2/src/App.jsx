import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { Form } from "./components/Form";
export default function App(){
  const [cards,setCards]=useState([{
      title: "HTML5 Semantic Structure",
      content: "Using headers, nav, section, and article properly.",
    },
    {
      title: "CSS Flexbox & Grid",
      content: "Structuring 1D and 2D elements responsively across the screen.",
    },
  ]);
  const navLinks=[
    { label: "Home",href: "#" },
    { label: "Components",href: "#" },
  ];
  const handleAddCard=(newCard)=>{
    setCards((prev)=>[...prev,newCard]);
  };
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#f8fafc",
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Header title="React Components Lab" navLinks={navLinks} />
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "24px",
          padding: "20px 30px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <section
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{
            fontSize: "1.8rem",color: "#0f172a",margin: "0 0 16px 0" }}>
            Add New Card
          </h2>
          <Form onAddCard={handleAddCard} />
        </section>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            paddingRight: "8px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{
            fontSize: "1.8rem",color: "#0f172a",margin: "0 0 16px 0" }}>
            Dynamic Cards
          </h2>
          {cards.map((item, index)=>(
            <Card
              key={index}
              title={item.title}
              subtitle={`Component #${index + 1}`}
              content={item.content}
            />
          ))}
        </section>
      </main>
      <Footer copyrightText="&copy; Full Stack Development Program" />
    </div>
  );
}