import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function Layout() {
  return (
    <div className="p-4 flex flex-col gap-2 min-h-screen">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout