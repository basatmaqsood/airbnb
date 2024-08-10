import { Link, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AddNewPlace from "./AddNewPlace";

function MyPlaces() {
  const { action } = useParams();
  return (
    <div className="mt-8">
      {action !== "new" && (
        <div className="text-center">
          <Link
            to="/account/places/new"
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-2"
          >
            <FaPlus />
            Add a new place
          </Link>
        </div>
      )}
        {action === "new" && <AddNewPlace/>}
    </div>
  );
}

export default MyPlaces;
