import React,{ useState } from "react";
import initialPosts from "./data/posts.json";
const categoryColors={
  React:{
    bg:"#083344",text:"#38bdf8"
  },
  CSS:{
    bg:"#1e1b4b",text:"#818cf8"
  },
  JavaScript:{
    bg:"#422006",text:"#facc15"
  },
  HTML:{
    bg:"#431407",text:"#fb923c"
  }
};
function Navbar({totalPosts}){
  return(
    <nav style={{
      display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 6%",background:"#111827",borderBottom:"1px solid #374151",position:"sticky",top:0,zIndex:10
      }}>
      <div style={{
        display:"flex",alignItems:"center",gap:"10px"
        }}>
        <span style={{
          width:"12px",height:"12px",background:"#38bdf8",borderRadius:"50%",boxShadow:"0 0 10px #38bdf8"
          }}/>
        <h2 style={{
          margin:0,color:"#f9fafb",fontSize:"1.4rem"
          }}>Blogger</h2>
      </div>
      <span style={{
        background:"#1f2937",padding:"6px 14px",borderRadius:"9999px",fontSize:"0.85rem",color:"#38bdf8",border:"1px solid #374151"
        }}>
        {totalPosts} Articles
      </span>
    </nav>
  );
}
function SearchFilter({searchQuery,setSearchQuery,selectedCategory,setSelectedCategory,categories}){
  return(
    <div style={{
      display:"flex",flexDirection:"column",gap:"16px",marginBottom:"32px"
      }}>
      <div style={{
        position:"relative",width:"100%"
        }}>
        <input
          type="text"
          placeholder="Search articles by title, keyword, or tag..."
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          style={{
            width:"100%",padding:"14px 40px 14px 16px",background:"#111827",border:"1px solid #374151",borderRadius:"8px",color:"#f9fafb",fontSize:"1rem",outline:"none",boxSizing:"border-box"
          }}
        />
        {searchQuery && (
          <button
            onClick={()=>setSearchQuery("")}
            style={{
              position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"#9ca3af",fontSize:"1.2rem",cursor:"pointer"}}
          >
            &times;
          </button>
        )}
      </div>
      <div style={{
        display:"flex",gap:"10px",flexWrap:"wrap"
        }}>
        {categories.map((cat)=>{
          const isActive=selectedCategory===cat;
          return(
            <button
              key={cat}
              onClick={()=>setSelectedCategory(cat)}
              style={{background:isActive ? "#38bdf8" : "#111827",color:isActive ? "#0f172a":"#9ca3af",border:"1px solid #374151",padding:"8px 18px",borderRadius:"9999px",fontSize:"0.9rem",fontWeight:isActive?"600":"400",cursor:"pointer",transition:"all 0.2s"
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
function BlogCard({post,onOpenModal}){
  const[likes,setLikes]=useState(0);
  const[bookmarked,setBookmarked]=useState(false);
  const colors=categoryColors[post.category]||{bg:"#1f2937",text:"#9ca3af"};
  const readTime=Math.ceil((post.summary.split(" ").length+post.content.split(" ").length)/30);
  return(
    <article style={{
      background:"#111827",border:"1px solid #1f2937",borderRadius:"10px",padding:"24px",display:"flex",flexDirection:"column",justifyContent:"space-between",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.3)",boxSizing:"border-box"}}>
      <div>
        <div style={{
          display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
          <span style={{
            background:colors.bg,color:colors.text,fontSize:"0.75rem",fontWeight:"bold",padding:"4px 10px",borderRadius:"6px"}}>
            {post.category}
          </span>
          <button
            onClick={()=>setBookmarked(!bookmarked)}
            style={{
              background:"transparent",border:"none",color:bookmarked?"#facc15":"#6b7280",fontSize:"1.3rem",cursor:"pointer"}}
          >
            {bookmarked?"★":"☆"}
          </button>
        </div>
        <h3
          onClick={()=>onOpenModal(post)}
          style={{
            color:"#f9fafb",fontSize:"1.35rem",margin:"0 0 10px 0",cursor:"pointer",lineHeight:1.3}}
        >
          {post.title}
        </h3>
        <p style={{
          color:"#9ca3af",fontSize:"0.95rem",lineHeight:1.5,margin:"0 0 16px 0"}}>
          {post.summary}
        </p>
        <div style={{
          display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"20px"
          }}>
          {post.tags.map((t,i)=>(
            <span key={i} style={{
              color:"#6b7280",fontSize:"0.8rem"
              }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"16px",borderTop:"1px solid #1f2937"
        }}>
        <div style={{
          display:"flex",alignItems:"center",gap:"10px"
          }}>
          <div style={{
            width:"32px",height:"32px",borderRadius:"50%",background:"#374151",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",fontSize:"0.85rem"
            }}>
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{
              color:"#f9fafb",fontSize:"0.85rem",fontWeight:"600"}}>{post.author}</div>
            <div style={{
              color:"#6b7280",fontSize:"0.75rem"}}>
              {post.date} &bull; {readTime} min read
            </div>
          </div>
        </div>
        <button
          onClick={()=>setLikes(likes+1)}
          style={{
            background:"#1f2937",border:"1px solid #374151",color:"#f9fafb",padding:"6px 12px",borderRadius:"6px",fontSize:"0.85rem",cursor:"pointer"}}
        >
          ❤️ {likes}
        </button>
      </div>
    </article>
  );
}
function PostModal({post,onClose}){
  if(!post) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed",inset:0,backgroundColor:"rgba(0, 0, 0, 0.75)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:50,padding:"20px"}}
    >
      <div
        onClick={(e)=>e.stopPropagation()}
        style={{
          background:"#111827",border:"1px solid #374151",borderRadius:"12px",maxWidth:"650px",width:"100%",padding:"32px",position:"relative",boxSizing:"border-box"}}
      >
        <button
          onClick={onClose}
          style={{
            position:"absolute",top:"16px",right:"16px",background:"none",border:"none",color:"#9ca3af",fontSize:"1.5rem",cursor:"pointer"}}
        >
          &times;
        </button>
        <h2 style={{
          color:"#f9fafb",margin:"12px 0 6px 0",fontSize:"1.6rem"}}>{post.title}</h2>
        <p style={{
          color:"#38bdf8",fontSize:"0.85rem",margin:"0 0 16px 0"}}>
          By {post.author} &bull; {post.date}
        </p>
        <hr style={{
          borderColor:"#1f2937",marginBottom:"16px"}}/>
        <p style={{
          color:"#d1d5db",fontSize:"1.05rem",lineHeight:1.7,margin:"0 0 20px 0"}}>
          {post.content}
        </p>
        <div style={{
          display:"flex",gap:"8px"}}>
          {post.tags.map((t,idx)=>(
            <span
              key={idx}
              style={{
                background:"#1f2937",color:"#9ca3af",padding:"4px 8px",borderRadius:"4px",fontSize:"0.75rem"}}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function Blogger(){
  const[searchQuery,setSearchQuery]=useState("");
  const[selectedCategory,setSelectedCategory]=useState("All");
  const[activePost,setActivePost]=useState(null);
  const categories=["All","React","CSS","JavaScript","HTML"];
  const filteredPosts=initialPosts.filter((post)=>{
    const matchesCategory=selectedCategory==="All"||post.category===selectedCategory;
    const query=searchQuery.toLowerCase();
    const matchesSearch=
      post.title.toLowerCase().includes(query)||
      post.summary.toLowerCase().includes(query)||
      post.tags.some((t)=>t.toLowerCase().includes(query));
    return matchesCategory&&matchesSearch;
  });
  return(
    <div style={{
      fontFamily:"system-ui, -apple-system, sans-serif",backgroundColor:"#0a0f1d",color:"#f9fafb",minHeight:"100vh"}}>
      <Navbar totalPosts={initialPosts.length}/>
      <main style={{
        maxWidth:"1100px",margin:"0 auto",padding:"40px 20px 60px"}}>
        <header style={{
          marginBottom:"28px"
          }}>
          <h1 style={{
            fontSize:"2.4rem",margin:"0 0 8px 0"}}>Articles & Engineering Logs</h1>
          <p style={{
            color:"#9ca3af",fontSize:"1.1rem",margin:0}}>
            Curated writeups exploring modern frontend development and software craft.
          </p>
        </header>
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        {filteredPosts.length>0?(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"}}>
            {filteredPosts.map((post)=>(
              <BlogCard key={post.id} post={post} onOpenModal={(p)=>setActivePost(p)}/>
            ))}
          </div>
        ):(
          <div style={{
            textAlign:"center",padding:"60px 20px",background:"#111827",borderRadius:"10px",border:"1px solid #1f2937"}}>
            <h3 style={{
              margin:"0 0 8px 0"}}>No articles found</h3>
            <p style={{
              color:"#9ca3af",margin:"0 0 16px 0"}}>Try checking your spelling or clearing filters.</p>
            <button
              onClick={()=>{
                setSearchQuery("");setSelectedCategory("All");
              }}
              style={{
                background:"#38bdf8",color:"#0f172a",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontWeight:"bold"}}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
      <PostModal post={activePost} onClose={()=>setActivePost(null)}/>
    </div>
  );
}