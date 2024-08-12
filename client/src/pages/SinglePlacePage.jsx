import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowPlacePhotos from "../components/ShowPlacePhotos";
import ShowExtraInfo from "../components/ShowExtraInfo";
import ShowPriceBox from "../components/ShowPriceBox";
import ShowPlaceHeader from "../components/ShowPlaceHeader";
import ShowDescription from "../components/ShowDescription";

function SinglePlacePage() {
  const [loading, setLoading] = useState(true);
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
    <div className="mt-4 py-4 bg-gray-100 px-8 flex flex-col gap-4">
      <ShowPlaceHeader place={place} />
      <ShowPlacePhotos photos={place.photos} id={id} />
      <div className="flex sm:flex-row flex-col justify-between gap-4">
     <div className="flex flex-col gap-4">
      <ShowDescription place={place} />
        <ShowExtraInfo place={place}/>
      </div> 
        <ShowPriceBox place={place}/>
      </div>

    </div>
  );
}

export default SinglePlacePage;
