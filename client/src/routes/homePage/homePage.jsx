import "./homePage.css";
import Input from "../../components/input/input";
import ArrowBtn from "../../components/arrowBtn/arrowBtn";
import { useNavigate } from "react-router-dom";
import profiling from "../../assets/profiling.svg";
import { Fade } from "react-awesome-reveal";

const homePage = () => {
  const statements = [
    "Effortlessly bringing Caterers and Servers together.",
    "Effortless Connections for Exceptional Events",
  ];

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault(e.target);
    navigate("new-post");
  };

  return (
    <div className="homePage ">
      <div className="container ">
        <div className="row h-100lvh ">
          <div className="col-12 col-xl-7">
            <div className="hero-section mt-lg-0 mt-3 flex-column d-flex justify-content-center align-item-center">
              <div className="hero-text mb-3">
                <span className="">
                  Effortless Connections for Extraordinary Events.
                </span>
              </div>
              <Fade delay={100} triggerOnce>
                <p className=" fs-5 d-none d-md-block">
                  Our platform not only connects catering contractors with
                  skilled server staff but also creates abundant job
                  opportunities for servers.
                </p>
              </Fade>
              <Fade delay={500} triggerOnce>
                <div className="row mx-2 mx-md-0  gap-4 mt-2 ">
                  <div className="col-12 box-shadow col-md-6 glass p-3 ">
                    <h3 className="mb-3">For Server Staff:</h3>
                    <Input />
                  </div>
                  <div className="col-12 box-shadow col-md-5 glass p-3">
                    <h3 className="mb-3">For Contractors:</h3>
                    <ArrowBtn text="Post Event" handleClick={handleClick} />
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <div className="col-12 col-xl-5 d-flex justify-content-center align-items-center mt-md-0 mt-4">
            <img src={profiling} className="img-fluid homeImg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default homePage;
