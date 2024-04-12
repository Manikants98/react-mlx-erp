import CampaignAnalytics from "Components/Dashboard/CRMDashboard/CRMDashboard/CampaignAnalytics"
import LeadConversionRate from "Components/Dashboard/CRMDashboard/CRMDashboard/LeadConversionRate"
import LeadGraph from "Components/Dashboard/CRMDashboard/CRMDashboard/LeadGraph"
import LeadQualification from "Components/Dashboard/CRMDashboard/CRMDashboard/LeadQualification"

const CRMDashboard = () => {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <LeadGraph />
      <LeadQualification />
      <div className="flex gap-2">
        <LeadConversionRate />
        <CampaignAnalytics />
      </div>
    </div>
  )
}

export default CRMDashboard
