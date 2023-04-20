import React, { Component } from "react";
import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ authenticated, element }) => {
    return authenticated ? element : <Navigate to="/login" />;
};

export default AuthRoute;
