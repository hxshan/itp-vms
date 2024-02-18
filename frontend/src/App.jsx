import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Button} from "@/components/shared/ui/button"
function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <main>
        <Routes>        
          
        </Routes>
        
      </main>
      
    </QueryClientProvider>
  </BrowserRouter>
  )
}

export default App
