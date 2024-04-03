import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DriverDashboard from "./pages/driver/DriverDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar, TopBar} from "./pages/shared"

import CaseFileForm from "./components/EAM/CaseFileForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle"
import AddContract from "./pages/contract/AddContract";
import FinanaceDashboard from "./pages/finance/FinanaceDashboard";
import {AdminDashboard,Roles,EditRoles} from "./pages/admin";

function App() {
  const queryClient = new QueryClient();
  //const {token} = useAuthContext()
  //console.log(token)
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>   

     <main className="flex w-full">
     <Navbar/>
     <TopBar/>
      <div className={"ml-32 w-full mr-14 mt-[90px] lg:ml-80"}>
        <Routes>        
          <Route path="/login" element={<Login/>}/>
          <Route path="admin">
            <Route index={true} element={<AdminDashboard/>}/>
            <Route path="roles" element={<Roles/>}/>
            <Route path="roles/:id" element={<EditRoles/>}/>
          </Route>
          <Route path="/hires" element={<HireDashboard/>}/>
          <Route path="/emergency" element={<CaseFileForm/>}/>
          <Route path="/add_vehicle" element={<AddVehicle/>}/>
          <Route path="/Contract/:id" element={<AddContract/>}/>
          <Route path="/Vrform" element={<CreateMaintainceForm/>}/>
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path = "/finance" element ={<FinanaceDashboard />} />
        
        </Routes>
     </div>
     </main>
      
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
