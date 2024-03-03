import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main>
        <Routes>        
          <Route path="/" element={<AdminDashboard/>}/>
        </Routes>
        
      </main>
      
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
