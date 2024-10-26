import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const Pastes = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm,setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/paste/${pasteId}`;
    
    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: 'Check out this paste!',
        url: shareableLink,
      })
      .then(() => {
        toast.success("Link shared successfully!");
      })
      .catch((error) => {
        toast.error("Sharing failed: " + error.message);
      });
    } else {
      // Fallback if the Web Share API is not supported
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((error) => {
          toast.error("Failed to copy link: " + error.message);
        });
    }
  }


  return (
    <div>
     <input 
     className='p-2 w-80 rounded-2xl mt-3'
     type="search" 
     placeholder='Search Your Notes Here'
     value={searchTerm}
     onChange={(e)=> setSearchTerm(e.target.value)}
     />

     <div className='flex flex-col gap-5 mt-5'>
      {
        filteredData.length >0 && filteredData.map(
          (paste) => {
            console.log(filteredData);
            
            return (
              <div className='border' key={paste?._id}>
                <div>
                {paste.title}
                </div>
                <div>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                    {/* <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                      </a>
                    </button> */}
                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                      View
                      </a>
                    </button>
                    <button onClick={()=> handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={()=> {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied To Clipboard")
                    }}>
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste?._id)}>
                      Share
                      </button> {/* Share button */}
                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          }
            
        )
      }
     </div>
    </div>
  )
}

export default Pastes
