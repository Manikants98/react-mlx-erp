import * as Material from "@mui/material"
import { sidebarData } from "Mock"
import logo from "Resources/opraah-logo.png"
import Image from "Shared/Image"
import classNames from "classnames"
import { useLocation, useNavigate } from "react-router-dom"
import GlassDiv from "Shared/GlassDiv"

const Sidebar = () => {
  const { pathname } = useLocation()
  const storeLogo = localStorage.getItem("logo")
  const navigate = useNavigate()

  return (
    <>
      <div
        id="sidebar"
        className="flex gap-px flex-col w-[15vw] justify-between !text-sm transition-all duration-500 h-full"
      >
        <Material.ListItem component={GlassDiv} className="!font-semibold !text-xl items-center !flex gap-2 !py-5">
          <Image src={storeLogo} altImage={logo} options={{ className: "h-12" }} />
        </Material.ListItem>

        <Material.List
          component={GlassDiv}
          className="flex flex-col !p-1 justify-between w-full hide-scroll relative overflow-y-auto h-full"
        >
          <span className="flex flex-col gap-px">
            {sidebarData.map((navItem) => {
              const isActive = navItem.navLink === pathname
              return (
                <Material.ListItemButton
                  key={navItem.id}
                  onClick={() => navigate(navItem.navLink)}
                  className={classNames(
                    "!pl-4 !p-1 !flex !justify-between !whitespace-nowrap !border-2 !border-solid !border-white !rounded-md !w-full",
                    isActive ? "!bg-white !bg-opacity-10 !border-opacity-10 font-bold" : "!border-opacity-0"
                  )}
                >
                  <span className="flex items-center justify-center gap-3">
                    {navItem.navIcon} {navItem.navItem}
                  </span>
                </Material.ListItemButton>
              )
            })}
          </span>
        </Material.List>
      </div>
    </>
  )
}

export default Sidebar
