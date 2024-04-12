import { CloseTwoTone } from "@mui/icons-material"
import { Chip } from "@mui/material"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GlassDiv from "../GlassDiv"

const BreadCrumbs = ({ navItem, navLink, id }) => {
  const [breadCrumbs, setBreadCrumbs] = useState([])
  const navigate = useNavigate()

  const handleClose = (event, id, index) => {
    event.stopPropagation()
    setBreadCrumbs(breadCrumbs.filter((item) => item.id !== id))
    navigate(breadCrumbs[index - 1].navLink)
  }

  useEffect(() => {
    if (breadCrumbs.length === 0 || breadCrumbs.filter((item) => item.id === id).length === 0) {
      setBreadCrumbs([...breadCrumbs, { id, navItem, navLink }])
    }
  }, [id])

  useEffect(() => {
    document.title = navItem
  }, [navItem])

  return (
    <GlassDiv className="flex !p-0 items-center gap-1 overflow-x-auto breadcrambs bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-0.5 w-[84vw] transition-all duration-300 overflow-x-auto breadcrambs rounded-lg px-0.5 py-1">
        {breadCrumbs.map((item, index) => {
          return (
            <Chip
              label={item.navItem}
              className={classNames(
                "!bg-white !rounded-md flex items-center px-2 py-1 !font-bold",
                item.id === id ? "!bg-opacity-100" : "!bg-opacity-50"
              )}
              onClick={() => navigate(item.navLink)}
              onDelete={(e) => index !== 0 && handleClose(e, item.id, index)}
              deleteIcon={<CloseTwoTone />}
            />
          )
        })}
      </div>
    </GlassDiv>
  )
}

export default BreadCrumbs
