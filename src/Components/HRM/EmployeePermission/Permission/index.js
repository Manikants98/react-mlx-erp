import { Checkbox, Divider, Skeleton } from "@mui/material"
import { getPermissionDetailFn, updatePermissionFn } from "Services/HRM/EmployeePermission"
import CustomButton from "Shared/CustomButton"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import GlassDiv from "Shared/GlassDiv"
import { randomArray } from "Shared/RandomArray"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const Permission = () => {
  const { employee_id } = useParams()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [permissionIds, setPermissionIds] = useState([])

  const { data, isLoading, refetch } = useQuery(
    ["permission", employee_id, search, page],
    () => getPermissionDetailFn({ employee_id, page, search, limit: 300 }),
    {
      onSuccess: ({ data }) => {
        setPermissionIds(data.data?.filter((i) => i.active_status).map((i) => i.id))
      },
    }
  )

  const permissions = data?.data?.data
  const employee = data?.data?.employeeinfo

  const { mutate: updatePermission, isLoading: isUpdating } = useMutation(
    () => updatePermissionFn({ employee_id, permission_ids: permissionIds }),
    {
      onSuccess: ({ data }) => {
        toast.success(data.message)
        refetch()
      },
    }
  )
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setPermissionIds(permissions?.map((i) => i.id))
    } else {
      setPermissionIds([])
    }
  }

  return (
    <>
      <GlassDiv className="!p-0">
        <div className="flex items-center justify-between p-2">
          <div className="flex flex-col w-full gap-2">
            {isLoading ? (
              <Skeleton className="w-80" />
            ) : (
              <p className="font-bold text-blue-500">
                {employee?.name} <span className="text-black">| {employee?.role}</span>
              </p>
            )}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CustomIconButton>
                  <Checkbox size="small" className="!p-1.5" onChange={handleSelectAll} />
                </CustomIconButton>

                <CustomInput
                  type="search"
                  placeholder="Search..."
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <CustomButton onClick={updatePermission}>Update</CustomButton>
            </div>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-4 max-h-[72vh] p-2 overflow-y-auto">
          {isLoading || isUpdating
            ? randomArray(1, 32).map(() => <Skeleton className="w-60" />)
            : permissions?.map((permission) => {
                const isChecked = permissionIds.includes(permission.id)
                const handleCheckboxChange = () => {
                  if (isChecked) {
                    setPermissionIds(permissionIds.filter((id) => id !== permission.id))
                  } else {
                    setPermissionIds([...permissionIds, permission.id])
                  }
                }
                return (
                  <div key={permission.id} className="flex items-center">
                    <Checkbox size="small" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="text-sm">{permission.name.split("_").join(" ").toLocaleUpperCase()}</span>
                  </div>
                )
              })}
        </div>
      </GlassDiv>
    </>
  )
}

export default Permission
