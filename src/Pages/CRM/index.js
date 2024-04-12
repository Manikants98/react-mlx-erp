import { Button } from "@mui/material"
import Deal from "Components/Dashboard/Deal"
import Lead from "Components/Dashboard/Lead"
import CustomButton from "Shared/CustomButton"
import classNames from "classnames"
import { useState } from "react"

export default function CRM() {
  const [active, setActive] = useState(0)
  const handleClick = (index) => {
    setActive(index)
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between w-fill">
        <CustomButton
          onClick={() => handleClick(0)}
          className={classNames(
            "!py-5 !text-xl !rounded-lg !px-32",
            active === 0 && "bg-gradient-to-r !text-white from-cyan-500 to-blue-500"
          )}
        >
          Lead Report
        </CustomButton>
        <CustomButton
          onClick={() => handleClick(1)}
          className={classNames(
            "!py-5 !text-xl !rounded-lg !px-32",
            active === 1 && "bg-gradient-to-r !text-white from-cyan-500 to-blue-500"
          )}
        >
          Deal Report
        </CustomButton>
      </div>
      <div>
        {active === 0 && <Lead />}
        {active === 1 && <Deal />}
      </div>
      <Button className="!w-full !my-3 !text-center !bg-purple-800 !text-white">
        <a href="https://crmapp.bhaaraterp.com/">Go In Crm Panel</a>
      </Button>
    </div>
  )
}
