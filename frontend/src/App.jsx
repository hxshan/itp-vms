
import { useAuthContext } from "./hooks/useAuthContext";
import {Routes, Route, Navigate } from "react-router-dom";
import { Login, Navbar, TopBar, UnAuthorized } from "./pages/shared";
import DriverDashboard from "./pages/driver/DriverDashboard";
import VehicleDashboard from "./pages/vehicle/VehicleDashboard";
import CaseFileForm from "./components/EAM/CaseFileForm";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle";
import AddContract from "./pages/contract/AddContract";
import { AdminDashboard, Roles, EditRoles } from "./pages/admin";
import { MaintainceDashboard } from "./pages/Maintains/MaintainceDashboard";
import { EditMaintainceOrder } from "./components/VR/EditMaintainceOrder";
import ContractDasboard from "./pages/contract/ContractDasboard";
import FinanaceDashboard from "./pages/finance/FinanaceDashboard";
import { VehicleServiceList } from "./components/VR/VehicleServiceList";
import ClientDashboard from "./pages/contract/ClientDashboard";
import ViewContract from "./pages/contract/ViewContract";
import ContractEditForm from "./pages/contract/ContractEditForm";
import {HireDashboard, CreateHire, EditHire} from "./pages/hires/hires"


function App() {
  const { user, loading } = useAuthContext();

  const isAuthenticated = (sector) => {
    if (!user?.accessToken && !loading) {
      return false;
    }
    const perms = user?.permissions;
    if (perms[sector].Read == false) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Routes>
        <Route path="/userauth/failed" element={<UnAuthorized />} />
      </Routes>
      <main className="flex w-full">
        <Navbar />
        <TopBar />
        <div className={"ml-32 w-full mr-14 mt-[90px] lg:ml-80"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                isAuthenticated("userPermissions") ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to={"/userauth/failed"} />
                )
              }
            />
            <Route path="/admin/roles" element={<Roles />} />
            <Route path="/admin/roles/:id" element={<EditRoles />} />

            <Route path="/hires">
              <Route index={true} element={<HireDashboard />} />
              <Route path="add" element={<CreateHire />}/>
              <Route path="edit" element={<EditHire />}/>
            </Route>
            
            <Route path="/emergency" element={<CaseFileForm />} />
            <Route path="vehicle">
              <Route index={true} element={<VehicleDashboard />} />
              <Route path="add" element={<AddVehicle />} />
            </Route>
            <Route path="/Contract/:id" element={<AddContract />}/>
            <Route path="/Vrform" element={<CreateMaintainceForm />}/>
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/Mdashboard" element={<MaintainceDashboard />} />
            <Route
              path="/vehiclemaintain/edit/:id"
              element={<EditMaintainceOrder />}
            />
            <Route path="/Contract/Dashbored" element={<ContractDasboard />} />
            <Route path="/Contract/Dashboard" element={<ContractDasboard/>}/>
            <Route path="/Client/Dashboard" element={<ClientDashboard/>}/>
            <Route path="/viewContract/:id" element={<ViewContract/>}/>
            <Route path="/EditContract/:id" element={<ContractEditForm/>}/>
            <Route path="/finance" element={<FinanaceDashboard />} />
            <Route path="/client" element={<ClientDashboard/>}/>
            <Route
              path="/VehicleServiceList"
              element={<VehicleServiceList />}
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
