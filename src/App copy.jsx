import React, { useEffect, Fragment } from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./_helpers";
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

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   history.listen((location, action) => {
  //     // clear alert on location change
  //     dispatch(alertActions.clear());
  //   });
  // }, []);
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  return (
      {/* <Router history={history}>
        <Switch>
        
          <Route exact component={Login} path="/login" />
          <Route exact component={SignUp} path="/register" />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/invite" component={InviteMember} />
          <Route path="/verify" component={VerifyNumber} />
          <Route path="/change-password" component={ChangePassword} />
          <PrivateRoute path="/company-info" component={UploadCompanyInfo} />
          {/* <Route exact path={["/", "/home"]} component={Dashboard} /> 
          <PrivateRoute exact component={Dashboard} path="/" />
          <PrivateRoute
            exact
            component={PackageTracking}
            path="/package-tracking"
          />
          <PrivateRoute
            exact
            component={FleetManagement}
            path="/fleet-management"
          />
          <PrivateRoute
            exact
            component={VehicleInfo}
            path="/fleet-management/vehicle-info"
          />
          <PrivateRoute exact component={Staff} path="/staffs" />
          <PrivateRoute exact component={Finance} path="/finance" />
          <PrivateRoute exact component={Deliveries} path="/deliveries" />
          <PrivateRoute
            exact
            component={CreateInvoice}
            path="/finance/create-invoice"
          />
          {/* <PrivateRoute
            exact
            component={SendInvoice}
            path="/finance/send-invoice"
          /> *
          <PrivateRoute exact component={Invoice} path="/finance/invoice" />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router> */}
      <Fragment>
        <Routes>
          <Route exact element={<Login />} path="/login" />
          <Route exact element={<SignUp />} path="/register" />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/invite" element={<InviteMember />} />
          <Route path="/verify" element={<VerifyNumber />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <PrivateRoute path="/company-info" element={<UploadCompanyInfo />} />
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
          <Route
            path="/fleet-management/vehicle-info"
            element={<PrivateRoute />}
          >
            <Route
              path="/fleet-management/vehicle-info"
              element={<VehicleInfo />}
            />
          </Route>

          {/* Staff */}
          <Route path="/staffs" element={<PrivateRoute />}>
            <Route path="/staffs" element={<Staff />} />
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
      </Fragment>
  );
}

export default App;
