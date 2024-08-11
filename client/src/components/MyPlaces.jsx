import { useParams } from "react-router-dom";
import AddNewPlace from "./AddNewPlace";
import { MyPlacesContent } from "./MyPlacesContent";
import ViewSinglePlace from "./ViewSinglePlace";

function MyPlaces() {
  const { action, id } = useParams();
  return (
    <div className="mt-8">
      {action === undefined && <MyPlacesContent />}
      {action === "new" && <AddNewPlace />}
      {action === "edit" && <ViewSinglePlace id={id} />}
    </div>
  );
}

export default MyPlaces;
