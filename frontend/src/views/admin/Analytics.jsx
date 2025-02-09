import OverviewCards from "../../components/analytics/OverviewCards";
import UserEngagementChart from "../../components/analytics/UserEngagementChart";


export default function Analytics() {
  return (
    <div className="flex-1 overflow-auto">
      <h1 className="text-base sm:text-2xl font-bold mb-4">Analytique</h1>

      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        <OverviewCards />
        <UserEngagementChart />
      </div>
      
    </div>
  )
}