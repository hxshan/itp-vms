import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar} from "./pages/shared"
import { useAuthContext } from "./hooks/useAuthContext";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle"
import AddContract from "./pages/contract/AddContract";
import FinanaceDashboard from "./pages/finance/FinanaceDashboard";


function App() {
  const queryClient = new QueryClient();
  const {token} = useAuthContext()
  console.log(token)
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>   
    
     
        <Routes>        
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/hires" element={<HireDashboard/>}/>
          <Route path="/add_vehicle" element={<AddVehicle/>}/>
          <Route path="/Contract/:id" element={<AddContract/>}/>
          <Route path="/Vrform" element={<CreateMaintainceForm/>}/>
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path = "/finance" element ={<FinanaceDashboard />} />
        
        </Routes>
     
      
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
