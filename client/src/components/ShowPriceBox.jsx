/* eslint-disable react/prop-types */

function ShowPriceBox({ place }) {
  return (
    <div className="text-center w-full sm:max-w-max bg-white p-4 rounded-2xl flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-semibold">Price</h2>
        <p>${place.price} per Night</p>
      </div>
      <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-gray-300 p-2 rounded-xl justify-between">
        <label className="text-lg text-black" >CheckIn</label>
        <input
          type="date"
          className="w-full border border-gray-300 bg-gray-100 rounded-md p-1"
        />
      </div>
      <div className="flex sm:flex-row flex-col items-center sm:gap-6 bg-gray-300 p-2 rounded-xl justify-between">
        <label className="text-lg text-black" >CheckOut</label>
        <input
          type="date"
          className="w-full border border-gray-300 bg-gray-100 rounded-md p-1"
        />
      </div>
      <div>
        <button
          type="button"
          className="bg-primary text-white px-4 py-2 rounded-xl mt-4 w-full"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default ShowPriceBox;
