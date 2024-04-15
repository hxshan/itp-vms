
import { useAuthContext } from "./hooks/useAuthContext";
import {Routes, Route, Navigate } from "react-router-dom";
import { Login, Navbar, TopBar, UnAuthorized } from "./pages/shared";
import {DriverDashboard, TripPage} from "./pages/driver";
import VehicleDashboard from "./pages/vehicle/VehicleDashboard";


import CaseFileForm from "./components/EAM/CaseFileForm";
import EAMDashboard  from "./pages/EAM/EAMDashboard";
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
import {FinanceDashboard,ExpenseTracking, IncomeTracking }from "./pages/finance";
import { VehicleServiceList } from "./components/VR/VehicleServiceList";
import ClientDashboard from "./pages/contract/ClientDashboard";
import ViewContract from "./pages/contract/ViewContract";
import ContractEditForm from "./pages/contract/ContractEditForm";
import CaseFileTable from "./components/EAM/CaseFileTable";
import { UserProfile } from "./pages/admin";
import {HireDashboard, CreateHire, EditHire, HireRates} from "./pages/hires/hires"
import AddClient from "./pages/contract/AddClient";
import { View } from '../src/components/VR/View';

import ViewClient from "./pages/contract/ViewClient";
import ClientEditForm from "./pages/contract/ClientEditForm";
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

            <Route path="/emergency" element={<EAMDashboard />} />
            <Route path="/emergency/create" element={<CaseFileForm />} />
            <Route path="/emergency/CaseFileTable" element={<CaseFileTable />} />
            <Route path="/user/:id" element={<UserProfile/>}/>
              
            <Route path="/hires">
              <Route index={true} element={<HireDashboard />} />
              <Route path="add" element={<CreateHire />}/>
              <Route path="edit/:id" element={<EditHire />}/>
              <Route path="rates" element={<HireRates />}/>
            </Route>

            <Route path="vehicle">
              <Route index={true} element={<VehicleDashboard />} />
              <Route path="add" element={<AddVehicle />} />
              <Route path="edit/:id" element={<VehicleDetailsControl />} />
              <Route path="view/:id" element={<VehicleViewControl />} />
              <Route path="report" element={<VehReport />} />
            </Route>
            
            <Route path="/Vrform" element={<CreateMaintainceForm />}/>
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/driver/TripPage" element={<TripPage />} />
            <Route path="/Mdashboard" element={<MaintainceDashboard />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/addnote" element={<servicenote />} />
            <Route
              path="/vehiclemaintain/edit/:id"
              element={<EditMaintainceOrder />}
            />

            <Route path="/Contract/Dashbored" element={<ContractDasboard />} />
            <Route path="/Contract/:id" element={<AddContract />}/>
            <Route path="/client" element={<ClientDashboard/>}/>
            <Route path="/viewContract/:id" element={<ViewContract/>}/>
            <Route path="/EditContract/:id" element={<ContractEditForm/>}/>

            <Route path="/EditClient/:id" element={<ClientEditForm/>}/>
            <Route path="/addClient" element={<AddClient/>}/>
            <Route path="/viewClient/:id" element={<ViewClient/>}/>
              

            <Route path="/finance/financeDashboard" element={<FinanceDashboard />} />
            <Route path="/finance/expenseTracking" element={<ExpenseTracking />} />
            <Route path="/finance/incomeTracking" element={<IncomeTracking  />} />       
            <Route path="/addClient" element={<AddClient/>}/>

            <Route
              path="/VehicleServiceList"
              element={<VehicleServiceList />}
            />
          </Routes>
        
    </>
  );
}

export default App;
