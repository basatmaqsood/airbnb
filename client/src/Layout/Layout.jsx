import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function Layout() {
  return (
    <div className="py-4 px-4 sm:px-8 flex flex-col gap-2 min-h-screen">
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout