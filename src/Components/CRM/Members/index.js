import { Add, DoDisturb, Edit } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { deleteMembersFn, membersFn } from "Services/CRM/Members"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Members = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const isAddPermit = usePermission("CRM", "add_leads_member")
  const isUpdatePermit = usePermission("CRM", "update_leads_member")
  const isDeletePermit = usePermission("CRM", "delete_leads_member")
  const isViewPermit = usePermission("CRM", "view_leads_member")

  const {
    data: membersList,
    isLoading,
    refetch,
  } = useQuery(["membersList", search, page, isViewPermit], () => membersFn({ search, page }))

  const members = membersList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], members)

  const { mutate: deleteMembers } = useMutation(deleteMembersFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  return (
    <>
      <GlassDiv className="flex flex-col !p-0">
        <div className="flex justify-between p-2">
          <CustomInput
            placeholder="Search Creators..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteMembers({ campaign_member_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/crm/creators/add") : toast.warn("You don't have permission for add member.")
              }
            >
              Creators
            </CustomButton>
          </span>
        </div>

        {isViewPermit ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell isHead>
                    <Checkbox size="small" onChange={handleSelectAll} />
                  </TableCell>
                  <TableCell isHead>Name</TableCell>
                  <TableCell isHead>Mobile</TableCell>
                  <TableCell isHead>Email</TableCell>
                  <TableCell isHead>Pincode</TableCell>
                  <TableCell isHead>Area</TableCell>
                  <TableCell isHead>City</TableCell>
                  <TableCell isHead>State</TableCell>
                  <TableCell isHead>Country</TableCell>
                  <TableCell isHead>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <CustomLoader loading={isLoading} row={9} />
                {members?.map((member) => {
                  return (
                    <TableRow key={member.id} className="hover:bg-white hover:bg-opacity-20">
                      <TableCell>
                        <Checkbox
                          size="small"
                          checked={selectedIds.includes(member.id)}
                          onChange={() => handleSelectRow(member.id)}
                        />
                      </TableCell>
                      <TableCell>{member.name || "-"}</TableCell>
                      <TableCell>{member.mobile || "-"}</TableCell>
                      <TableCell>{member.email || "-"}</TableCell>
                      <TableCell>{member.pincode || "-"}</TableCell>
                      <TableCell>{member.area || "-"}</TableCell>
                      <TableCell>{member.city_name || "-"}</TableCell>
                      <TableCell>{member.state_name || "-"}</TableCell>
                      <TableCell>{member.country_name || "-"}</TableCell>
                      <TableCell>
                        <CustomIconButton
                          onClick={() =>
                            isUpdatePermit
                              ? navigate("/crm/creators/update", { state: member.id })
                              : toast.warn("You don't have permission for update member.")
                          }
                        >
                          <Edit color="success" />
                        </CustomIconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <span className="flex flex-col items-center justify-center h-full p-5 text-lg font-semibold">
            <DoDisturb color="error" className="!text-5xl" />
            You don't have permission for view members.
          </span>
        )}

        <NoDataFound data={membersList} />
        <CustomPagination data={membersList} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default Members
