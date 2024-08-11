/* eslint-disable react/prop-types */

function ExtraInfo({ checkIn, setcheckIn, checkOut, setcheckOut, maxGuests, setmaxGuests,price,setPrice }) {
  return (
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
          <input
            type="number"
            placeholder="Price Per Night i.e. $10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
    )
}

export default ExtraInfo