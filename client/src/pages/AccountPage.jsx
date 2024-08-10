import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import MyProfileSection from "../components/MyProfileSection";
import MyPlaces from "../components/MyPlaces";
import MyBookings from "../components/MyBookings";

function AccountPage() {
  const { user, ready } = useContext(UserContext);
  const { subpage } = useParams();

  if (!ready) return <div>Loading...</div>;
  if (ready && !user) return <Navigate to={"/login"} />;
  else
    return (
      <div>
        <AccountNav subpage={subpage} />

        {subpage === undefined && <MyProfileSection/>}
        {subpage === "places" && <MyPlaces/>}
        {subpage === "bookings" && <MyBookings/>}
      </div>
    );
}

export default AccountPage;
