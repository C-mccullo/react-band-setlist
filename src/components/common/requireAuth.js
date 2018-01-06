import React from "react";
import { Route, Redirect } from "react-router-dom";
const ReqAuth = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest } render={ (props) => {
      return (
        isAuthenticated
        ? ( <Component {...props} { ...rest }/> ) : ( <Redirect to={{ pathname: '/login' }}/> )
      )
    } } />
  )
}

export default ReqAuth;