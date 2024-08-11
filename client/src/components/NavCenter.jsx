import { CiSearch } from "react-icons/ci";

function NavCenter() {
  return (
    <div className="hidden md:flex gap-2 border py-2 px-4 border-gray-300 rounded-full items-center shadow-md shadow-gray-200 ">
      <div>Anywhere</div>
      <div className="border-l border-gray-300 w-[1px] h-7"></div>
      <div>Any week</div>
      <div className="border-l border-gray-300 w-[1px] h-7"></div>
      <div>Any giest</div>
      <button className="bg-primary text-white font-bold p-2 rounded-full">
        <CiSearch className="size-6 font-bold" />
      </button>
    </div>
  );
}

export default NavCenter;
