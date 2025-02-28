import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
import Processing from "./components/Processing";
import { ChangeProvider } from "./context/ChangeContext";

function App() {
  return (
    <>
      <ChangeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/processing" element={<Processing />} />
          </Routes>
        </BrowserRouter>
      </ChangeProvider>
    </>
  );
}

export default App;
