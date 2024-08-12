import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

function Main() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 mt-8 ">
      {places.map((place) => {
        return (
          <Link
            to={"/places/" + place._id}
            key={place._id}
            className="flex flex-col gap-2"
          >
            <div className="flex overflow-hidden">
              {place.photos[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square max-h-64 transform transition-transform duration-300 hover:scale-110 "
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  alt={place.name}
                />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold truncate">{place.title}</h2>
              <h3 className="text-sm text-gray-500 truncate">
                {place.address}
              </h3>
              <h4 className="text-gray-700 font-semibold">
                <span className="font-bold ">${place.price}</span> per Night
              </h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Main;
