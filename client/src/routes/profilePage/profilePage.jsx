import React, { useContext, useState } from "react";
import "./profilePage.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import StarRating from "../../components/startRating/startRating";
import Chat from "../../components/chat/chat";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import BackBtn from "../../components/backBtn/BackBtn";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast"
import { Suspense } from "react"; 
import { Await } from "react-router-dom";

const profilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [savedEventsLoading, setSavedEventsLoading] = useState(false);
  const chat = useLoaderData()

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/update-profile");
  };

  const showMyEvents = async () => {
    try {
      setMyEventsLoading(true);
      const events = await apiRequest.get("/user/profilePosts/"+currentUser.UserId);
      const myEvents = events.data.userPosts;
      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setMyEventsLoading(false);
    }
  };

  const showSavedPosts = async () => {
    try {
      setSavedEventsLoading(true);
      const events = await apiRequest.get("/user/profilePosts/"+currentUser.UserId);
      const savedEvents = events.data.savedPost;
      setEvents(savedEvents.filter((post)=> post.disabled === false));
    } catch (error) {
      console.log(error);
    } finally {
      setSavedEventsLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/");
      toast.success("Logout Successfull",{
        id:"logout successfull"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToast = () => {
    toast.success("hello")
  }

  console.log(currentUser)

  return (
    <div className="profile container navbarHeight">
      <div className="row ">
        <div className="col-12 col-lg-7">
          <BackBtn color="white" />
          <h2 className="title">
            USER PROFILE
            <button
              className=" ms-2 float-end btn btn-warning"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button className="float-end btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
            {/* <button className="float-end btn btn-danger" onClick={handleToast}>
              toast
            </button> */}
          </h2>
          <div className="profile bg-light text-dark mx-2 mx-md-0 py-4 rounded-4 box-shadow mt-4 row">
            <div className="profilePic  d-flex pb-3  pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-4">
              <img
                src={currentUser.avatar || dummyProfilePic}
                alt=""
                className="img-fluid mb-2 px-md-2 rounded-4"
              />
              <div className=" starRating d-flex flex-column align-items-center justify-content-center">
                <StarRating
                  className="stars"
                  editable={false}
                  size={25}
                  totalStars={currentUser.starRating}
                />
                <p className="content m-0 mt-0 mx-2">
                  Rating :{" "}
                  <span>
                    {currentUser.starRating <= 0
                      ? "No rating"
                      : currentUser.starRating}
                  </span>
                </p>
                <span className=" honorScore">
                  Honor Score:{" "}
                  <span className="fw-bold">{currentUser.honorScore}</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-12 col-md-8 ">
              <div className=" content mb-2">
                <span className="small-font">User Name </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser.username}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Phone </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser.phone}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Email </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser.email}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">City </span> <br />{" "}
                <span className="little-big-font fs-5">{currentUser.city}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Address </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser.address ? currentUser.address : "Not provided"}
                </span>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-6">
              <button
                className="btn btn-warning w-100 "
                disabled={myEventsLoading}
                onClick={showMyEvents}
              >
                My Events
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-warning w-100"
                disabled={savedEventsLoading}
                onClick={showSavedPosts}
              >
                Saved Events
              </button>
            </div>
            <div className="col-12">
              {(myEventsLoading || savedEventsLoading) && (
                <Loader message={"Loading..."} />
              )}
              {!(myEventsLoading || savedEventsLoading) &&
              events &&
              events.length > 0 ? (
                events
                  .slice()
                  .reverse()
                  .map((post) => <Card item={post} key={post.postId} />)
              ) : (
                <div className="text-center mt-4">
                  {!(myEventsLoading || savedEventsLoading) && events && (
                    <h4>No events found</h4>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <h2 className="title">CHATS</h2>
          <Suspense
            fallback={
              <div>{<Loader message={"Loading Chats..."}></Loader>}</div>
            }
          >
            <Await resolve={chat.chatResponse} errorElement={<p></p>}>
              {(chatResponse) => <Chat items={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
