import React,{useState}from 'react';
import API from '../api';
export default function ImageUpload(){
    const [file,setFile]=useState(null);
    const [preview,setPreview]=useState('');
    const [uploadedUrl,setUploadedUrl]=useState('');
    const handleFile=(e)=>{
        const selected=e.target.files[0];
        if(selected){
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };
    const handleUpload=async()=>{
        if(!file) return;
        const fd=new FormData();
        fd.append('image',file);
        try{
            const res=await API.post('/upload',fd,{headers:{'Content-Type':'multipart/form-data'}});
            setUploadedUrl('http://localhost:5000'+res.data.imageUrl);
        }
        catch(err){}
    };
    return(
        <div>
            <input type="file" accept="image/*" onChange={handleFile}/>
            {preview&&<img src={preview} alt="preview" width="120"/>}
            <button onClick={handleUpload}>upload</button>
            {uploadedUrl&&<img src={uploadedUrl} alt="uploaded" width="120"/>}
        </div>
    );
}