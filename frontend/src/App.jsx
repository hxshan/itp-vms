import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar, TopBar} from "./pages/shared"
import { useAuthContext } from "./hooks/useAuthContext";
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle"
import AddContract from "./pages/contract/AddContract";
import Roles from "./pages/admin/Roles";


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
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/admin/roles" element={<Roles/>}/>
          <Route path="/hires" element={<HireDashboard/>}/>
          <Route path="/add_vehicle" element={<AddVehicle/>}/>
          <Route path="/Contract/:id" element={<AddContract/>}/>
          <Route path="/Vrform" element={<CreateMaintainceForm/>}/>
          <Route path="/driver" element={<DriverDashboard />} />
        </Routes>
        </div>
      </main>
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
