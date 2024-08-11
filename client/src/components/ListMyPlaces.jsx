import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListMyPlaces() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);
  console.log(places);
  return (
    <div className="mt-4 flex flex-col gap-2">
      {places.length > 0 &&
        places.map((place, i) => {
          return (
            <Link to={`/account/places/view/${place._id}`}
              key={i}
              className="bg-gray-100 sm:p-0 p-3  flex gap-4 rounded-2xl items-center cursor-pointer"
            >
              <div className="h-24 w-24  rounded-lg hidden sm:block">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover rounded-lg h-24 "
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt="img"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1">
              <h2 className="text-2xl text-gray-900">{place.title}</h2>
              <p>{place.description}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default ListMyPlaces;
