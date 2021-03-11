import React from "react";
import styles from "./SubRoutes.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingDetails } from "../../../Redux/BookBus/action";

const SubRoutes = ({ handleBoardAndDrop, routeDetails }) => {
  const [pointActive, setPointActive] = React.useState(true);

  //get boarding and destination point
  const [boardPoint, setBoardPoint] = React.useState("");
  const [destPoint, setDestPoint] = React.useState("");

  var boardingStyle, droppingStyle;

  const activeStyle = {
    borderBottom: "3px solid red",
  };

  const inactiveStyle = {
    borderBottom: "0px",
  };

  if (pointActive === false) {
    droppingStyle = activeStyle;
    boardingStyle = inactiveStyle;
  } else {
    droppingStyle = inactiveStyle;
    boardingStyle = activeStyle;
  }

  const boardingSubpoints = routeDetails["departureLocation"]["subLocations"];
  const destinationSubpoints = routeDetails["arrivalLocation"]["subLocations"];

  const handleBoardChange = (e) => {
    setBoardPoint(e.target.value);
  };

  const handleDestChange = (e) => {
    setDestPoint(e.target.value);
  };

  let dispatch = useDispatch();
  const handleBoardAndDrop2 = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate;
    if (month < 10) {
      newdate = year + "-0" + month + "-" + day;
    } else {
      newdate = year + "-" + month + "-" + day;
    }

    const payload1 = {
      key: "departureDetails",
      value: {
        city: routeDetails["departureLocation"].name,
        location: boardPoint,
        time: routeDetails["duration"],
        date: newdate,
      },
    };

    const payload2 = {
      key: "arrivalDetails",
      value: {
        city: routeDetails["arrivalLocation"].name,
        location: destPoint,
        time: routeDetails["duration"],
        date: newdate,
      },
    };

    dispatch(updateBookingDetails(payload1));
    dispatch(updateBookingDetails(payload2));

    handleBoardAndDrop();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer1}>
        <div onClick={() => setPointActive(!pointActive)} style={boardingStyle}>
          BOARDING POINT
        </div>
        <div onClick={() => setPointActive(!pointActive)} style={droppingStyle}>
          DROPPING POINT
        </div>
      </div>
      <div>
        {pointActive ? (
          <div
            className={styles.mainContainer2}
            key="boardingContainer"
            onChange={handleBoardChange}
          >
            {boardingSubpoints.map((item) => {
              return (
                <div className={styles.mainContainer21} key={item}>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#4a4a4a",
                      fontWeight: "700",
                    }}
                  >
                    <input
                      type="radio"
                      id={item}
                      name="board-address"
                      value={item}
                    />
                    &nbsp;&nbsp; 9:30
                  </div>
                  <div>
                    <span style={{ fontSize: "16px", color: "#3e3e52" }}>
                      {item}
                    </span>
                    <span style={{ fontSize: "14px", color: "#7e7e8c" }}>
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={styles.mainContainer2}
            key="destinationContainer"
            onChange={handleDestChange}
          >
            {destinationSubpoints.map((item) => {
              return (
                <div className={styles.mainContainer21} key={item}>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#4a4a4a",
                      fontWeight: "700",
                    }}
                  >
                    <input
                      type="radio"
                      id={item}
                      name="dest-address"
                      value={item}
                    />
                    &nbsp;&nbsp; 9:30
                  </div>
                  <div>
                    <span style={{ fontSize: "16px", color: "#3e3e52" }}>
                      {item}
                    </span>
                    <span style={{ fontSize: "14px", color: "#7e7e8c" }}>
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button className={styles.continueButton} onClick={handleBoardAndDrop2}>
        Continue
      </button>
    </div>
  );
};

export { SubRoutes };
