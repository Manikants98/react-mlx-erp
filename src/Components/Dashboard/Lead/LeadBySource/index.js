import { CircularProgress } from "@mui/material"
import axiosInstance from "Config/axio.config"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

const LeadBySource = () => {
  const [stageData, setStageData] = useState([])
  const [stage, setStage] = useState([])
  const [stagePer, setStagePer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchStageData = async () => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.get("notification-api/")
      setStageData(res?.data?.source_data)
      setStage(res?.data?.source)
      setStagePer(res?.data?.source_per)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchStageData()
  }, [])
  const dataValues = stageData?.map((entry) => {
    if (entry === null) {
      return 0
    }
    return entry
  })
  const labels = stage?.map((entry, index) => {
    if (entry === null) {
      return "null"
    }
    return `${entry} - ${stagePer[index]}%`
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
          <Chart type="donut" width={560} series={dataValues || []} options={chartOptions} />
        </div>
      )}
    </>
  )
}

export default LeadBySource
