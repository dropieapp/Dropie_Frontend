import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./_helpers";
import { alertActions } from "./_actions";
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
import Partners from "./kyp/Partners";

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
    <div className="Dropie">
      <Router history={history}>
        <Switch>
        
        <Route exact path="/partners" component={Partners} />
          
          <Route exact component={Login} path="/login" />
          <Route exact component={SignUp} path="/register" />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/invite" component={InviteMember} />
          <Route path="/verify" component={VerifyNumber} />
          <Route path="/change-password" component={ChangePassword} />
          <PrivateRoute path="/company-info" component={UploadCompanyInfo} />
          {/* <Route exact path={["/", "/home"]} component={Dashboard} /> */}
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
          <PrivateRoute
            exact
            component={SendInvoice}
            path="/finance/send-invoice"
          />
          <PrivateRoute exact component={Invoice} path="/finance/invoice" />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
