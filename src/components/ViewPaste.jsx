import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state)=> state.paste.pastes)

  const paste = allPastes.filter((p)=> p._id === id)[0]

  return (
    <div>
      <div className="flex flex-row gap-3 place-content-between">
      <input
        className="pd-2 rounded-2xl  mt-3 p-3 "
        type="text"
        placeholder="Enter Title Here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button className="pd-2 rounded-2xl text-center mt-3" onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> */}
    </div>

      <div>
        <textarea 
        className="rounded-3xl mt-4 min-w-[500px] p-4"
        value = {paste.content}
        placeholder="Enter Content Here ..."
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        disabled

        />
      </div>

    </div>
  )
}

export default ViewPaste
