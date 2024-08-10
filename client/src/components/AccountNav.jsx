/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function AccountNav({subpage}) {
  function linkClass(subpageName = undefined) {
    if (subpage === subpageName) return "py-2 px-6 bg-primary rounded-full text-white";
    return "py-2 px-6";
  }

  return (
    <nav className="flex w-full mt-8 gap-2 justify-center">
      <Link className={linkClass()} to={"/account"}>
        My Profile
      </Link>
      <Link className={linkClass("bookings")} to={"/account/bookings"}>
        My Bookings
      </Link>
      <Link className={linkClass("places")} to={"/account/places"}>
        My Accomodations
      </Link>
    </nav>
  );
}

export default AccountNav;
