import React from "react";
export default function ProductInfo(){
  const product={
    id:101,
    name:"Wireless Noise-Canceling Headphones",
    brand:"AudioPro",
    price:199.99,
    inStock:true,
    description:"High-fidelity audio with active noise cancellation and 40-hour battery life."
  };
  return(
    <div style={{
        fontFamily:"sans-serif",maxWidth:"400px",padding:"20px",border:"1px solid #cbd5e1",borderRadius:"8px",background:"#ffffff"
        }}>
      <span style={{
        fontSize:"0.8rem",color:"#64748b",textTransform:"uppercase"
        }}>{product.brand}</span>
      <h2 style={{
        margin:"8px 0",color:"#0f172a"
        }}>{product.name}</h2>
      <p style={{
        color:"#475569",fontSize:"0.95rem",lineHeight:"1.5"
        }}>{product.description}</p>
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px"
        }}>
        <span style={{
            fontSize:"1.3rem",fontWeight:"bold",color:"#0284c7"
            }}>${product.price}</span>
        <span style={{
            color:product.inStock?"#16a34a":"#dc2626",fontWeight:"600",fontSize:"0.9rem"
            }}>
          {product.inStock?"In Stock":"Out of Stock"}
        </span>
      </div>
    </div>
  );
}