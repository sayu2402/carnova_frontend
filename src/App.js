import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserRouter from "./router/userRoute/UserRouter";
import AdminRouter from "./router/adminRoute/AdminRouter";
import VendorRouter from "./router/VendorRoute/VendorRouter";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/vendor/*" element={<VendorRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
