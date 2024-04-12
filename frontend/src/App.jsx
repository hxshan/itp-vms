
import { useAuthContext } from "./hooks/useAuthContext";
import {Routes, Route, Navigate } from "react-router-dom";
import { Login, Navbar, TopBar, UnAuthorized } from "./pages/shared";
import DriverDashboard from "./pages/driver/DriverDashboard";
import VehicleDashboard from "./pages/vehicle/VehicleDashboard";


import CaseFileForm from "./components/EAM/CaseFileForm";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";

import AddVehicle from "./pages/vehicle/AddVehicle";
import VehicleDetailsControl from "./pages/vehicle/VehicleDetailsControl";
import VehicleViewControl from "./pages/vehicle/VehicleViewControl";
import VehReport from "./pages/vehicle/VehReport";

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
import { UserProfile } from "./pages/admin";
import {HireDashboard, CreateHire, EditHire, HireRates} from "./pages/hires/hires"
import AddClient from "./pages/contract/AddClient";
import { View } from '../src/components/VR/View';
import UserReport from "./components/admin/UserReport";
import { EditUserForm } from "./components/admin";
import EditUser from "./pages/admin/EditUser";

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
      <main className="flex w-full bg-slate-100 min-h-screen">
        <TopBar />
        <Navbar />
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
            <Route path="/admin/userreport/:id" element={<UserReport/>}/>
            <Route path="/admin/roles" element={<Roles />} />
            <Route path="/admin/roles/:id" element={<EditRoles />} />
            <Route path="/admin/edituser/:id" element={<EditUser/>}/>
            <Route path="/user/:id" element={<UserProfile/>}/>


            <Route path="/hires">
              <Route index={true} element={<HireDashboard />} />
              <Route path="add" element={<CreateHire />}/>
              <Route path="edit/:id" element={<EditHire />}/>
              <Route path="rates" element={<HireRates />}/>
            </Route>
            <Route path="/emergency" element={<CaseFileForm />} />
            <Route path="vehicle">
              <Route index={true} element={<VehicleDashboard />} />
              <Route path="add" element={<AddVehicle />} />
              <Route path="edit/:id" element={<VehicleDetailsControl />} />
              <Route path="view/:id" element={<VehicleViewControl />} />
              <Route path="report" element={<VehReport />} />
            </Route>
            <Route path="/Contract/:id" element={<AddContract />}/>
            <Route path="/Vrform" element={<CreateMaintainceForm />}/>
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/Mdashboard" element={<MaintainceDashboard />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/addnote" element={<servicenote />} />
            <Route
              path="/vehiclemaintain/edit/:id"
              element={<EditMaintainceOrder />}
            />
            <Route path="/Contract/Dashbored" element={<ContractDasboard />} />


            <Route path="/client" element={<ClientDashboard/>}/>
            <Route path="/viewContract/:id" element={<ViewContract/>}/>
            <Route path="/EditContract/:id" element={<ContractEditForm/>}/>
            <Route path="/addClient" element={<AddClient/>}/>
            <Route path="/finance" element={<FinanaceDashboard />} />
            
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
