import React, { useEffect, Fragment } from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { history } from "./_helpers";
import { PrivateRoute } from "./_components";

import Login from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./css/style.scss";

import "./charts/ChartjsConfig";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import InviteMember from "./pages/InviteMember";
import VerifyNumber from "./pages/Verify_number";
import ChangePassword from "./pages/ChangePassword";
import UploadCompanyInfo from "./pages/UploadCompanyInfo";
import PackageTracking from "./pages/Package_tracking";
import FleetManagement from "./pages/FleetManagement";
import Staff from "./pages/Staff";
import Finance from "./pages/Finance";
import VehicleInfo from "./pages/VehicleInfo";
import Deliveries from "./pages/Deliveries";
import CreateInvoice from "./pages/CreateInvoice";
import Invoice from "./pages/Invoice";
import SendInvoice from "./pages/SendInvoice";
import { clearMessage } from "./actions/message";
import SingleAgent from "./pages/SingleAgent";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    dispatch(clearMessage());
  }, [location.pathname]); // triggered on route change

  // console.log("location", location);

  return (
    <div className="Dropie">
      <Routes>
        <Route exact element={<Login />} path="/login" />
        <Route exact element={<SignUp />} path="/register" />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/invite" element={<InviteMember />} />
        <Route path="/verify" element={<VerifyNumber />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/company-info" element={<PrivateRoute />}>
          <Route path="/company-info" element={<UploadCompanyInfo />} />
        </Route>
        {/* Dashboard */}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Dashboard />} />
        </Route>
        {/* Package Tracking */}
        <Route path="/package-tracking" element={<PrivateRoute />}>
          <Route path="/package-tracking" element={<PackageTracking />} />
        </Route>
        {/* Fleet Management */}
        <Route path="/fleet-management" element={<PrivateRoute />}>
          <Route path="/fleet-management" element={<FleetManagement />} />
        </Route>
        {/* Vehicle Info */}
        <Route path="/fleet-management/vehicle-info" element={<PrivateRoute />}>
          <Route
            path="/fleet-management/vehicle-info"
            element={<VehicleInfo />}
          />
        </Route>

        {/* Staff */}
        <Route path="/staffs" element={<PrivateRoute />}>
          <Route path="/staffs" element={<Staff />} />
        </Route>
        <Route path="/staffs/:id/edit-agent" element={<PrivateRoute />}>
          <Route path="/staffs/:id/edit-agent" element={<SingleAgent />} />
        </Route>
        {/* Finance */}
        <Route path="/finance" element={<PrivateRoute />}>
          <Route path="/finance" element={<Finance />} />
        </Route>
        {/* Deliveries */}
        <Route path="/deliveries" element={<PrivateRoute />}>
          <Route path="/deliveries" element={<Deliveries />} />
        </Route>
        {/* Create Invoice */}
        <Route path="/finance/create-invoice" element={<PrivateRoute />}>
          <Route path="/finance/create-invoice" element={<CreateInvoice />} />
        </Route>
        {/* Send Invoice */}
        <Route path="/finance/send-invoice" element={<PrivateRoute />}>
          <Route path="/finance/send-invoice" element={<SendInvoice />} />
        </Route>
        {/* Invoice */}
        <Route path="/finance/invoice" element={<PrivateRoute />}>
          <Route path="/finance/invoice" element={<Invoice />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
