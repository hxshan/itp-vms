import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar} from "./pages/shared"
import AddVehicle from "./pages/vehicle/AddVehicle"

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main className="flex">
      <Navbar/>
        <Routes>        
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/hires" element={<HireDashboard/>}/>
          <Route path="/add_vehicle" element={<AddVehicle/>}/>
        </Routes>
      </main>
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
