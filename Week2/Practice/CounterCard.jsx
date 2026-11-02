import React,{ useState } from "react";
export function CounterDisplay({title,count}){
  return(
    <div>
      <h3 style={{
        margin:"0 0 8px 0",color:"#1e293b"}}>{title}</h3>
      <p style={{
        fontSize:"2rem",fontWeight:"bold",color:"#0284c7",margin:"0 0 16px 0"}}>{count}</p>
    </div>
  );
}
export default function CounterCard({initialValue=0,step=1}){
  const [count,setCount]=useState(initialValue);
  return (
    <div style={{
        fontFamily:"sans-serif",maxWidth:"300px",padding:"20px",border:"1px solid #e2e8f0",borderRadius:"8px",textAlign:"center",background:"#fff"
        }}>
      <CounterDisplay title="Current Counter" count={count}/>
      <div style={{
        display:"flex",gap:"10px",justifyContent:"center"
        }}>
        <button
          onClick={()=>setCount(count-step)}
          style={{
            padding:"8px 16px",background:"#64748b",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer"
        }}
        >
          -{step}
        </button>
        <button
          onClick={()=>setCount(initialValue)}
          style={{
            padding:"8px 16px",background:"#cbd5e1",color:"#0f172a",border:"none",borderRadius:"4px",cursor:"pointer"
        }}
        >
          Reset
        </button>
        <button
          onClick={()=>setCount(count+step)}
          style={{
            padding:"8px 16px",background:"#0284c7",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer"
        }}
        >
          +{step}
        </button>
      </div>
    </div>
  );
}