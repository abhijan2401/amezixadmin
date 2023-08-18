import React, { useEffect, useState } from "react";
import "./SupportModal.css";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { callgetMessage } from "../../../API/chats/getChatMessages";
import { createnewMessage } from "../../../API/chats/createNewMessage";

const SupportModal = ({ closeSupportModal }) => {
  const [admin, setAdmin] = useState("admin_chat");

  const [useChat, setuserChat] = useState("");

  const [chat, setChat] = useState([]);

  const handleChat = async () => {
    if (useChat === "") return;
    const messageObj = {
      roomid: "ZD8YZmE9ChPrntzJMZUt6XANMPz1##admin_chat",
      message: useChat,
      messagedate: new Date().toString(),
      recieverid: "ZD8YZmE9ChPrntzJMZUt6XANMPz1",
      senderid: admin,
    };
    await createnewMessage(messageObj);
    setChat([...chat, messageObj]);
    setuserChat("");
  };
  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log("Helo");
      getAllChats();
    }, 5000);
  }, []);

  const getAllChats = async () => {
    try {
      const messages = await callgetMessage(
        "ZD8YZmE9ChPrntzJMZUt6XANMPz1##admin_chat"
      );
      setChat([...messages.data]);
    } catch (error) {
      console.log(error);
    }
  };
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
                  {chat.length > 0 &&
                    chat.reverse().map((message, index) => (
                      <div
                        className="user-chat"
                        style={{
                          justifyContent:
                            message.senderid === admin
                              ? "flex-end"
                              : "flex-start",
                        }}
                        key={index}
                      >
                        <h5 style={{ alignSelf: "flex-start" }}>
                          {message.message}
                        </h5>
                      </div>
                    ))}
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
