import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
