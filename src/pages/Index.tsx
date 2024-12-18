import { Layout } from "@/components/Layout";
import { DashboardStats } from "@/components/DashboardStats";
import { MedicationsList } from "@/components/MedicationsList";
import { CategoriesList } from "@/components/CategoriesList";
import { Settings } from "@/components/Settings";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  
  const getComponent = () => {
    switch (location.pathname) {
      case '/medications':
        return <MedicationsList />;
      case '/categories':
        return <CategoriesList />;
      case '/settings':
        return <Settings />;
      default:
        return (
          <>
            <div>
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Dr. Smith</p>
            </div>
            <DashboardStats />
          </>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {getComponent()}
      </div>
    </Layout>
  );
};

export default Index;