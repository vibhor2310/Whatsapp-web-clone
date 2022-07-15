import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import { Avatar } from '@mui/material';
import db from './firebase';
import {Link} from 'react-router-dom';

function Sidebarchat({id,name,addNewChat}) {
    const[photo,setphoto]= useState("")
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      if (id) {
        db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }
    }, [id]);

  useEffect(()=>{
    setphoto(Math.floor(Math.random()*5000));

  },[]);

  const createChat =()=>{
    const roomName = prompt("Please Enter Name for Chat");
    if(roomName){
        // has to do some database stuff
        db.collection("rooms").add({
          name:roomName,
        });
    }

  };
    


  return !addNewChat ?(
    <Link to={`/rooms/${id}`}>  
      <div className="sidebarChat">
     <Avatar src={`https://avatars.dicebear.com/api/human/${photo}.svg`} />
     <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>

     </div>

     </div>
     </Link>


  ):(
    <div onClick={createChat}
    className="sidebarChat">
    <h2>Add New Chat</h2>
    </div>

  );
}

export default Sidebarchat;