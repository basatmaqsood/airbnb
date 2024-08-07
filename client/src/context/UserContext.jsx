/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [ready, setReady] = useState(false);
  useEffect(()=>{
    axios.get('/profile').then(res=>{
      setUser(res.data)
      setReady(true)
    });
  },[])

  return <UserContext.Provider value={{user,setUser,ready}}>{children}</UserContext.Provider>;
}
