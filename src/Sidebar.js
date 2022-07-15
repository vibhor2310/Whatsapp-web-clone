import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { Avatar } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './Sidebarchat.js'
import Sidebarchat from './Sidebarchat.js';
import db from './firebase.js';
import { useStateValue } from './StateProvider';



function Sidebar() {
    const[rooms,setrooms] = useState([]);
    const[{user},dispatch] = useStateValue();

    useEffect(()=>{
       const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>
        setrooms(
            snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
        )
        );
        return ()=>{
          unsubscribe();
        }

    },[]);





  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src = {user?.photoURL} />
        <div className="sidebar__headerRight">
            <IconButton>
            <DonutLargeIcon />
            </IconButton>
            <IconButton>
            <ChatIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />
            </IconButton>
           
            
        </div>

      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input placeholder="Search or Start New Chat" type="text" />
        </div>

      </div>

      <div className="sidebar__chats">
        <Sidebarchat addNewChat/>
       {rooms.map(room =>(
        <Sidebarchat key={room.id} id ={room.id}
        name={room.data.name} />
       ))}
        

      </div>
    </div>
  )
}

export default Sidebar;