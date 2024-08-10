import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";



function MyProfileSection() {
    const { user,setUser } = useContext(UserContext);
    async function logout(){
        await axios.post('/logout');
        setUser(null);
    }
  return (
    <div className="text-center mx-auto max-w-md mt-8">
        <h3>Logged In as {user.username}</h3>
        <button onClick={()=>{logout()}} className="primary max-w-sm mt-2">LogOut</button>
    </div>
  )
}

export default MyProfileSection