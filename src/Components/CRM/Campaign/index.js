import { Visibility } from "@mui/icons-material"
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { campaignsFn } from "Services/CRM/Campaign"
import { deleteDealFn } from "Services/CRM/Deal"
import { usePermission } from "Settings"
import useRowSelection from "Shared"
import DeleteButton from "Shared/CustomConfimation"
import CustomIconButton from "Shared/CustomIconButton"
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
import { toast } from "react-toastify"
import AssignMember from "./AssignMember"
import ManageStatus from "./ManageStatus"
import VideoTracker from "./VideoTracker"

const Campaign = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [campaignId, setCampaignId] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const isDeletePermit = usePermission("CRM", "delete_leads_campaign")
  const isViewPermit = usePermission("CRM", "view_leads_campaign")

  const {
    data: campaignsList,
    isLoading,
    refetch,
  } = useQuery(["campaigns", search, page, isViewPermit], () => campaignsFn({ search, page }))

  const campaigns = campaignsList?.data?.data

  const { handleClearSelection, handleSelectAll, handleSelectRow, selectedIds } = useRowSelection([], campaigns)

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
            placeholder="Search Campaigns..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span className="flex items-center gap-3">
            <DeleteButton
              isDelete={isDelete}
              selectedIds={selectedIds}
              setIsDelete={setIsDelete}
              isPermit={isDeletePermit}
              onConfirm={() => deleteDeal({ deal_ids: selectedIds })}
            />
          </span>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHead>
                  <Checkbox size="small" onChange={handleSelectAll} />
                </TableCell>
                <TableCell isHead>Campaign No</TableCell>
                <TableCell isHead>Campaign Title</TableCell>
                <TableCell isHead>Campaign Type</TableCell>
                <TableCell isHead>Campaign Creator</TableCell>
                <TableCell isHead>Deal No</TableCell>
                <TableCell isHead>Budget</TableCell>
                <TableCell isHead>Start Date</TableCell>
                <TableCell isHead>End Date</TableCell>
                <TableCell isHead>Status</TableCell>
                <TableCell isHead>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <CustomLoader loading={isLoading} row={10} />
              {campaigns?.map((campaign) => {
                return (
                  <TableRow key={campaign.id} className="hover:bg-white hover:bg-opacity-20">
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={selectedIds.includes(campaign.id)}
                        onChange={() => handleSelectRow(campaign.id)}
                      />
                    </TableCell>
                    <TableCell>{campaign.campaign_no}</TableCell>
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
                    <TableCell>{campaign.deal_no}</TableCell>
                    <TableCell>{campaign.campaign_budget}</TableCell>
                    <TableCell>{moment(campaign.start_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>{moment(campaign.end_date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>
                      <ManageStatus
                        campaign_id={campaign?.id}
                        refetch={refetch}
                        campaign_status={campaign?.campaign_status}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <CustomIconButton onClick={() => setCampaignId(campaign.id)}>
                          <Visibility />
                        </CustomIconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <CustomPermission isPermit={isViewPermit} label="campaigns" />
        <VideoTracker campaignId={campaignId} setCampaignId={setCampaignId} />
        <NoDataFound data={campaignsList} />
        <CustomPagination data={campaignsList} setPage={setPage} />
      </GlassDiv>
    </>
  )
}

export default Campaign
