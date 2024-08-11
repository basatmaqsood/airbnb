/* eslint-disable react/prop-types */
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

function UploadPictures({ addedPhotos, setaddedPhotos }) {
  function uploadPhotos(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setaddedPhotos([...addedPhotos, ...data]);
      })
      .catch((err) => {
        console.log(err);
        alert("Cannot Upload the Photo");
      });
  }

  function deletePhoto(e,index) {
    const newPhotos = addedPhotos.filter((_, i) => i !== index);
    setaddedPhotos(newPhotos);
  }

  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
      <label className="h-32 border border-gray-300 bg-transparent rounded-2xl text-2xl text-gray-600 p-8 flex gap-2 justify-center items-center">
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
          <div
            key={i}
            className="h-32 relative flex border rounded-2xl border-gray-300"
          >
            <img
              className="rounded-2xl w-full object-cover"
              src={`http://localhost:4000/uploads/${photo}`}
              alt="picture"
            />
            <div className="absolute bottom-2 right-2 bg-white  p-1 rounded-full cursor-pointer shadow-md border " onClick={(e)=>{deletePhoto(e,i)}}>
              <MdDelete size={20} color="#F5385D" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UploadPictures;
