/* eslint-disable react/prop-types */
import { FaWifi } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { TbParking } from "react-icons/tb";

function PerksInput({ perks, setPerks }) {
  function handlePerks(name) {
    if (perks.includes(name)) {
      setPerks(perks.filter((perk) => perk !== name));
      console.log(perks);
    } else {
      setPerks([...perks, name]);
      console.log(perks);
    }
  }
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2">
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
        checked={perks.includes("wifi")}
          type="checkbox"
          onChange={() => {
            handlePerks("wifi");
          }}
        />
        <FaWifi />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
        checked={perks.includes("parking")}
          type="checkbox"
          onChange={() => {
            handlePerks("parking");
          }}
        />
        <TbParking />
        <span>Free Parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
        checked={perks.includes("pets")}
          type="checkbox"
          onChange={() => {
            handlePerks("pets");
          }}
        />
        <MdPets />
        <span>Pets Allowed</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
        checked={perks.includes("entrance")}
          type="checkbox"
          onChange={() => {
            handlePerks("entrance");
          }}
        />
        <GiExitDoor />
        <span>Private Entrance</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
        checked={perks.includes("tv")}
          type="checkbox"
          onChange={() => {
            handlePerks("tv");
          }}
        />
        <PiTelevisionSimpleBold />
        <span>TV</span>
      </label>
    </div>
  );
}

export default PerksInput;
