import React, { useEffect, useState } from "react";
import "./SupportModal.css";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { callgetMessage } from "../../../API/chats/getChatMessages";
import { createnewMessage } from "../../../API/chats/createNewMessage";

const SupportModal = ({ closeSupportModal }) => {
  const [admin,setAdmin]=useState('TlLlCw1GqVUCdw1Hqm2omRJjVpw1')
  const [useChat, setuserChat] = useState("");

  const [chat, setChat] = useState([]);

  const handleChat=async()=>{
    if(useChat==='')
        return
    const messageObj={
        roomid:'TlLlCw1GqVUCdw1Hqm2omRJjVpw1##c8c61d82-b8e7-49c0-9751-e2ae7a8d6091',
        message:useChat,
        messagedate:new Date().toString(),
        recieverid:'c8c61d82-b8e7-49c0-9751-e2ae7a8d6091',
        senderid:admin

    }
    await createnewMessage(messageObj)
    setChat([...chat,messageObj]);
    setuserChat("");
}
    useEffect(()=>{
      getAllChats()
    },[])

    useEffect(()=>{
      setTimeout(() => {
        getAllChats();
      }, 3000);
    },[])

    const getAllChats=async()=>{
      try {
        const messages=await callgetMessage("TlLlCw1GqVUCdw1Hqm2omRJjVpw1##c8c61d82-b8e7-49c0-9751-e2ae7a8d6091");
        setChat([...messages.data])
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
      <div className="support-modal-container">
        <div className="support-modal-wrapper"></div>
        <div className="support-modal-container">
          <div className="support-btn">
            <CloseIcon onClick={closeSupportModal} id="closemodal-btn" />
          </div>
          <div className="support-modal-content">
            <form className="support-modal-form">
              <div className="orderId">
                <label htmlFor="orderId">Order Id : </label>
                <input type="text" id="orderId" placeholder="Order Id" />
              </div>
              <div className="personal-details">
                <div className="name">
                  <label htmlFor="name">Name : </label>
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className="phone-number">
                  <label htmlFor="phone">Mobile No. : </label>
                  <input
                    type="number"
                    name="number"
                    id="phone"
                    placeholder="Mobile number"
                  />
                </div>
              </div>
              <hr />
              <div className="chat-container">
                <div className="chat-content">
                  {
                    chat.length>0 &&
                    chat.reverse().map((message,index)=>(
                      <div className="user-chat" style={{justifyContent: message.senderid ===admin ? 'flex-end':"flex-start"}}
                      key={index}>
                        <h5 style={{alignSelf:"flex-start"}}>{message.message}</h5>
                      </div>
                    ))
                  }
                </div>

                <div className="msg-box">
                  <div className="msg-area">
                    <textarea
                      name="txtmessages"
                      id=""
                      placeholder="send messages"
                      value={useChat}
                      onChange={(e) => setuserChat(e.target.value)}
                    ></textarea>
                    <SendIcon id="sendicon" onClick={handleChat} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportModal;
