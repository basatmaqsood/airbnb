/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { Navigate } from "react-router-dom";

function ShowPlacePhotos({ photos, id }) {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Navigate to={`/pictures/${id}`} />;
  function handleClick() {
    setRedirect(true);
  }
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-[2fr_1fr] overflow-hidden rounded-2xl ">
      <div className="overflow-hidden">
        {photos[0] && (
          <img
            className="aspect-square object-cover w-full transform transition-transform duration-300 hover:scale-110"
            src={`http://localhost:4000/uploads/${photos[0]}`}
            alt=""
          />
        )}
      </div>
      <div className="">
        <div className="overflow-hidden">
          {photos[1] && (
            <img
              className="hidden md:block  aspect-square object-cover w-full transform transition-transform duration-300 hover:scale-110"
              src={`https://api-airbnb.basatmaqsood.com/uploads/${photos[1]}`}
              alt=""
            />
          )}
        </div>
        <div className="overflow-hidden relative">
          {photos[2] && (
            <img
              className="aspect-square object-cover w-full md:relative md:top-2 transform transition-transform duration-300 hover:scale-110 "
              src={`http://localhost:4000/uploads/${photos[2]}`}
              alt=""
            />
          )}
          <button
            className="absolute bottom-2 right-2 p-1 bg-white text-primary rounded-full sm:px-2 gap-2 shadow-lg flex items-center "
            onClick={() => handleClick()}
          >
            <BiShow size={20} />
            <span className="hidden sm:block ">Show All Pictures</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowPlacePhotos;
