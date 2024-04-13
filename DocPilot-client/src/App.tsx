import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Unauthorised from "./components/Unauthorised/Unauthorised";
import Pricing from "./pages/Pricing/Pricing";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/unauthorised" element={<Unauthorised />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
