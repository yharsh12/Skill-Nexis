import React,{ useState } from "react";
export default function TodoApp(){
  const [tasks,setTasks]=useState([
    {id:1,text:"Learn React State & Props"},
    {id:2,text:"Set up Node.js Express server"}
  ]);
  const [inputVal,setInputVal]=useState("");
  const handleAddTask=(e)=>{
    e.preventDefault();
    if(!inputVal.trim()) return;
    const newTask={
        id:Date.now(),text:inputVal.trim()
    };
    setTasks([...tasks,newTask]);
    setInputVal("");
  };
  const handleDeleteTask=(id)=>{
    setTasks(tasks.filter((task)=>task.id!==id));
  };
  return (
    <div style={{
        fontFamily:"sans-serif",maxWidth:"400px",margin:"20px auto",padding:"20px",border:"1px solid #cbd5e1",borderRadius:"8px",background:"#fff"
        }}>
      <h2 style={{
        margin:"0 0 16px 0",color:"#0f172a"
        }}>To-Do List</h2>
      <form onSubmit={handleAddTask} style={{
        display:"flex",gap:"8px",marginBottom:"16px"
        }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputVal}
          onChange={(e)=>setInputVal(e.target.value)}
          style={{
            flex:1,padding:"8px",border:"1px solid #cbd5e1",borderRadius:"4px",outline:"none"
        }}
        />
        <button type="submit" style={{
            padding:"8px 14px",background:"#0284c7",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer"
            }}>
          Add
        </button>
      </form>
      <ul style={{listStyle:"none",padding:0,margin:0}}>
        {tasks.map((task)=>(
          <li
            key={task.id}
            style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px",borderBottom:"1px solid #f1f5f9"
            }}
          >
            <span style={{
                color:"#334155"
                }}>{task.text}</span>
            <button
              onClick={()=>handleDeleteTask(task.id)}
              style={{
                padding:"4px 8px",background:"#ef4444",color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.8rem"
            }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length===0 && <p style={{
        textAlign:"center",color:"#94a3b8",margin:"16px 0 0 0"
        }}>No tasks remaining.</p>}
    </div>
  );
}