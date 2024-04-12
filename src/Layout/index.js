import { ThemeProvider, createTheme } from "@mui/material"
import BreadCrumbs from "Shared/BreadCrumbs"
import Header from "Shared/Header"
import Sidebar from "Shared/Sidebar"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Layout component
 * @param {Object} props - Component props
 * @param {React.JSX.Element} props.component - The main component to render
 * @param {string} props.navItem - The navigation item
 * @param {string} props.navLink - The navigation link
 * @param {string} props.id - The unique identifier
 */
const Layout = ({ component, navItem, navLink, id }) => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate("/")
  }, [token])

  const theme = createTheme({
    palette: { mode: "light", secondary: { main: "#FFFFFF" } },
  })

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: `url(
            "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          )`,
        }}
      >
        <div className="relative flex h-screen gap-2 p-2 bg-cover backdrop-blur">
          <Sidebar />
          <div className="flex !z-40 flex-col w-[84vw] gap-2 h-full">
            <Header navItem={navItem} />
            <BreadCrumbs navItem={navItem} navLink={navLink} id={id} />
            <div className="!z-20 rounded-md h-full overflow-y-auto pr-1">{component}</div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
