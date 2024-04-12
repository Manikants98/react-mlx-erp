import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { dateWiseAttendanceFn, dateWiseMarkAttendanceFn } from "Services/HRM/Attendance"
import CustomButton from "Shared/CustomButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const AttendanceWithDateWise = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))

  const client = useQueryClient()

  const { data: dateWiseAttendanceList, isLoading } = useQuery(["dateWiseAttendance", page, date, search], () =>
    dateWiseAttendanceFn({ page, date, search })
  )

  const { mutate: markAttendance } = useMutation(dateWiseMarkAttendanceFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      client.refetchQueries("dateWiseAttendance")
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  return (
    <>
      <GlassDiv className="flex flex-col !p-0">
        <div className="flex items-center justify-between p-2">
          <div className="flex gap-3">
            <CustomInput
              placeholder="Search..."
              className="!rounded-none mx-2"
              type="search"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <input
            type="date"
            className="p-2 bg-white border border-gray-500 rounded outline-none bg-opacity-30 w-52 date-wise-date"
            value={date}
            disabled
            onChange={(e) => setDate(e.target.value)}
            max={moment(new Date()).format("YYYY-MM-DD")}
          />
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>Name</TableCell>
                <TableCell isHead>Department</TableCell>
                <TableCell isHead>Role</TableCell>
                <TableCell isHead>Entry Time</TableCell>
                <TableCell isHead>Exit Time</TableCell>
                <TableCell isHead>Attendace Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={5} />
              {dateWiseAttendanceList?.data?.data?.map((row) => (
                <TableRow key={row.id} className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                  <TableCell>{row?.name ? row?.name : "--"}</TableCell>
                  <TableCell>{row?.department ? row?.department : "--"}</TableCell>
                  <TableCell>{row?.role ? row?.role : "--"}</TableCell>
                  <TableCell>
                    {row?.attendance?.check_in ? (
                      moment(row?.attendance?.check_in).format("hh : mm A")
                    ) : (
                      <CustomButton size="small" onClick={() => markAttendance({ employee_id: row.id })}>
                        Check In
                      </CustomButton>
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.attendance?.check_out ? (
                      moment(row?.attendance?.check_out).format("hh : mm A")
                    ) : (
                      <CustomButton
                        disabled={!row?.attendance?.check_in}
                        size="small"
                        onClick={() => markAttendance({ employee_id: row.id })}
                      >
                        Check Out
                      </CustomButton>
                    )}
                  </TableCell>

                  <TableCell>
                    {row?.attendance?.status || "-"}
                    {/* {ids === row?.emp_id ? (
                          <FormControl fullWidth>
                            <Select
                              defaultValue={row?.attendance?.status}
                              size="small"
                              onChange={(event) => {
                                setAttendanceData({
                                  ...attendanceData,
                                  [row.id]: {
                                    ...attendanceData[row.id],
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
                        ) : row?.attendance?.attendance_status ? (
                          row?.attendance?.attendance_status
                        ) : (
                          "--"
                        )} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NoDataFound data={dateWiseAttendanceList} />
        <CustomPagination data={dateWiseAttendanceList} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default AttendanceWithDateWise
