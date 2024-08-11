import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import ListMyPlaces from "./ListMyPlaces"

export const MyPlacesContent = () => {
  return (
    <div>
    <div className="text-center">
      <Link
        to="/account/places/new"
        className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-2"
      >
        <FaPlus />
        Add a new place
      </Link>
    </div>
    <ListMyPlaces />
  </div>  )
}
