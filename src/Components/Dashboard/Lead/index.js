import { Collapse, Divider, FormControlLabel, Skeleton, Switch } from "@mui/material"
import { getJunkLeadSourceFn, getLeadCountFn, getTop10LeadOwnerFn, getTop10LeadSourceFn } from "Services/CrmDashboard"
import GlassDiv from "Shared/GlassDiv"
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from "chart.js"
import { useState } from "react"
import { useQuery } from "react-query"
import LeadByIndustry from "./LeadByIndustry"
import LeadBySource from "./LeadBySource"
import LeadByStage from "./LeadByStage"
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale)

const Lead = () => {
  const [checked1, setChecked1] = useState(true)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(true)

  const handleChange1 = () => setChecked1((prev) => !prev)

  const handleChange2 = () => setChecked2((prev) => !prev)

  const handleChange3 = () => setChecked3((prev) => !prev)

  const { data, isLoading } = useQuery(["leadCounter"], () => getLeadCountFn())

  const leads = data ? data.data.data : {}

  const { data: top10Lead, isLoading: isLoadingTo10Source } = useQuery(["topLeadSource"], () => getTop10LeadSourceFn())

  const leadsSource = top10Lead ? top10Lead.data.data : []

  const { data: top10LeadOwner, isLoading: isLoadingOwner } = useQuery(["topLeadOwner"], () => getTop10LeadOwnerFn())

  const leadsOwner = top10LeadOwner ? top10LeadOwner.data.data : []

  const { data: topLeadJunk, isLoading: isLoadingJunk } = useQuery(["topLeadJunks"], () => getJunkLeadSourceFn())

  const leadsJunk = topLeadJunk ? topLeadJunk.data.data : []

  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked1} onChange={handleChange1} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked1}>
        <div className="flex w-full gap-2">
          <GlassDiv className="w-1/3 !p-0">
            <div className="flex items-center justify-between p-3">
              <p className="font-semibold">ALL LEADS (COUNT)</p>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-2">
              {isLoading ? (
                [1, 2, 3]?.map(() => {
                  return (
                    <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                      <Skeleton className="w-full" />
                    </GlassDiv>
                  )
                })
              ) : (
                <>
                  <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                    <p>TOTAL LEADS</p>
                    <p>{leads?.total_leads || 0}</p>
                  </GlassDiv>
                  <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                    <p>LAST WEEK LEADS</p>
                    <p>{leads?.thisweek || 0}</p>
                  </GlassDiv>
                  <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                    <p>TODAY LEADS</p>
                    <p>{leads?.todayleads || 0}</p>
                  </GlassDiv>
                </>
              )}
            </div>
          </GlassDiv>

          <GlassDiv className="w-1/3 !p-0">
            <div className="flex justify-between p-3">
              <p className="font-semibold">TOP 10 LEAD SOURCES</p>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-2">
              {isLoadingTo10Source
                ? [1, 2, 3, 4, 5, 6, 7]?.map(() => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <Skeleton className="w-full" />
                      </GlassDiv>
                    )
                  })
                : leadsSource?.map((i) => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <p>{i.lead_source}</p>
                        <p>{i.total_leads}</p>
                      </GlassDiv>
                    )
                  })}
            </div>
          </GlassDiv>

          <GlassDiv className="w-1/3 !p-0 border rounded-xl">
            <div className="flex justify-between p-3">
              <p className="font-semibold">LEAD BY STAGE</p>
            </div>
            <Divider />

            <div className="flex items-center justify-center">
              <LeadByStage />
            </div>
          </GlassDiv>
        </div>
      </Collapse>

      <FormControlLabel
        control={<Switch checked={checked2} onChange={handleChange2} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked2}>
        <div className="flex w-full gap-2">
          <GlassDiv className="w-1/2 !p-0">
            <div className="flex justify-between p-3">
              <p className="font-semibold">TOP LEAD OWNERS</p>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-2">
              {isLoadingOwner
                ? [1, 2, 3, 4, 5, 6]?.map(() => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <Skeleton className="w-full" />
                      </GlassDiv>
                    )
                  })
                : leadsOwner?.map((i) => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <span className="flex w-1/3 gap-4">
                          <p>
                            {i.leads_owner__first_name} {i.leads_owner__last_name}
                          </p>
                        </span>
                        <p>{i.num_leads}</p>
                      </GlassDiv>
                    )
                  })}
            </div>
          </GlassDiv>
          <GlassDiv className="w-1/2 !p-0">
            <div className="flex justify-between p-3">
              <p className="font-semibold">JUNK LEADS BY SOURCE</p>
            </div>
            <Divider />
            <div className="flex flex-col gap-2 p-2">
              {isLoadingJunk
                ? [1, 2, 3, 4, 5, 6, 7, 8]?.map(() => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <Skeleton className="w-full h-10" />
                      </GlassDiv>
                    )
                  })
                : leadsJunk?.map((i) => {
                    return (
                      <GlassDiv className="flex !bg-opacity-10 items-center justify-between w-full px-5 py-2 !rounded">
                        <p>{i.lead_source}</p>
                        <p>{i.total_leads}</p>
                      </GlassDiv>
                    )
                  })}
            </div>
          </GlassDiv>
        </div>
      </Collapse>

      <FormControlLabel
        control={<Switch checked={checked3} onChange={handleChange3} />}
        label="Show"
        className="!float-right"
      />
      <Collapse in={checked3}>
        <div className="flex gap-2">
          <GlassDiv className="w-1/2 !p-0 border rounded-xl">
            <div className="flex justify-between p-3 ">
              <p className="font-semibold">LEAD BY SOURCE</p>
            </div>
            <Divider />
            <div className="flex justify-center h-full p-3">
              <LeadBySource />
            </div>
          </GlassDiv>

          <GlassDiv className="w-1/2 !p-0 border rounded-xl">
            <div className="flex justify-between p-3">
              <p className="font-semibold">LEAD BY INDUSTRY</p>
            </div>
            <Divider />
            <div className="flex justify-center h-full p-3">
              <LeadByIndustry />
            </div>
          </GlassDiv>
        </div>
      </Collapse>
    </>
  )
}
export default Lead
