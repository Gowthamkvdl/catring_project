import React, { useState } from "react";
import "./chat.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";

const Chat = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="chats my-5 my-md-0">
      <h2 className="title">CHATS</h2>
      <div className="chatList">
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
        <div
          className="chat text-dark bg-light rounded mx-auto w-95"
          onClick={handleShow}
        >
          <div className="row ps-0 p-2 mt-2 d-flex justify-content-center align-items-center">
            <div className="col-2">
              <img src={dummyProfilePic} className="navProPic ms-3" alt="" />
            </div>
            <div className="col-10">
              <p className="content mb-0">
                Gowtham K
                <span className="opacity-65 fs-8 float-end">1 min ago</span>
              </p>
              <p className="content mb-0 opacity-75">Last message</p>
            </div>
          </div>
        </div>
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
                  src={dummyProfilePic}
                  className="navProPic"
                  height="50px"
                  alt=""
                />
                <span className="name mx-2">Gowtham K</span>
              </div>
              <span className="close" onClick={handleClose}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </span>
              </span>
            </div>
            <div className="modal-body bg-dark text-white">
              <div className="chatBox h-100">
                <div className="center d-flex flex-column">
                  <div className="chatMessage mb-1 ">
                    <p className="content mb-0">Hi</p>
                    <span className="opacity-65 p-0 m-0 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1 ">
                    <p className="content mb-0">Hi</p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1">
                    <p className="content mb-0">Hi</p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1">
                    <p className="content mb-0">
                      Hi i am gowtham and i want to know that is there is any
                      work
                    </p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1 ms-auto text-end">
                    <p className="content mb-0">Yes, we have some work for u</p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1 ms-auto text-end">
                    <p className="content mb-0">Yes, we have some work for u</p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                  <div className="chatMessage mb-1 ms-auto text-end">
                    <p className="content mb-0">Yes, we have some work for u</p>
                    <span className="opacity-65 fs-8">2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <form className="bottom w-100 d-flex align-items-end gap-1">
                <textarea
                  name="text"
                  className="form-control shadow-none w-100"
                  placeholder="Write Message..."
                ></textarea>
                <button type="submit" className="float-end btn btn-yellow">
                  Send
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
