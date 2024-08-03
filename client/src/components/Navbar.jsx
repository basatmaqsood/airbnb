import { FaAirbnb } from "react-icons/fa6";
import NavCenter from "./NavCenter";
import NavUser from "./NavUser";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className=" flex justify-between items-center h-max">
      <Link to={'/'} href="" className="flex items-center gap-1 ">
        <FaAirbnb className="size-10" />
        <span className="font-bold text-2xl">airbnb</span>
      </Link>
      <NavCenter />
      <NavUser/>
    </header>
  );
}

export default Navbar;
