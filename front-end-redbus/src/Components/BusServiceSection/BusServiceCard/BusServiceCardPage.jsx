import React from "react";
import axios from "axios";
import design from "./BusServiceCard.module.css";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const BusServiceCardPage = () => {
  const [result, setResult] = React.useState([]);

  const history = useHistory();
  const handleClick = (str) => {
    history.push(str);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/v1/api/busservice/")
      .then((res) => {
        setResult(res.data.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={design.mainContainer}>
      <div className={design.leftContainer}>
        <h1 style={{ textTransform: "none" }}>
          We have {result.length !== 0 ? result.length : 0} quotation
        </h1>
        <div className={design.cardContainer}>
          {result?.map((item) => {
            return (
              <div className={design.card}>
                <div className={design.imgBox}>
                  <img src={item.img} alt="" />
                </div>
                <div>
                  <h2>{item.vehicle}</h2>
                  <p></p>
                  <h1
                    style={{
                      textAlign: "right",
                      margin: "20px 8px 20px 0px",
                      color: "#d84f57",
                      textTransform: "none",
                    }}
                  >
                    <span style={{ fontSize: "16px", color: "grey" }}>
                      Staring Cost
                    </span>{" "}
                    <br /> Rs.{item.total}
                  </h1>
                </div>
                <div className={design.footerCard}>
                  {/* <Link to={`/busdetails/:${item._id}`}>view details</Link> */}
                  <Button
                    onClick={() => handleClick(`/busdetails/${item._id}`)}
                    color="primary"
                  >
                    view details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={design.rightContainer}>
        <div className={design.blueContainer}>
          <img
            style={{ display: "inline-block", marginRight: "16px" }}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fmoney-icons%2F100%2F1-512.png&f=1&nofb=1"
            alt=""
            height="60px"
          />
          <p style={{ display: "inline-block" }}>
            Pay just 25% as advance to book
          </p>
        </div>
        <div className={design.blueContainer}>
          <img
            style={{ display: "inline-block", marginRight: "16px" }}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4QKxNTpVlc7F3vqAPsb_NgHaHa%26pid%3DApi&f=1"
            alt=""
            height="60px"
          />
          <p style={{ display: "inline-block" }}>
            Free Cancellation till 20 Mar 2021, 04:15 PM
          </p>
        </div>
        <div className={design.safetyContainer}>
          <div className={design.BusimgBox}>
            <img
              src="https://s3.rdbuz.com/Images/webplatform/measures/safetyplus.svg"
              alt=""
            />
          </div>
          <div className={design.orange}>
            <h4>Safety + </h4>
            <p>Your safety is our first priority</p>
          </div>
          <ul style={{ textAlign: "left" }}>
            <li>Hand sanitiser in all vehicles</li>
            <li>Masks worn by all staff</li>
            <li>Deep cleaning of vehicles</li>
            <li>No Blankets / Linen provided </li>
            <li>Regular staff body temprature checks</li>
          </ul>
        </div>
        <div
          style={{
            padding: "10px",
            backgroundColor: "#E5EBF8",
            marginTop: "20px",
          }}
        >
          <h3>Covid 19 travel guidelines</h3>
          <p>Check latest travel guidelines issued by State Governments</p>
          <hr />
          <p style={{ color: "blue", textAlign: "right", padding: "6px" }}>
            Read Guidelines
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusServiceCardPage;