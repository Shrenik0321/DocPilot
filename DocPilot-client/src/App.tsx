import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import GetStarted from "./pages/GetStarted/GetStarted";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Unauthorised from "./components/Unauthorised/Unauthorised";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/unauthorised" element={<Unauthorised />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/get-started" element={<GetStarted />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
