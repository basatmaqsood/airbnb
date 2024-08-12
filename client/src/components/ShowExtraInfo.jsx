/* eslint-disable react/prop-types */

function ShowExtraInfo({place}) {

  return (
    <div className="flex flex-col justify-around gap-4 ">
    <div className="flex items-center justify-between border-b-2 border-black gap-4">
      <h2 className="text-xl font-semibold">CheckIn</h2>
      <p>{place.checkIn}</p>
    </div>
    <div className="flex items-center justify-between border-b-2 border-black gap-4">
      <h2 className="text-xl font-semibold">CheckOut</h2>
      <p>{place.checkOut}</p>
    </div>
    <div className="flex items-center justify-between border-b-2 border-black gap-4">

      <h2 className="text-xl font-semibold">Maximum Guests</h2>
      <p>{place.maxGuests}</p>
    </div>
  </div>
  )
}

export default ShowExtraInfo