import React, { useContext, useEffect, useState } from "react";
import "./userProfile.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import StarRating from "../../components/startRating/startRating";
import Chat from "../../components/chat/chat";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import BackBtn from "../../components/backBtn/BackBtn";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast"
import { SocketContext } from "../../context/SocketContext";


const profilePage = () => {
  const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [savedEventsLoading, setSavedEventsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const { socket } = useContext(SocketContext);


  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchUser = await apiRequest.get(`/user/oneuser/${userId}`);
        setUser(fetchUser.data);
      } catch (error) {
        console.error(error);
      }
    };

    showMyEvents();
    fetchUserData();
  }, [userId]);


  const showMyEvents = async () => {
    try {
      setMyEventsLoading(true);                       
      const events = await apiRequest.get(`/user/oneuser/${userId}`);
      const myEvents = events.data.posts;
      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setMyEventsLoading(false);
    }
  };

  const handleAddChat = async () => {
    try {
      const addChat = await apiRequest.post("/chat/", {
        receiverId: user.userId,
      });
      socket.emit("newChat", {
        receiverId: user.userId,
        data: addChat.data,
      });
      navigate("/profile");
      toast(`Now ${user.username} is added to your Chats`, { id: "addChat" });
    } catch (error) {
      console.error("Error adding chat:", error);
      toast.error(error.response.data.message, {
        id: "add chat error",
      });
    }
  };


  return (
    <div className="profile container navbarHeight">
      <div className="row ">
        <div className="col-12 col-md-6">
          <BackBtn color="white" />
          <h2 className="title text-uppercase">{user.username? user.username : "USER"}'S PROFILE</h2>
          <div className="profile bg-light text-dark mx-2 mx-md-0 py-4 rounded-4 box-shadow mt-4 row">
            <div className="profilePic  d-flex p-5 pb-3 pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-5">
              <img
                src={user.avatar || dummyProfilePic}
                alt=""
                className="img-fluid px-md-2 mb-2 rounded-4"
              />
              <div className=" starRating d-flex flex-column align-items-center justify-content-center">
                <StarRating
                  className="stars"
                  editable={false}
                  size={25}
                  totalStars={user.starRating}
                />
                <p className="content m-0 mt-0 mx-2">
                  Rating :{" "}
                  <span>
                    {user.starRating <= 0 ? "No rating" : user.starRating}
                  </span>
                </p>
                <span className=" honorScore">
                  Honor Score:{" "}
                  <span className="fw-bold">{user.honorScore}</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-12 col-md-7 ">
              <div className=" content mb-2">
                <span className="small-font">User Name </span> <br />{" "}
                <span className="little-big-font fs-5">{user.username}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Phone </span> <br />{" "}
                <span className="little-big-font fs-5">{user.phone}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Email </span> <br />{" "}
                <span className="little-big-font fs-5">{user.email}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">City </span> <br />{" "}
                <span className="little-big-font fs-5">{user.city}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Address </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {user.address ? user.address : "Not provided"}
                </span>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-6"><button
              onClick={handleAddChat}
              className="btn w-100 btn-warning"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-send me-2"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
              Add user to chat
            </button></div>
            <div className="col-6"><button className="btn btn-warning w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-star-half mb-1 me-1"
                viewBox="0 0 16 16"
              >
                <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
              </svg>
              Provide feedback
            </button></div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4 mx-0 mt-5 mt-md-0">
          <h4 className="text-uppercase">{user.username? user.username : "USER"}'s Events</h4>
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
  );
};

export default profilePage;
