import { Add, Edit } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDataHRM } from "Services/HRM"
import { deleteEmployeeFn, employeeFn } from "Services/HRM/Employee"
import { useCountry } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import SearchAndSelect from "Shared/SearchAndSelect"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Employee = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("")
  const [state, setState] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()
  const client = useQueryClient()
  const [isDelete, setIsDelete] = useState(false)
  const { departments, roles } = useDataHRM({ department_id: department })
  const { states } = useCountry({ country_id: 1 })

  const { data, isLoading } = useQuery(["employees", page, search, state, department, role], () =>
    employeeFn({ page, search, state, department, role })
  )

  const employees = data?.data?.data

  const { selectedIds, handleSelectRow, handleSelectAll, handleClearSelection } = useRowSelection([], employees)

  const { mutate: deleteEmployee } = useMutation(deleteEmployeeFn, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      setIsDelete(false)
      handleClearSelection()
      client.refetchQueries("employees")
    },
  })

  return (
    <>
      <GlassDiv className="!p-0 flex flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <CustomInput
              placeholder="Search Employee..."
              type="search"
              className="!w-72"
              onChange={(event) => setSearch(event.target.value)}
            />
            <SearchAndSelect
              placeholder="Select State"
              className="!w-60"
              options={states}
              value={state}
              setValue={setState}
            />

            <SearchAndSelect
              placeholder="Select Department"
              className="!w-60"
              options={departments?.map((i) => ({ value: i.id, label: i.title }))}
              value={department}
              setValue={setDepartment}
            />
            <SearchAndSelect
              placeholder="Select Designation"
              className="!w-60"
              options={roles?.map((i) => ({ value: i.id, label: i.title }))}
              value={role}
              setValue={setRole}
            />
          </div>

          <div className="flex items-center gap-2">
            <DeleteButton
              onConfirm={() => deleteEmployee({ employee_ids: selectedIds })}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              selectedIds={selectedIds}
            />
            <CustomButton onClick={() => navigate("/employee/add")} className="!px-5" startIcon={<Add />}>
              Employee
            </CustomButton>
          </div>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Employee Name</TableCell>
                <TableCell isHead>Employee Code</TableCell>
                <TableCell isHead>Department Name</TableCell>
                <TableCell isHead>Designation</TableCell>
                <TableCell isHead>Email</TableCell>
                <TableCell isHead>Mobile</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={7} />
              {employees?.map((row) => (
                <TableRow key={row?.id} className="hover:!bg-white hover:!bg-opacity-40">
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row?.name}</TableCell>
                  <TableCell>{row?.employee_code ? row.employee_code : "--"}</TableCell>
                  <TableCell>{row?.department ? row.department : "--"}</TableCell>
                  <TableCell>{row?.role ? row?.role : "--"}</TableCell>
                  <TableCell>{row?.email ? row?.email : "--"}</TableCell>
                  <TableCell>{row?.mobile ? row?.mobile : "--"}</TableCell>
                  <TableCell>
                    <CustomIconButton onClick={() => navigate(`/employee/update`, { state: row?.id })}>
                      <Edit color="primary" />
                    </CustomIconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NoDataFound data={data} />
        <CustomPagination data={data} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default Employee
