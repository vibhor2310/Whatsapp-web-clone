import { Avatar } from '@mui/material'
import './Chat.css'
import React, { useEffect, useState } from 'react'
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import {useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Chat() {

    const[photo,setphoto]= useState("");
    const[input,setinput]= useState("");
    const {roomId} = useParams();
    const [roomName,setroomName]= useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot)=>setroomName
            (snapshot.data().name));

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        }

    },[roomId])

    useEffect(()=>{
      setphoto(Math.floor(Math.random()*5000));
  
    },[roomId]);

    const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setinput("");

    };
  


  return (
    <div className="chat">
        <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${photo}.svg`} />

        <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>Last seen {" "}
            {new Date(
                messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
           </p>
        </div>

        <div className="chat__headerRight">
        <IconButton>
            <SearchOutlined />
            </IconButton>
            <IconButton>
            <AttachFileOutlinedIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />
            </IconButton>

        </div>


        </div>

        <div className="chat__body">
            {messages.map((message)=>(
                 <p className={`chat__message
                 ${message.name===user.displayName && "chat__reciever"}`}>
                <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                   
                </p>

            ))}
           

        </div>

        <div className="chat__footer">
            <InsertEmoticonOutlinedIcon />
            <form>
                <input value={input}
                onChange={(e)=>setinput(e.target.value)}
                placeholder='Type a message' type="text" />
                <button onClick={sendMessage}
                type='submit'>Send a message</button>
            </form>
            <MicOutlinedIcon />


        </div>
    </div>

  )
}

export default Chat