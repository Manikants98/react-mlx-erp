import Profile from "Components/AdminLogin/Profile"
import Update from "Components/AdminLogin/Profile/UpdateProfile"
import ResetPassword from "Components/AdminLogin/ResetPassword"
import Campaign from "Components/CRM/Campaign"
import ManageCampaign from "Components/CRM/Campaign/ManageCampaign"
import Deal from "Components/CRM/Deal"
import ManageDeal from "Components/CRM/Deal/ManageDeal"
import Notes from "Components/CRM/FollowUp"
import Leads from "Components/CRM/Lead"
import ManageLead from "Components/CRM/Lead/ManageLead"
import Meetings from "Components/CRM/Meeting"
import ManageMeeting from "Components/CRM/Meeting/ManageMeeting"
import Members from "Components/CRM/Members"
import ManageMembers from "Components/CRM/Members/ManageMembers"
import Task from "Components/CRM/Task"
import ManageTask from "Components/CRM/Task/ManageTask"
import CrmDashboard from "Components/Dashboard/CRMDashboard"
import Attendance from "Components/HRM/Attendance"
import Department from "Components/HRM/Department"
import Employee from "Components/HRM/Employee"
import ManageEmployee from "Components/HRM/Employee/ManageEmployee"
import EmployeePermission from "Components/HRM/EmployeePermission"
import Permission from "Components/HRM/EmployeePermission/Permission"
import Role from "Components/HRM/Role"
import Invoice from "Components/Invoice"
import ManageInvoice from "Components/Invoice/ManageInvoice"
import BillsPayable from "Components/Report/CompanyWideView/BillsPayable"
import BillsReceivables from "Components/Report/CompanyWideView/BillsReceivables"
import ExecutionSheet from "Components/Report/CompanyWideView/ExecutionSheet"
import Profit from "Components/Report/CompanyWideView/Profit"
import Revenue from "Components/Report/CompanyWideView/Revenue"
import ClosuresReport from "Components/Report/TeamWise/Closures"
import LeadsReport from "Components/Report/TeamWise/Leads"
import LostLeadsReport from "Components/Report/TeamWise/LostLeads"
import Report from "Pages/Report"

export const routes = [
  { id: 1, path: "/reset-password", component: <ResetPassword />, navItem: "Reset Password" },
  { id: 2, path: "/dashboard", component: <CrmDashboard />, navItem: "Dashboard" },
  { id: 4, path: "/profile", component: <Profile />, navItem: "Profile" },
  { id: 5, path: "/invoice", component: <Invoice />, navItem: "Invoice" },
  { id: 5, path: "/invoice/:manage", component: <ManageInvoice />, navItem: "Invoice" },
  { id: 7, path: "/crm/meetings", component: <Meetings />, navItem: "Meeting" },
  { id: 8, path: "/crm/meetings/create-meeting", component: <ManageMeeting />, navItem: "Create Meeting" },
  { id: 11, path: "/update-profile", component: <Update />, navItem: "Profile Update" },
  { id: 18, path: "/crm/lead", component: <Leads />, navItem: "Lead" },
  { id: 18, path: "/crm/lead/:manage", component: <ManageLead />, navItem: "Lead" },
  { id: 22, path: "/crm/deal", component: <Deal />, navItem: "Deal" },
  { id: 22, path: "/crm/deal/:manage", component: <ManageDeal />, navItem: "Create Deal" },
  { id: 24, path: "/crm/task", component: <Task />, navItem: "Task" },
  { id: 24, path: "/crm/task/:manage", component: <ManageTask />, navItem: "Task" },
  { id: 26, path: "/crm/follow-up", component: <Notes />, navItem: "Follow Up" },
  { id: 27, path: "/lead/create-lead", component: <ManageLead />, navItem: "Create Lead" },
  { id: 28, path: "/crm/campaign", component: <Campaign />, navItem: "Campaign" },
  { id: 22, path: "/crm/campaign/:manage", component: <ManageCampaign />, navItem: "Create Campaign" },
  { id: 29, path: "/department", component: <Department />, navItem: "Department" },
  { id: 30, path: "/designation", component: <Role />, navItem: "Designation" },
  { id: 31, path: "/employee", component: <Employee />, navItem: "Employee" },
  { id: 31, path: "/employee/:manage", component: <ManageEmployee />, navItem: "Manage Employee" },
  { id: 33, path: "/attendance", component: <Attendance />, navItem: "Attendance" },
  { id: 34, path: "/permission", component: <EmployeePermission />, navItem: "Permission" },
  { id: 34, path: "/permission/:employee_id", component: <Permission />, navItem: "Permission" },
  { id: 41, path: "/crm/creators", component: <Members />, navItem: "Creators" },
  { id: 41, path: "/crm/creators/:manage", component: <ManageMembers />, navItem: "Creators" },
  { id: 35, path: "/report", component: <Report />, navItem: "Report" },
  { id: 36, path: "/report/company-wide-view/revenue", component: <Revenue />, navItem: "Revenue" },
  {
    id: 37,
    path: "/report/company-wide-view/bills-receivables",
    component: <BillsReceivables />,
    navItem: "Bills Receivables",
  },
  { id: 38, path: "/report/company-wide-view/bills-payable", component: <BillsPayable />, navItem: "Bills Payable" },
  { id: 39, path: "/report/company-wide-view/profit", component: <Profit />, navItem: "Profit" },
  {
    id: 40,
    path: "/report/company-wide-view/execution-sheet",
    component: <ExecutionSheet />,
    navItem: "Execution Sheet",
  },
  { id: 41, path: "/report/team-wise/leads", component: <LeadsReport />, navItem: "Leads" },
  { id: 42, path: "/report/team-wise/closures", component: <ClosuresReport />, navItem: "Closures" },
  { id: 43, path: "/report/team-wise/lost-leads", component: <LostLeadsReport />, navItem: "Lost Leads" },
  { id: 44, path: "/report/team-wise/pending-tasks", component: <ExecutionSheet />, navItem: "Pending Tasks" },
]
