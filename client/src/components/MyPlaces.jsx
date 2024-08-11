import { useParams } from "react-router-dom";
import AddNewPlace from "./AddNewPlace";
import { MyPlacesContent } from "./MyPlacesContent";

function MyPlaces() {
  const { action, id } = useParams();
  return (
    <div className="mt-8">
      {action === undefined && <MyPlacesContent />}
      {action === "new" && <AddNewPlace />}
      {action === "view" && <div>{id}</div>}
    </div>
  );
}

export default MyPlaces;
