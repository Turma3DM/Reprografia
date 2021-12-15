import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export const RemountingRoute = (props) => {
  const { component, ...other } = props
  const Component = component
  return (
    <Route {...other} render={p => <Component key={p.location.pathname + p.location.search}
      history={p.history}
      location={p.location}
      match={p.match} />}
    />)
}
RemountingRoute.propsType = {
  component: PropTypes.object.isRequired
}