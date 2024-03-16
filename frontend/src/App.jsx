import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HireDashboard from "./pages/hires/HireDashboard";
import {Login,Navbar} from "./pages/shared"
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
  const queryClient = new QueryClient();
  const {token} = useAuthContext()
  console.log(token)
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main className="flex w-full">
     <Navbar/>
      <div className={"ml-32 w-full mr-14 lg:ml-80"}>
        <Routes>        
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/hires" element={<HireDashboard/>}/>
        </Routes>
        </div>
      </main>
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
