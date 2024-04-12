import GlassDiv from "Shared/GlassDiv"
import { Line } from "react-chartjs-2"

const LeadConversionRate = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [20, 25, 30, 28, 35, 40, 45, 42, 38, 33, 28, 25],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <GlassDiv className="!p-2 flex w-[40%]">
      <Line
        data={lineChartData}
        options={{
          plugins: {
            legend: { position: "top", labels: { color: "black", font: { weight: 600 } } },
            title: { display: true, color: "black", font: { weight: 600 } },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Conversion Rate (%)", font: { weight: 600 }, color: "black" },
              ticks: { color: "black", font: { weight: 600 } },
            },
            x: {
              title: { display: true, text: "Time (Months)", font: { weight: 600 }, color: "black" },
              ticks: { color: "black", font: { weight: 600 } },
            },
          },
        }}
      />
    </GlassDiv>
  )
}

export default LeadConversionRate
