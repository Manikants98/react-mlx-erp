import { Add } from "@mui/icons-material"
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { getEmployeePermissionFn } from "Services/HRM/EmployeePermission"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

const EmployeePermission = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const { data: permissions, isLoading } = useQuery(["permissions", page, search], () =>
    getEmployeePermissionFn({ page, search })
  )

  return (
    <GlassDiv className="!p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Employee..."
        />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>Employee ID</TableCell>
              <TableCell isHead>Department</TableCell>
              <TableCell isHead>Role Name</TableCell>
              <TableCell isHead>Employee Name</TableCell>
              <TableCell isHead>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomLoader loading={isLoading} row={4} />
            {permissions?.data?.data?.map((item) => {
              return (
                <TableRow className="hover:!bg-white hover:!bg-opacity-30">
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    {item.name} | {item.email}
                  </TableCell>
                  <TableCell>
                    <CustomIconButton size="small" onClick={() => navigate(`/permission/${item.id}`)}>
                      <Add className="text-green-800" />
                    </CustomIconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={permissions} />
      <CustomPagination data={permissions} setPage={setPage} />
    </GlassDiv>
  )
}

export default EmployeePermission
