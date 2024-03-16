import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar} from "./pages/shared"
import { CreateMaintainceForm } from "./components/VR/CreateMaintainceForm";
import AddVehicle from "./pages/vehicle/AddVehicle"
import AddContract from "./pages/contract/AddContract";


function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main className="flex w-full">
          <Navbar/>
          <Routes>        
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/hires" element={<HireDashboard/>}/>
            <Route path="/add_vehicle" element={<AddVehicle/>}/>
            <Route path="/Contract/:id" element={<AddContract/>}/>
            <Route path="/Vrform" element={<CreateMaintainceForm/>}/>
          </Routes>
      </main>
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
