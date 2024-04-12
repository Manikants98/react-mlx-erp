import { Edit } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteDepartmentFn, departmentFn } from "Services/HRM/Department"
import useRowSelection from "Shared"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import AddDepartment from "./AddDepartment"

const Department = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [isDelete, setIsDelete] = useState(false)
  const [selectDept, setSelectDept] = useState({})

  const { data: departmentsData, isLoading } = useQuery(["departments", search, page], () =>
    departmentFn({ page, search })
  )
  const departments = departmentsData?.data?.data

  const client = useQueryClient()

  const { selectedIds, handleSelectRow, handleSelectAll, handleClearSelection } = useRowSelection([], departments)

  const { mutate: deleteDepartment } = useMutation(deleteDepartmentFn, {
    onSuccess: (response) => {
      toast.success(response.data.message)
      setIsDelete(false)
      handleClearSelection()
      client.refetchQueries("departments")
    },
  })
  return (
    <GlassDiv className="flex flex-col !p-0">
      <div className="flex items-center justify-between p-2">
        <CustomInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Department"
        />
        <div className="flex items-center gap-4">
          <DeleteButton
            onConfirm={() => deleteDepartment({ department_ids: selectedIds })}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            selectedIds={selectedIds}
          />
          <AddDepartment selectDept={selectDept} setSelectDept={setSelectDept} />
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell isHead>
                <Checkbox size="small" onChange={handleSelectAll} />
              </TableCell>
              <TableCell isHead>ID</TableCell>
              <TableCell isHead>Name</TableCell>
              <TableCell isHead>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <CustomLoader loading={isLoading} row={3} />
            {departments?.map((item) => (
              <TableRow className="hover:!bg-white hover:!bg-opacity-40 cursor-pointer">
                <TableCell className="!border-r  !text-center !border-white !border-opacity-50">
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>

                <TableCell>
                  <CustomIconButton onClick={() => setSelectDept(item)}>
                    <Edit color="success" />
                  </CustomIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NoDataFound data={departmentsData} />
      <CustomPagination data={departmentsData} setPage={setPage} />
    </GlassDiv>
  )
}

export default Department
