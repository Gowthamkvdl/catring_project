import React, { useContext, useState, useEffect } from "react";
import "./singlePage.css";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import SinglePointerMap from "../../components/singlePointerMap/SinglePointerMap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import BackBtn from "../../components/backBtn/BackBtn";
import { toast } from "react-hot-toast";
import { SocketContext } from "../../context/SocketContext";
import shareIcon from "../../assets/share.svg";
import WhatsappButton from "../../components/contactButtons/WhatsappButton";
import CallButton from "../../components/contactButtons/CallButton";
import GmailButton from "../../components/contactButtons/GmailButton";

const SinglePage = () => {
  const post = useLoaderData();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const [saved, setSaved] = useState(post.isSaved);
  const [postStatus, setPostStatus] = useState(post.disabled);
  const { currentUser } = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);
  const [disabling, setDisabling] = useState(false);
  console.log(post);

  useEffect(() => {
    if (postStatus && post.userId !== currentUser?.userId) {
      navigate("/profile");
      toast("That post is not available", { id: "postStatus" });
    }
  }, [postStatus, post.userId, currentUser?.userId, navigate]);

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("user/save", { postId: post.postId });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    } finally {
      toast.success(saved ? "Unsaved" : "Saved", {
        id: "save event",
      });
    }
  };

  const handleAddChat = async () => {
    try {
      const addChat = await apiRequest.post("/chat/", {
        receiverId: post.user.userId,
      });
      socket.emit("newChat", {
        receiverId: post.user.userId,
        data: addChat.data,
      });
      navigate("/profile");
      toast.success(`Now ${post.user.username} is added to your Chats`, {
        id: "addChat",
      });
    } catch (error) {
      console.error("Error adding chat:", error);
      toast.error(error.response.data.message, {
        id: "add chat error",
      });
    }
  };

  const handleDisablePost = async () => {
    setDisabling(true);
    setPostStatus((prev) => !prev);
    console.log(post.postId);
    try {
      await apiRequest.put("post/status/" + post.postId);
    } catch (error) {
      console.log(error);
      setPostStatus((prev) => !prev);
      toast.error("Something went wrong!", {
        id: "Error disabling post!",
      });
    } finally {
      toast.success(postStatus ? "Post Enabled " : "Post Disabled", {
        id: "postStatus",
      });
      setDisabling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await apiRequest.delete(`post/${post.postId}`);
      navigate(-1);
      toast.success("Your Post Deleted Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleShare = () => {
    // Get the current page URL
    const url = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard successfully!");
        // Optionally, you can show a success message to the user
        toast.success("Post link copied to clipboard!", {
          id: "copied",
        });
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        // Optionally, you can show an error message to the user
        toast.error("Failed to copy post link.", {
          id: "copy error",
        });
      });
  };

  return (
    <div className="singlePage navbarHeight container">
      <div className="row text-dark box-shadow py-3 p-md-3 mx-1 rounded-3 bg-light">
        <div className="col-md-7 col-12 h-auto">
          <BackBtn color={"black"} />
          <div className="float-end d-flex gap-1">
            <button
              className="btn btn-warning flex-fill d-flex justify-content-center align-items-center float-end"
              onClick={handleShare}
              title="Share post"
            >
              <img src={shareIcon} alt="" />
            </button>
            <button
              disabled={disabling}
              type="button"
              onClick={handleDisablePost}
              className={`btn btn-secondary  float-end ${
                currentUser && post.userId === currentUser.userId
                  ? ""
                  : "d-none"
              }`}
            >
              {postStatus ? "Enable Post" : "Disable Post"}
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className={`btn btn-danger float-end ${
                currentUser && post.userId === currentUser.userId
                  ? ""
                  : "d-none"
              }`}
            >
              Delete Post
            </button>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="fit-content">
                <Link
                  className="link"
                  to={"/user-profile/?id=" + post.user.userId}
                >
                  <div className="user d-flex align-items-center">
                    <img
                      src={post.user.avatar ? post.user.avatar : dummyProfile}
                      className="navProPic"
                      alt=""
                    />
                    <span className="name mx-2 fs-5 text-uppercase">
                      {post.user.username}
                    </span>
                  </div>
                </Link>
              </div>
              <h4 className="mt-3">
                {post.eventName}
                <div className="float-end fw-bold bg-text text-dark p-1 rounded">
                  ₹{post.salary}
                </div>
              </h4>
              <div className="location mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi mb-1 bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <span className="text-dark">{post.city}</span>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="eventDesc fs-normal">
            {post.description}
            <div className=" fs-normal my-2">
              <b>Address</b> : {post.address}
              <br />
              <b className="mt-2">Number of Staff Required</b> :{" "}
              {post.noOfStaffsReq}
            </div>
          </div>
          {/* <div className="bar row d-flex align-items-center">
            <div className="col-md-9 col-12">
              <div className="mb-0 mt-2 float-end">
                Status of Recruitment:{" "}
                <b>
                  {post.noOfStaffsSatisfied}/{post.noOfStaffsReq}
                </b>
              </div>
              <Progressbar width={post.noOfStaffsSatisfied} />
            </div>
            <div className="col-md-3 col-12">
              <div className="join-btn">
                <button className="btn btn-warning w-100">Join Now</button>
              </div>
            </div>
          </div> */}
          <div className="extra d-flex gap-md-4 gap-1 flex-wrap my-3">
            <div className="workingHrs bg-text small-text p-2 rounded">
              Date : <b>{post.startDate} </b>
            </div>
            <div className="workingHrs bg-text small-text p-2 rounded">
              TIme : <b>{post.startTime} </b>
            </div>
            <div className="workingHrs bg-text small-text p-2 rounded">
              Total Working Days : <b>{post.workingDays}</b>
            </div>
            <div className="transport bg-text small-text p-2 rounded">
              Travel Amount : <b>{post.busFare}</b>
            </div>
            <div className="vegetables-cutting bg-text small-text p-2 rounded">
              Vegetables Cutting : <b>{post.vegetableCutting}</b>
            </div>
            <div className="experence bg-text small-text p-2 rounded">
              Experience : <b>{post.experience}</b>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12 h-auto">
          <div className="single-page-contact">
            <h2 className="fs-3">Contact</h2>
            <p className="m-0 fs-normal">
              <b>Phone :</b> {post.user.phone}{" "}
            </p>
            <p className="m-0 mb-1 fs-normal">
              <b>Email :</b> {post.user.email}
            </p>
            <div className="d-flex gap-2 mb-2 w-100">
              <WhatsappButton
                phoneNumber={post.user.phone}
                message={"Hi, I am interested in your job. Please contact me."}
              />{" "}
              <CallButton phoneNumber={post.user.phone} />{" "}
              <GmailButton
                email={post.user.email}
                subject={"Job Enquiry"}
                body={"Hi, I am interested in your job. Please contact me."}
              />
            </div>
          </div>
          <div className="spm">
            <SinglePointerMap
              latitude={post.latitude}
              longitude={post.longitude}
            />
          </div>
          <div className="btns d-flex gap-2 mt-2">
            <div className="chat rounded-2 w-100">
              <button className="btn w-100 btn-warning" onClick={handleAddChat}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-send me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
                Chat
              </button>
            </div>
            <div className="save rounded-2 w-100">
              <button className="btn w-100 btn-warning" onClick={handleSave}>
                {saved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-bookmark-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill=""
                    className="bi bi-bookmark me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  </svg>
                )}
                {saved ? "Event Saved" : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade "
        id="staticBackdrop"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light text-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-100">
              Do you want to delete this post?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={deleting}
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
