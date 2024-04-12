import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Tab } from "@mui/material"
import { useState } from "react"
import AttendaceMonthWise from "./AttendaceMonthWise"
import AttendanceDateWise from "./AttendanceDateWise"

const Attendance = () => {
  const [value, setValue] = useState("1")
  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue)
  }

  return (
    <TabContext value={value} className={"!mt-2"}>
      <TabList
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        className="bg-white bg-opacity-20 !m-0"
      >
        <Tab label="Date Wise" value="1" className="!capitalize !text-base" />
        <Tab label="Month Wise" value="2" className="!capitalize !text-base" />
        {/* <Tab label="Leave Application" value="3" className="!capitalize !text-base" /> */}
      </TabList>

      <TabPanel value="1" className="!p-0 !pt-2">
        <AttendanceDateWise />
      </TabPanel>
      <TabPanel value="2" className="!p-0 !pt-2">
        <AttendaceMonthWise />
      </TabPanel>
      {/* <TabPanel value="3" className="!p-0 !pt-2">
        <LeaveApplications />
      </TabPanel> */}
    </TabContext>
  )
}
export default Attendance
