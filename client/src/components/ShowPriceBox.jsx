/* eslint-disable react/prop-types */
import { differenceInDays } from "date-fns";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Modal from "./PromptWindow";
import { Navigate } from "react-router-dom";

function ShowPriceBox({ place }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const { user } = useContext(UserContext);
  const [accountNavigation, setAccountNavigation] = useState(false);
  const [bookingNavigation, setBookingNavigation] = useState(false);
  const [showErrorPrompt, setShowErrorPrompt] = useState(false);
  const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);
  const [showAccountLoginPrompt, setShowAccountLoginPrompt] = useState(false);

  console.log(user);
  let totalprice =
    checkIn &&
    checkOut &&
    differenceInDays(new Date(checkOut), new Date(checkIn)) * place.price;
  totalprice = totalprice ? totalprice : 0;

  const booking = {
    name,
    mobile,
    checkIn,
    checkOut,
    totalprice,
    place: place._id,
    booker: user?._id,
  };

  function bookNow() {
    if (!user) {
      setShowAccountLoginPrompt(true);
      return;
    }
    if (!checkIn || !checkOut || !name || !mobile) {
      setShowErrorPrompt(true);
      return;
    }
    axios
      .post("/book", booking)
      .then(() => {
        setShowSuccessPrompt(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    return (
      <>
      <div className="text-center w-full sm:max-w-max bg-white p-4 rounded-2xl flex flex-col gap-3">
        <div>
          <h2 className="text-xl font-semibold">Price</h2>
          <p>${place.price} per Night</p>
        </div>
        <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-primary p-2 rounded-xl justify-between">
          <label className="text-lg text-white">CheckIn</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
            }}
            className="w-full border  bg-white rounded-md p-1 outline-none"
          />
        </div>
        <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-primary p-2 rounded-xl justify-between">
          <label className="text-lg text-white">CheckOut</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
            }}
            className="w-full border  bg-white rounded-md p-1 outline-none"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Total Price</h2>
          <p>${totalprice} Total</p>
        </div>

        {checkIn && checkOut && (
          <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-primary p-2 rounded-xl justify-between">
            <label className="text-lg text-white">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full border  bg-white rounded-md p-1 outline-none"
            />
          </div>
        )}
        {checkIn && checkOut && (
          <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-primary p-2 rounded-xl justify-between">
            <label className="text-lg text-white">Mobile</label>
            <input
              type="tel"
              value={mobile}
              placeholder="Enter your mobile number"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              className="w-full border  bg-white rounded-md p-1 outline-none"
            />
          </div>
        )}
        <div>
          <button
            onClick={() => bookNow()}
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-xl  w-full"
          >
            Book Now
          </button>
        </div>
      </div>
      {showErrorPrompt && ( <Modal
        message={"Please fill all the fields"}
        setShowErrorPrompt={setShowErrorPrompt}
        
      />)}
      {showSuccessPrompt && (
        <Modal
          message={`Booking Successfull for ${place.title} from ${checkIn} to ${checkOut}. You'll be redirected to Bookings Page`}
          setShowSuccessPrompt={setShowSuccessPrompt}
          setNavigation={setBookingNavigation}
        />
      )}
      {showAccountLoginPrompt && (
        <Modal
          message="Please Login to Book"
          setShowErrorPrompt={setShowAccountLoginPrompt}
          setNavigation={setAccountNavigation}
        />
      )}
      {bookingNavigation && <Navigate to="/account/bookings" />}
      {accountNavigation && <Navigate to="/login" />}
      </>

    );
}

export default ShowPriceBox;
