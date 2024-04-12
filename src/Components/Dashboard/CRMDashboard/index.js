import { Divider, Tab, Tabs } from "@mui/material"
import CRMDashboard from "Pages/Dashboard"
import GlassDiv from "Shared/GlassDiv"
import { BarElement, Chart, LinearScale } from "chart.js"
import React from "react"
import Deal from "../Deal"
import Lead from "../Lead"
Chart.register(BarElement, LinearScale)
export default function CrmDashboard() {
  const [value, setValue] = React.useState(2)

  const handleChange = (_, newValue) => setValue(newValue)

  return (
    <div className="flex flex-col">
      <GlassDiv className="!p-0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Lead Report" value={1} />
          <Tab label="Dashboard" value={2} />
          <Tab label="Deal Report" value={3} />
        </Tabs>
      </GlassDiv>
      <Divider />
      <div>
        {value === 1 && <Lead />}
        {value === 2 && <CRMDashboard />}
        {value === 3 && <Deal />}
      </div>
    </div>
  )
}
