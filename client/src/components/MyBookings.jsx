import { useEffect, useState } from "react";
import axios from "axios";  
import { MdDateRange } from "react-icons/md";
import { differenceInDays } from "date-fns";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
      console.log(res.data);
    });
  }, []);
    console.log(bookings);
  return     <div className="mt-4 flex flex-col gap-2">
  {bookings.length > 0 &&
    bookings.map((booking, i) => {
      return (
        <Link 
        to={`/places/${booking.place._id}`}
          key={i}
          className="bg-gray-100 sm:p-0 p-3  flex gap-4 rounded-2xl items-center cursor-pointer"
        >
          <div className="h-24 w-24  rounded-lg hidden sm:block">
            {booking.place.photos.length > 0 && (
              <img
                className="object-cover rounded-lg h-24 "
                src={`http://localhost:4000/uploads/${booking.place.photos[0]}`}
                alt="img"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
          <h2 className="text-2xl text-gray-900">{booking.place.title}</h2>
          <div className="sm:flex gap-8 justify-between">
            <div className="flex items-center gap-1">
            <MdDateRange />
            <p className="text-gray-500">{new Date(booking.checkIn).toDateString()}</p>
            </div>
            <div>
              <p>to</p>
            </div>
            <div className="flex items-center gap-1">
            <MdDateRange />
            <p className="text-gray-500">{new Date(booking.checkOut).toDateString()}</p>  
            </div>
          </div>
          <div className="flex gap-8 sm:flex-row justify-between"> 
          <p className="text-gray-500">Total Price: ${booking.totalprice}</p>
          <p className="text-gray-500">Number of Nights { differenceInDays(new Date(booking.checkOut), new Date(booking.checkIn))}</p>
          </div>
          </div>
        </Link>
      );
    })}
</div>
}

export default MyBookings;
