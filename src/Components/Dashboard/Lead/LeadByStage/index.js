import React from "react"
import Chart from "react-apexcharts"
import { CircularProgress } from "@mui/material"
import { useQuery } from "react-query"
import { LeadByStageCountFn } from "../../../../Services/CrmDashboard"

const LeadByStage = () => {
  const { data, isLoading } = useQuery(["leadByStageList"], () => LeadByStageCountFn(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const counterList = data ? data?.data : []

  const dataValues =
    counterList &&
    counterList?.stage_data?.map((entry) => {
      if (entry === null) {
        return 0
      }
      return entry
    })
  const labels =
    counterList &&
    counterList?.stage?.map((entry) => {
      if (entry === null) {
        return "Unknown"
      }
      return entry
    })

  const chartOptions = {
    labels: labels,
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <Chart type="pie" width={460} series={dataValues || []} options={chartOptions || []} />
        </div>
      )}
    </>
  )
}

export default LeadByStage
