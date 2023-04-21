import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authenticatedState } from "../../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { getAuthenticated } from "../../../api/auth/authApi";

const AuthRoute = ({ path, element }) => {
    const accessToken = localStorage.getItem("accessToken");

    const [authenticated, setAuthenticated] =
        useRecoilState(authenticatedState);

    const { data, isLoading, error } = useQuery(["authenticated"], () =>
        getAuthenticated(accessToken)
    );

    useEffect(() => {
        console.log(data);
        if (data) {
            setAuthenticated(data.data);
        }
    }, [data]);

    const permitAll = ["/login", "/register", "/password/forgot"];

    if (!authenticated) {
        if (permitAll.includes(path)) {
            return element;
        }

        return <Navigate to="/login" />;
    }

    if (permitAll.includes(path)) {
        return <Navigate to="/" />;
    }

    return element;
};

export default AuthRoute;
