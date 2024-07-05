import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Chat = ({ items }) => {
  const [itemsArray, setItemsArray] = useState(items)
  const [chatMsg, setChatMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [chatloading, setChatLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const msgEndRef = useRef();

  // Scroll to the end of the messages
  useEffect(() => {
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMsg?.messages]);

  // Handle sending a new message
  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      setSending(true)
      const res = await apiRequest.post("/message/" + chatMsg.chatId, { text });
      setChatMsg((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      setItemsArray((prevItemsArray) =>
        prevItemsArray.map((chat) =>
          chat.chatId === chatMsg.chatId
            ? { ...chat, lastMessage: res.data.text }
            : chat
        )
      );
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chatMsg.receiver.userId,
        data: res.data,
      });
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong! Try reloading.",{
        id:"send error"
      });
    } finally {
      setSending(false)
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chat/read/" + chatMsg?.chatId);
      } catch (error) {
        console.log(error);
      }
    };

    if (chatMsg && socket) {
      const handleMessage = (data) => {
        if (chatMsg.chatId === data.chatId) {
          setChatMsg((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          read();
        }
      };

      socket.on("getMessage", handleMessage);

      // Clean up the socket event listener on unmount or dependency change
      return () => {
        socket.off("getMessage", handleMessage);
      };
    }

    const handleNewChat = (data) => {
      setItemsArray((prevItemsArray)=> [data, ...prevItemsArray])
    }

    socket.on("newChatFound", handleNewChat);

  }, [socket, chatMsg, setChatMsg]);

  const handleClose = () => setShowModal(false);

  const handleShow = async (id, receiver) => {
    try {
      setChatLoading(true);
      const res = await apiRequest("/chat/" + id);
      setChatMsg({ ...res.data, receiver });
      setItemsArray((prevItemsArray) => prevItemsArray.map((chat) => chat.chatId === id ? { ...chat, seenBy: [...chat.seenBy, currentUser.userId] } : chat) )
    } catch (error) {
      console.log(error);
    } finally {
      setChatLoading(false);
    }
  };

  const truncateParagraph = (paragraph) => {
    const words = paragraph.split(/\s+/);
    return words.length <= 6 ? paragraph : words.slice(0, 6).join(" ") + "...";
  };

  const handleDeleteChat = async () => {
    try {
      setDeleting(true)
      await apiRequest.delete("/chat/" + chatMsg.chatId);
      toast.success("Chat Deleted Successfully!");
      setShowModal(false);
      setItemsArray((prevItemsArray) =>
        prevItemsArray.filter((chat) => chat.chatId !== chatMsg.chatId)
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Try reloading.",{
        id:"delete error"
      });
    } finally {
      setDeleting(false)
    }
  };
 

  return (
    <div className="chats my-5 my-md-0">
      <h2 className="title">CHATS</h2>
      {itemsArray.length === 0 && <h4 className="mt-3">No chats Found</h4>}
      <div className="chatList">
        {itemsArray.map((chat, index) => (
          <div
            key={index}
            className={`chat chat-banner text-dark bg-${
              chat.seenBy.includes(currentUser.userId) ||
              chatMsg?.chatId === chat?.chatId
                ? "light"
                : "lightYellow"
            } rounded mx-auto w-95`}
            onClick={() => {
              handleShow(chat.chatId, chat.receiver);
              setShowModal(true);
            }}
          >
            <div className="chatBanner ps-0 p-2 mt-2 flex-row d-flex  align-items-center">
              <div className="">
                <img
                  src={
                    chat.receiver.avatar
                      ? chat.receiver.avatar
                      : dummyProfilePic
                  }
                  className="navProPic mx-2 mx-lg-3"
                  alt=""
                />
              </div>
              <div className="flex-grow-1">
                <p className="fs-5 text-uppercase w-100 mb-0">
                  <span className=" text-lowercase opacity-65 fs-8 float-end">
                    {chat?.messages[0]?.createdAt
                      ? format(chat.messages[0].createdAt)
                      : ""}
                  </span>
                  <span className="chatUsername">{chat?.receiver?.username}</span>
                </p>
                <p className=" fs-6 mb-0 opacity-75">
                  {chat?.lastMessage && truncateParagraph(chat.lastMessage)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`modal fade text-dark ${showModal ? "show d-block" : ""}`}
        style={{
          backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between ">
              <div className="user w-100 d-flex align-items-center ">
                <img
                  src={
                    chatloading
                      ? dummyProfilePic
                      : chatMsg?.receiver?.avatar || dummyProfilePic
                  }
                  className="navProPic"
                  height="50px"
                  alt=""
                />
                <span className="name fs-5 mx-2 text-uppercase">
                  {!chatloading && chatMsg?.receiver?.username}
                </span>
              </div>
              <button
                className="btn btn-danger ms-auto me-3"
                title="Delete Chat"
                onClick={handleDeleteChat}
                disabled={deleting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <span className="close" onClick={handleClose}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </span>
              </span>
            </div>
            <div className="modal-body bg-dark text-white">
              <div className="chatBox h-100">
                {chatloading ? (
                  <Loader message="Loading chats..." textColor="light" />
                ) : (
                  <div className="center d-flex flex-column">
                    {chatMsg?.messages?.map((msg) => (
                      <div
                        key={msg.messageId} // Assuming `messageId` is a unique identifier for each message
                        className={`chatMessage mb-1 msg ${
                          msg.userId === currentUser.userId ? "ms-auto" : ""
                        }`}
                      >
                        <p className="fs-6 mb-0">{msg.text}</p>
                        <span
                          className={`opacity-65 p-0 m-0 ${
                            msg.userId === currentUser.userId ? "float-end" : ""
                          } fs-8`}
                        >
                          {msg.createdAt ? format(new Date(msg.createdAt)) : ""}
                        </span>
                      </div>
                    ))}
                    <div className="" ref={msgEndRef}></div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <form
                onSubmit={handleSend}
                className="bottom w-100 d-flex align-items-end gap-1"
              >
                <textarea
                  name="text"
                  className="form-control shadow-none w-100"
                  placeholder="Write Message..."
                  rows={1}
                ></textarea>
                <button disabled={sending} type="submit" title="Send" className="float-end btn btn-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
