import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import InputHeader from "./InputHeader";
import PerksInput from "./PerksInput";
import axios from "axios";
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

  function addPhotoByLink(e) {
    e.preventDefault();
    axios
      .post("/upload-by-link", { link: photoLink })
      .then(({ data }) => {
        console.log(data);
        setaddedPhotos([...addedPhotos, data]);
      })
      .catch((err) => {
        console.log(err);
        alert("Cannot Upload the Photo");
      });
    setPhotoLink("");
  }

  function uploadPhotos(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload',data,{
      headers:{'Content-Type': 'multipart/form-data'}
    }).then(({data})=>{
      setaddedPhotos([...addedPhotos,...data]);
    }).catch(err=>{
      console.log(err);
      alert("Cannot Upload the Photo");
    })
  }

  return (
    <div>
      <form>
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
        <InputHeader heading="Photos" description="More = Better" />
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Upload Using a Link..."
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-gray-200 rounded-2xl"
            onClick={(e) => addPhotoByLink(e)}
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
          <label  className="h-32 border border-gray-300 bg-transparent rounded-2xl text-2xl text-gray-600 p-8 flex gap-2 justify-center items-center">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                uploadPhotos(e);
              }}
            />
            <IoCloudUploadOutline />
            Upload
          </label>
          {addedPhotos?.map((photo, i) => {
            return (
              <div key={i} className="h-32 flex border rounded-2xl border-gray-300">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt="picture"
                />
              </div>
            );
          })}
        </div>
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

        <div className="grid gap-2 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Check-In Time i.e. 14:00"
            value={checkIn}
            onChange={(e) => setcheckIn(e.target.value)}
          />
          <input
            type="text"
            placeholder="Check-Out Time i.e. 22:00"
            value={checkOut}
            onChange={(e) => setcheckOut(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Guests i.e. 4"
            value={maxGuests}
            onChange={(e) => setmaxGuests(e.target.value)}
          />
        </div>
        <button className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-2 mt-4">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddNewPlace;
