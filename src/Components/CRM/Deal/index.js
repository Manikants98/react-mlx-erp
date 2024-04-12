import { Add } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { dealListFn, deleteDealFn } from "Services/CRM/Deal"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import CustomButton from "Shared/CustomButton"
import DeleteButton from "Shared/CustomConfimation"
import CustomInput from "Shared/CustomInput"
import { CustomLoader } from "Shared/CustomLoader"
import CustomPagination from "Shared/CustomPagination"
import CustomPermission from "Shared/CustomPermsission"
import GlassDiv from "Shared/GlassDiv"
import NoDataFound from "Shared/NoDataFound"
import { TableCell } from "Shared/Table"
import moment from "moment"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AssignMember from "../Campaign/AssignMember"

const Deal = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const isAddPermit = usePermission("CRM", "add_leads_deal")
  const isDeletePermit = usePermission("CRM", "delete_leads_deal")
  const isViewPermit = usePermission("CRM", "view_leads_deal")

  const {
    data: dealsList,
    isLoading,
    refetch,
  } = useQuery(["deals", search, page, isViewPermit], () => dealListFn({ search, page }))

  const deals = dealsList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], deals)

  const { mutate: deleteDeal } = useMutation(deleteDealFn, {
    onSuccess: ({ data }) => {
      toast.success(data.message)
      setIsDelete(false)
      handleClearSelection()
      refetch()
    },
  })

  return (
    <>
      <GlassDiv className="flex flex-col !p-0">
        <div className="flex justify-between p-2">
          <CustomInput
            placeholder="Search Deals..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              onConfirm={() => deleteDeal({ deal_ids: selectedIds })}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
            />
            <CustomButton
              startIcon={<Add />}
              onClick={() =>
                isAddPermit ? navigate("/crm/deal/add") : toast.warn("You don't have permission for add deal.")
              }
            >
              Deal
            </CustomButton>
          </span>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Deal No</TableCell>
                <TableCell isHead>Deal Amount(INR)</TableCell>
                <TableCell isHead>Advance Amount(%)</TableCell>
                <TableCell isHead>After Campaign Amount(%)</TableCell>
                <TableCell isHead>Campaign Title</TableCell>
                <TableCell isHead>Campaign Type</TableCell>
                <TableCell isHead>Campaign Creator</TableCell>
                <TableCell isHead>Start Date</TableCell>
                <TableCell isHead>End Date</TableCell>
                <TableCell isHead>Campaign Status</TableCell>
                <TableCell isHead>Description</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={11} />
              {deals?.map((deal) => {
                const campaign = deal?.campaign
                return (
                  <TableRow key={deal.id} className="hover:bg-white hover:bg-opacity-20">
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={selectedIds.includes(deal.id)}
                        onChange={() => handleSelectRow(deal.id)}
                      />
                    </TableCell>
                    <TableCell>{deal.deal_no}</TableCell>
                    <TableCell>{deal.deal_amount} INR</TableCell>
                    <TableCell>{deal.advance_amount}%</TableCell>
                    <TableCell>{deal.after_campaign_amount}%</TableCell>
                    <TableCell>{campaign.campaign_title}</TableCell>
                    <TableCell>{campaign.campaign_type}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between gap-2 px-2">
                        {campaign.campaign_member_name || "-"}
                        <AssignMember
                          refetch={refetch}
                          campaign_id={campaign?.id}
                          campaign_member_id={campaign.campaign_member}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{moment(campaign.start_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{moment(campaign.end_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{campaign.campaign_status}</TableCell>
                    <TableCell>{deal.description}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomPermission isPermit={isViewPermit} label="deals" />
        <NoDataFound data={dealsList} />
        <CustomPagination data={dealsList} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default Deal
