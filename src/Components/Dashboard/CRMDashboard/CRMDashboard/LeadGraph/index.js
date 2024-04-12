import GlassDiv from "Shared/GlassDiv"
import { Line, Pie } from "react-chartjs-2"

const LeadGraph = () => {
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Agency",
        data: [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
      {
        label: "Direct",
        data: [5, 8, 12, 10, 15, 20, 18, 22, 28, 25, 30, 35],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  }

  const pieChartData = {
    labels: ["Agency", "Direct"],
    datasets: [
      { data: [60, 40], backgroundColor: ["#FF6384", "#36A2EB"], hoverBackgroundColor: ["#FF6384", "#36A2EB"] },
    ],
  }

  return (
    <div className="flex gap-2">
      <GlassDiv className="flex !p-2 w-[50%]">
        <Line
          data={lineChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
              title: {
                display: true,
                color: "black",
                font: {
                  weight: 600,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Leads",
                  font: { weight: 600 },
                  color: "black",
                },
                ticks: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Time (Months)",
                  font: { weight: 600 },
                  color: "black",
                },
                ticks: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
      <GlassDiv className="flex !p-2 w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
      <GlassDiv className="flex !p-2 w-[25%]">
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "black",
                  font: {
                    weight: 600,
                  },
                },
              },
            },
          }}
        />
      </GlassDiv>
    </div>
  )
}

export default LeadGraph
