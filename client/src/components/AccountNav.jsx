/* eslint-disable react/prop-types */
import { FaList, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PiBuildingsLight } from "react-icons/pi";

function AccountNav({subpage}) {
  function linkClass(subpageName = undefined) {
    if (subpage === subpageName) return "py-2 px-6 bg-primary rounded-full text-white inline-flex items-center gap-2";
    return "py-2 px-6 inline-flex items-center gap-2 bg-gray-200 rounded-full";
  }

  return (
    <nav className="flex w-full mt-8 gap-2 justify-center items-center md:flex-row flex-col">
      <Link className={linkClass()} to={"/account"}>
      <FaRegUser /> My Profile
      </Link>
      <Link className={linkClass("bookings")} to={"/account/bookings"}>
      <FaList />
        My Bookings
      </Link>
      <Link className={linkClass("places")} to={"/account/places"}>
      <PiBuildingsLight />
        My Accomodations
      </Link>
    </nav>
  );
}

export default AccountNav;
