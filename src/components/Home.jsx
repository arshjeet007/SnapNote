import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value,setValue] = useState('');
  const [searchparams,setSearchparams] = useSearchParams();
  const pasteId = searchparams.get("PasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  

  function createPaste(){
    const paste = {
      title : title,
      content : value,
      _id : pasteId || Date.now().toString(36),createdAt:new Date().toISOString(),
      }
      if(pasteId){
        //Update
        dispatch(updateToPaste(paste));
      }
      else{
        //Create
        dispatch(addToPaste(paste));
      }

      //After Creation Or Updation

      setTitle('');
      setValue('');
      setSearchparams({}); 
    }
    
    useEffect(()=>{
      if(pasteId){
        const paste = allPastes.find((p)=> p._id === pasteId)
        setTitle(paste.title);
        setValue(paste.content)
      }
      
    },[pasteId])


  return (
    <div>
      <div className="flex flex-row gap-3 place-content-between">
      <input
        className="pd-2 rounded-2xl  mt-3 p-3 "
        type="text"
        placeholder="Enter Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="pd-2 rounded-2xl text-center mt-3" onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>

      <div>
        <textarea 
        className="rounded-3xl mt-4 min-w-[500px] p-4"
        value = {value}
        placeholder="Enter Content Here ..."
        onChange={(e) => setValue(e.target.value)}
        rows={20}

        />
      </div>

    </div>
  );
};

export default Home;
