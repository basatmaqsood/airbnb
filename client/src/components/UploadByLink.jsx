/* eslint-disable react/prop-types */
import axios from "axios";
import InputHeader from "./InputHeader"

function UploadByLink({ photoLink, setPhotoLink, addedPhotos, setaddedPhotos }) {
    
  function addPhotoByLink(e) {
    e.preventDefault();
    axios.post("/upload-by-link", { link: photoLink }).then(({ data }) => {
        setaddedPhotos([...addedPhotos, data]);
      }).catch((err) => {
        console.log(err);
        alert("Cannot Upload the Photo");
      });
    setPhotoLink("");
  }
  return (
    <>
            <InputHeader heading="Photos" description="Upload Main Photo as first" />
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
    </>
  )
}

export default UploadByLink