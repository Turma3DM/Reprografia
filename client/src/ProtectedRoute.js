import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ authState: authState, component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState) {
          return <Component />;
        }
        else {
          return (
            <Redirect to={{ pathname: '/NotFound', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;