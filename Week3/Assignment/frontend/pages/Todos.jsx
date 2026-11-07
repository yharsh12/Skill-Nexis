import React,{useEffect,useState}from 'react';
import API from '../api';
export default function Todos(){
    const [todos,setTodos]=useState([]);
    const [title,setTitle]=useState('');
    const fetchTodos=async()=>{
        try{
            const res=await API.get('/todos');
            setTodos(res.data);
        }
        catch(err){}
    };
    useEffect(()=>{fetchTodos();},[]);
    const addTodo=async(e)=>{
        e.preventDefault();
        if(!title) return;
        try{
            const res=await API.post('/todos',{title});
            setTodos([res.data,...todos]);
            setTitle('');
        }
        catch(err){}
    };
    const toggleTodo=async(id,completed)=>{
        try{
            const res=await API.put('/todos/'+id,{completed:!completed});
            setTodos(todos.map((t)=>(t._id===id?res.data:t)));
        }
        catch(err){}
    };
    const deleteTodo=async(id)=>{
        try{
            await API.delete('/todos/'+id);
            setTodos(todos.filter((t)=>t._id!==id));
        }
        catch(err){}
    };
    return(
        <div>
            <form onSubmit={addTodo}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="new todo"/>
            <button type="submit">add</button>
            </form>
            <ul>
            {todos.map((t)=>(
                <li key={t._id}>
                    <span onClick={()=>toggleTodo(t._id,t.completed)} style={{textDecoration:t.completed?'line-through':'none'}}>
                    {t.title}
                    </span>
                    <button onClick={()=>deleteTodo(t._id)}>del</button>
                </li>
            ))}
            </ul>
        </div>
    );
}