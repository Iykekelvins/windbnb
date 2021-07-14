import React, { useState } from "react";
import Users from "./Users";
import modalStyles from "../styles/Modal.module.css";
import { Animated } from "react-animated-css";

const Modal = ({
  location,
  isVisible,
  setIsVisible,
  stays,
  findLocation,
  setPlaces,
  setLocation,
  checkLocation,
  checkGuests,
}) => {
  const [isLocation, setIsLocation] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [child, setChild] = useState(0);
  const [adult, setAdult] = useState(0);
  const values = [child, adult];
  const total = values.reduce((acc, item) => (acc += item));

  const checkNumber = (number) => {
    if (number < 0) {
      return 0;
    }
    return number;
  };

  const modalGuests = (number) => {
    const filterList = stays.filter(
      (item) => item.maxGuests >= Math.abs(number) && item.beds != null
    );
    if (total && filterList.length > 0) {
      setPlaces(filterList);
      setIsVisible(false);
      setAdult(0);
      setChild(0);
      setIsGuest(false);
    } else if (!total || filterList.length === 0) {
      return null;
    }
  };

  const modalLocation = (value) => {
    const filterList = stays.filter(
      (item) => item.city.toLowerCase().indexOf(value[0].toLowerCase()) > -1
    );

    if (location && filterList.length > 0) {
      setPlaces(filterList);
      setIsVisible(false);
      setIsLocation(false);
    } else if (!location || filterList.length === 0) {
      return null;
    }
  };

  const checkFunction = () => {
    if (location) {
      modalLocation(location);
    } else if (total) {
      modalGuests(total);
    } else {
      modalLocation(location);
      modalGuests(total);
    }
  };

  const increaseChild = () => {
    setChild((child) => {
      let newChild = child + 1;

      return checkNumber(newChild);
    });
  };

  const decreaseChild = () => {
    setChild((child) => {
      let newChild = child - 1;

      return checkNumber(newChild);
    });
  };

  const increaseAdult = () => {
    setAdult((adult) => {
      let newAdult = adult + 1;

      return checkNumber(newAdult);
    });
  };

  const decreaseAdult = () => {
    setAdult((adult) => {
      let newAdult = adult - 1;

      return checkNumber(newAdult);
    });
  };

  return (
    <Animated
      animationIn="fadeInUpBig"
      animationOut="fadeOutUpBig"
      animationInDuration={800}
      isVisible={isVisible}
    >
      <div className={modalStyles.overlay}>
        <div className={modalStyles.modal}>
          <div className={modalStyles.top}>
            <h5>Edit your search</h5>
            <button onClick={() => setIsVisible(false)}>x</button>
          </div>
          <div className={modalStyles.input_box}>
            <form className={modalStyles.block} onSubmit={checkLocation}>
              <span>LOCATION</span>
              <input
                type="text"
                className={modalStyles.input}
                value={location}
                placeholder="Helsinki, Finland"
                onChange={(e) => setLocation(e.target.value)}
                onClick={() => setIsLocation(true)}
              />
            </form>
            <form className={modalStyles.add} onSubmit={checkGuests}>
              <span>GUESTS</span>{" "}
              <input
                type="text"
                className={modalStyles.input}
                defaultValue={`${total === 0 ? "" : total}`}
                placeholder="Add guests"
                onClick={() => setIsGuest(true)}
              />
            </form>
            <button className={modalStyles.btn} onClick={checkFunction}>
              <i
                className="fas fa-search"
                style={{
                  marginRight: "0.5rem",
                }}
              ></i>
              Search
            </button>
          </div>

          <section
            className={
              isLocation
                ? `${modalStyles.city_users} ${modalStyles.isLocation}`
                : `${modalStyles.city_users}`
            }
          >
            <Animated
              animationIn="fadeInDownBig"
              animationOut="fadeOutUpBig"
              isVisible={isLocation}
            >
              <div>
                {isLocation &&
                  findLocation.map((item, index) => {
                    return (
                      <h4 style={{ fontWeight: "500" }} key={index}>
                        <i
                          className="fas fa-map-marker-alt"
                          style={{ marginRight: "0.5rem", color: "black" }}
                        ></i>
                        {item}, Finland
                      </h4>
                    );
                  })}
              </div>
            </Animated>
            <Animated
              animationIn="fadeInDownBig"
              animationOut="fadeOutUpBig"
              isVisible={isGuest}
            >
              {isGuest && (
                <div style={{ position: "relative", minHeight: "180px" }}>
                  <Users
                    adult={adult}
                    child={child}
                    setIsGuest={setIsGuest}
                    increaseAdult={increaseAdult}
                    decreaseAdult={decreaseAdult}
                    increaseChild={increaseChild}
                    decreaseChild={decreaseChild}
                  />
                </div>
              )}
            </Animated>
          </section>
        </div>
      </div>
    </Animated>
  );
};

export default Modal;
