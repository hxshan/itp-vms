import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DriverDashboard from "./pages/driver/DriverDashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
     
  
     <DriverDashboard />
        <Routes>        
          
        <Route path="/driver/DriverDashboard" element={<DriverDashboard />} />

        </Routes>
     
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
