import { useState } from "react";
import InputHeader from "./InputHeader";
import PerksInput from "./PerksInput";
import UploadPictures from "./UploadPictures";
import UploadByLink from "./UploadByLink";
import ExtraInfo from "./ExtraInfo";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AddNewPlace() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [maxGuests, setmaxGuests] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function saveNewPlace(e) {
    e.preventDefault();
    const newPlace = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuests,
    };
    try{

      const res = await axios.post("/places", newPlace);
      console.log(res);
      setRedirect(true);
    }catch(err){
      console.log(err);
      alert("Cannot Save the Place");
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  } else {
    return (
      <div>
        <form
          onSubmit={(e) => {
            saveNewPlace(e);
          }}
        >
          <InputHeader
            heading="Title"
            description="Must be Short and Catchy as in Advertisement"
          />
          <input
            type="text"
            placeholder="Enter Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputHeader heading="Address" description="Address to your Place" />
          <input
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <UploadByLink
            photoLink={photoLink}
            setPhotoLink={setPhotoLink}
            addedPhotos={addedPhotos}
            setaddedPhotos={setaddedPhotos}
          />
          <UploadPictures
            addedPhotos={addedPhotos}
            setaddedPhotos={setaddedPhotos}
          />
          <InputHeader
            heading="Description"
            description="Tell us more about the place"
          />
          <textarea
            placeholder="House rules e.t.c."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputHeader
            heading="Perks"
            description="Select all the perks you offer"
          />
          <PerksInput perks={perks} setPerks={setPerks} />
          <InputHeader
            heading="Extra Info"
            description="Add check-in,check out time and maximum number of Guests"
          />

          <ExtraInfo
            checkIn={checkIn}
            setcheckIn={setcheckIn}
            checkOut={checkOut}
            setcheckOut={setcheckOut}
            maxGuests={maxGuests}
            setmaxGuests={setmaxGuests}
          />
          <button className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-2 mt-4">
            Save
          </button>
        </form>
      </div>
    );
  }
}
export default AddNewPlace;
