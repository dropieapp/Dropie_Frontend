import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("user")) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };

// import React from "react";
// import { Navigate, Route, useLocation } from "react-router-dom";
// // import { checkCookie } from "./utils/cookies";

// const PrivateRoute = ({ children }) => {
//   const location = useLocation();

//   if (!localStorage.getItem("user")) {
//     return <Navigate to="/" state={{ from: location }} />;
//   }

//   return children;
// };

// export { PrivateRoute };
