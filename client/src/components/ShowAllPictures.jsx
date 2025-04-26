import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

function ShowAllPictures() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
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
  if(redirect) return <Navigate to={`/places/${id}`} />
  if (loading) return <div>Loading...</div>;
  return (
    <div className="bg-black text-white min-h-screen ">
      <div className="bg-black p-8 grid gap-4">
        <div className=" flex justify-between items-center">
          <h2 className="text-2xl">Photos of {place.title}</h2>
          <button className="flex items-center gap-2 bg-primary p-1 sm:px-2 rounded-full sm:rounded-2xl " onClick={()=>setRedirect(!redirect)}>
            <IoCloseCircle size={30} /> <span className="hidden sm:block text-lg">Close Photos</span>
          </button>
        </div>
        {
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {place.photos.map((photo) => (
                <img
                    key={photo}
                    className="aspect-square object-cover w-full"
                    src={`http://api-airbnb.basatmaqsood.com/uploads/${photo}`}
                    alt=""
                />
                ))}
            </div>
        }
      </div>
    </div>
  );
}

export default ShowAllPictures;
