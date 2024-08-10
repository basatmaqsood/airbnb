import { useContext } from "react";
import { FaUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function NavUser() {
  const { user } = useContext(UserContext);
  return (
    <Link
      to={user ?"/account" : "/login"}
      className="flex gap-3 border py-2 px-4 border-gray-300 rounded-full items-center "
    >
      <RxHamburgerMenu className="size-5 hidden md:block" />
      <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden p-1">
        <FaUser className="size-6 relative top-1" />
      </div>
      {!!user && <div>{user.username}</div>}
    </Link>
  );
}

export default NavUser;
