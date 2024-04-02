import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DriverDashboard from "./pages/driver/DriverDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import { Login, Navbar, TopBar, UnAuthorized } from "./pages/shared";

import CaseFileForm from "./components/EAM/CaseFileForm";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle";
import AddContract from "./pages/contract/AddContract";
import { AdminDashboard, Roles, EditRoles } from "./pages/admin";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user,loading }= useAuthContext()

  const isAuthenticated = (sector)=>{
    if(!user?.accessToken && !loading){ 
      return false
    }
    const perms = user?.permissions
    if(perms[sector].Read == false){
     
      return false
    }
      
    return true
  }


  return (
    <>
          <Routes>
              <Route path="/userauth/failed" element={<UnAuthorized/>}/>
          </Routes>
          <main className="flex w-full">
            <Navbar />
            <TopBar />
            <div className={"ml-32 w-full mr-14 mt-[90px] lg:ml-80"}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={isAuthenticated('userPermissions')?<AdminDashboard />:<Navigate to={'/userauth/failed'}/>}/>
                <Route path="/admin/roles" element={<Roles />} />
                <Route path="/admin/roles/:id" element={<EditRoles />} />
                <Route path="/hires" element={<HireDashboard/>}/>
                <Route path="/emergency" element={<CaseFileForm />} />
                <Route path="/add_vehicle" element={<AddVehicle />} />
                <Route path="/Contract/:id" element={<AddContract />} />
                <Route path="/Vrform" element={<CreateMaintainceForm />} />
                <Route path="/driver" element={<DriverDashboard />} />
              </Routes>
            </div>
          </main>
      </>
  );
}

export default App;
