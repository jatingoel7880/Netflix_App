import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modal';
import useMovieData from '../../hooks/useMovieData'; // Import the useMovieData hook


const VideoTitle = ({title, overview, movieId}) => {
  
  const [expanded, setExpanded] =useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useMovieData(movieId);


  function toogleExpand(){
    setExpanded(!expanded);
  }
  function truncated(string,n){
     return string?.length >n && !expanded ? string.substr(0,n-1) + '' :string;
 } 

  const navigate=useNavigate();
  return (
    <div className="absolute w-[1350px] pt-[15%] px-16 text-white ">
      {/* bg-gradient-to-r from-black */}
     <h1 className="text-5xl font-bold">{title}</h1>
     <div>
      <button className="bg-white text-black p-2 my-4 px-6 text-xl rounded-lg hover:bg-opacity-80" onClick={()=>navigate(`/play/${movieId}`)}>
      <FontAwesomeIcon icon={faPlay}  /> Play</button>
      <button className="mx-2 bg-gray-400 text-white p-2 my-4 px-6 text-xl bg-opacity-50 rounded-lg"   onClick={() =>  setModalOpen(true)}>
      {/* <button className="mx-2 bg-gray-400 text-white p-2 my-4 px-6 text-xl bg-opacity-50 rounded-lg" onClick={handleMoreInfoClick}> */}
      <FontAwesomeIcon icon={faInfoCircle} /> More Info</button>
     </div>
     <p className="py-6 text-lg w-1/3" onClick={toogleExpand}>{truncated(overview,100)}
     {!expanded &&  <span className='text-blue-500 cursor-pointer'>...more</span>}
     {expanded &&  <span className='text-red-700 font-semibold cursor-pointer'> Collapse</span>}</p>
     {/* {modalOpen && (
        <Modal overview={overview} closeModal={closeModal} />
      )} */}


{modalOpen  && (
  <Modal overview={overview} movieId={movieId} onClose={()=> setModalOpen(false)} />
)}

    </div>
    
  )
} 

export default VideoTitle;

