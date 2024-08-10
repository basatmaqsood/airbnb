import { FaWifi } from "react-icons/fa"
import { GiExitDoor } from "react-icons/gi"
import { MdPets } from "react-icons/md"
import { PiTelevisionSimpleBold } from "react-icons/pi"
import { TbParking } from "react-icons/tb"

function PerksInput({perks, setPerks}) {
  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2">
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" />
      <FaWifi />
      <span>Wifi</span>
    </label>
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" />
      <TbParking />
      <span>Free Parking</span>
    </label>
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" />
      <MdPets />
      <span>Pets Allowed</span>
    </label>
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" />
      <GiExitDoor />
      <span>Private Entrance</span>
    </label>
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input type="checkbox" />
      <PiTelevisionSimpleBold />
      <span>TV</span>
    </label>
  </div>  )
}

export default PerksInput