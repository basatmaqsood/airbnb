/* eslint-disable react/prop-types */
import { BiShow } from "react-icons/bi";

function ShowPlacePhotos({ photos, setShowAll, showAll }) {
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-[2fr_1fr] ">
      <div>
        {photos[0] && (
          <img
            className="aspect-square object-cover w-full"
            src={`http://localhost:4000/uploads/${photos[0]}`}
            alt=""
          />
        )}
      </div>
      <div className="">
        <div>
          {photos[1] && (
            <img
              className="hidden md:block  aspect-square object-cover w-full"
              src={`http://localhost:4000/uploads/${photos[1]}`}
              alt=""
            />
          )}
        </div>
        <div className="overflow-hidden relative">
          {photos[2] && (
            <img
              className="aspect-square object-cover w-full md:relative md:top-2 "
              src={`http://localhost:4000/uploads/${photos[2]}`}
              alt=""
            />
          )}
          <button
            className="absolute bottom-2 right-2 p-1 bg-white text-primary rounded-full shadow shadow-lg "
            onClick={()=> setShowAll(!showAll)}
          >
            <BiShow size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowPlacePhotos;
