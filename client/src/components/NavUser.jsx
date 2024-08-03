import { FaUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

function NavUser() {
  return (
    <Link to={"/login"} className="flex gap-3 border py-2 px-4 border-gray-300 rounded-full items-center ">
      <RxHamburgerMenu className="size-5"/>
      <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden p-1">
        <FaUser className="size-6 relative top-1" />
      </div>
    </Link>
  );
}

export default NavUser;
