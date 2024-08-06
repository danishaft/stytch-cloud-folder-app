import { Outlet } from "react-router-dom"
import { Navbar, SideNav } from "../custom"

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fdfdfd] p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
