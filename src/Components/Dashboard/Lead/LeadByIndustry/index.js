import { CircularProgress } from "@mui/material"
import Chart from "react-apexcharts"
import { useQuery } from "react-query"
import { LeadByIndustriesCountFn } from "Services/CrmDashboard"

const LeadByIndustry = () => {
  const { data, isLoading } = useQuery(["leadByIndiList"], () => LeadByIndustriesCountFn())
  const counterData = data ? data?.data : []

  const dataValues = counterData?.data_count?.map((entry) => {
    if (entry === null) {
      return 0
    }
    return entry
  })
  const labels = counterData?.industry?.map((entry, index) => {
    if (entry === null) {
      return "null"
    }
    return entry + " - " + counterData?.percentages[index] + "%"
  })

  const chartOptions = { labels }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <Chart type="pie" width={566} series={dataValues || []} options={chartOptions} />
        </div>
      )}
    </>
  )
}

export default LeadByIndustry
