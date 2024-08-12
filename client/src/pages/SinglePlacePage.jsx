import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowPlacePhotos from "../components/ShowPlacePhotos";

function SinglePlacePage() {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [place, setPlace] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((res) => {
      console.log(res.data);
      setPlace(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-4 py-4 bg-gray-100 px-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="block underline font-semibold my-2 text-gray-700"
        target="_blank"
        href={`https:maps.google.com/?q=${place.address}`}
      >
        {place.address}
      </a>
      <ShowPlacePhotos photos={place.photos} showAll={showAll} setShowAll={setShowAll}/>
    </div>
  );
}

export default SinglePlacePage;
