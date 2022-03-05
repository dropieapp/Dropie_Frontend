import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from "./pages/SignIn";
import Signup from "./pages/Signup";
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
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/register" />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/invite" component={InviteMember} />
          <Route path="/verify" component={VerifyNumber} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/company-info" component={UploadCompanyInfo} />
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



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route
          	path='/dashboard'
          	element={
          		<PrivateRoute>
          			<DashboardPage />
          		</PrivateRoute>
          	}
          />
          <Route
          	path='/dashboard'
          	element={
          		<PrivateRoute>
          			<DashboardPage />
          		</PrivateRoute>
          	}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
