/* eslint-disable */
import {
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material"
import { employeeDataFn } from "Services/CRM/Task"
import { monthWiseAttendanceFn } from "Services/HRM/Attendance"
import { CustomLoader } from "Shared/CustomLoader"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import SearchAndSelect from "Shared/SearchAndSelect"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useQuery } from "react-query"

const AttendaceMonthWise = () => {
  const [employeeId, setEmployeeId] = useState("")
  const [attendanceData, setAttendanceData] = useState({})
  const [ids, setIds] = useState("")
  const [month, setMonth] = useState(moment(new Date()).format("YYYY-MM"))

  const { data } = useQuery(["employee"], () => employeeDataFn())

  const employees = data?.data?.data?.map((i) => ({ value: i.id, label: i.name }))

  const employee = employees?.[0]

  const { data: attendaceMonthData, isLoading } = useQuery(
    ["monthWiseAttendance", month, employee],
    () => monthWiseAttendanceFn({ date: month, employee_id: employeeId || employee?.value }),
    { enabled: Boolean(employee) }
  )

  return (
    <>
      <GlassDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <SearchAndSelect
            className="!w-72"
            options={employees}
            setValue={setEmployeeId}
            value={employeeId || employee?.value}
          />

          <input
            type="month"
            className="p-2 bg-white border border-black rounded outline-none border-opacity-30 bg-opacity-30 w-52 month-wise-month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            max={moment(new Date()).format("YYYY-MM")}
          />
        </div>

        <TableContainer component="div" className="!p-0">
          <Table className="!overflow-x-auto">
            <TableHead>
              <TableRow className="bg-white bg-opacity-30">
                <TableCell isHead>Date</TableCell>
                <TableCell isHead>Entry Time</TableCell>
                <TableCell isHead>Exit Time</TableCell>
                <TableCell isHead>Attendance Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={3} />
              {attendaceMonthData?.data?.data?.map((row, index) => (
                <TableRow key={row.id} className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                  <TableCell>{row?.date ? row?.date?.slice(0, 10) : "--"}</TableCell>
                  <TableCell>
                    {ids === index ? (
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={row?.check_in?.slice(11, 16) || attendanceData[row.id]?.checkIn}
                        onChange={(event) => {
                          setAttendanceData({
                            ...attendanceData,
                            [row.id]: {
                              ...attendanceData[row.id],
                              checkIn: event.target.value,
                            },
                          })
                        }}
                      />
                    ) : row?.check_in?.slice(11, 16) ? (
                      row?.check_in?.slice(11, 16)
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell>
                    {ids === index ? (
                      <TextField
                        type="time"
                        size="small"
                        defaultValue={row?.check_out?.slice(11, 16) || attendanceData[row.id]?.checkOut}
                        onChange={(event) => {
                          setAttendanceData({
                            ...attendanceData,
                            [row.id]: {
                              ...attendanceData[row.id],
                              checkOut: event.target.value,
                            },
                          })
                        }}
                      />
                    ) : row?.check_out?.slice(11, 16) ? (
                      row?.check_out?.slice(11, 16)
                    ) : (
                      "--"
                    )}
                  </TableCell>
                  <TableCell>
                    {ids === index ? (
                      <FormControl fullWidth>
                        <Select
                          defaultValue={row?.attendance}
                          size="small"
                          onChange={(event) => {
                            setAttendanceData({
                              ...attendanceData,
                              [index]: {
                                ...attendanceData[index],
                                status: event.target.value,
                              },
                            })
                          }}
                        >
                          <MenuItem value={"Present"}>Present</MenuItem>
                          <MenuItem value={"Absent"}>Absent</MenuItem>
                          <MenuItem value={"Half day"}>Half Day</MenuItem>
                          <MenuItem value={"Leave"}>Leave</MenuItem>
                        </Select>
                      </FormControl>
                    ) : row?.attendance ? (
                      row?.attendance
                    ) : (
                      "--"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NoDataFound data={attendaceMonthData} />
      </GlassDiv>
    </>
  )
}

export default AttendaceMonthWise
