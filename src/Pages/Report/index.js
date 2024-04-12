import { Link } from "react-router-dom"
import GlassDiv from "Shared/GlassDiv"

const reportSections = [
  {
    title: "Company Wide View",
    links: [
      { to: "/report/company-wide-view/revenue", text: "Revenue" },
      { to: "/report/company-wide-view/bills-receivables", text: "Bills Receivables" },
      { to: "/report/company-wide-view/bills-payable", text: "Bills Payable" },
      { to: "/report/company-wide-view/profit", text: "Profit" },
      { to: "/report/company-wide-view/execution-sheet", text: "Execution Sheet" },
    ],
  },
  {
    title: "Team Wise",
    links: [
      { to: "/report/team-wise/leads", text: "Leads" },
      { to: "/report/team-wise/closures", text: "Closures" },
      { to: "/report/team-wise/lost-leads", text: "Lost Leads" },
      { to: "/report/team-wise/pending-tasks", text: "Pending Tasks" },
      { to: "/report/team-wise/revenue", text: "Revenue" },
      { to: "/report/team-wise/bills-receivables", text: "Bills Receivables" },
      { to: "/report/team-wise/bills-payable", text: "Bills Payable" },
      { to: "/report/team-wise/profit", text: "Profit" },
    ],
  },
  {
    title: "Individual Wise",
    links: [
      { to: "/report/team-wise/leads", text: "Leads" },
      { to: "/report/team-wise/closures", text: "Closures" },
      { to: "/report/team-wise/lost-leads", text: "Lost Leads" },
      { to: "/report/team-wise/pending-tasks", text: "Pending Tasks" },
      { to: "/report/team-wise/revenue", text: "Revenue" },
      { to: "/report/team-wise/bills-receivables", text: "Bills Receivables" },
      { to: "/report/team-wise/bills-payable", text: "Bills Payable" },
      { to: "/report/team-wise/profit", text: "Profit" },
    ],
  },
]

const Report = () => {
  return (
    <GlassDiv className="flex flex-col !p-0">
      <p className="p-2 text-xl font-semibold text-center">Reports</p>
      <div className="grid grid-cols-3">
        {reportSections.map((section, index) => (
          <div key={index} className="flex flex-col border-r border-white border-opacity-40">
            <GlassDiv className="text-xl !rounded-none !p-2 font-bold">{section.title}</GlassDiv>
            <div className="flex flex-col gap-3 p-4 overflow-y-auto">
              {section.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  to={link.to}
                  className="hover:!text-blue-800 hover:!underline w-fit !underline-offset-2"
                >
                  ➤ {link.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassDiv>
  )
}

export default Report
