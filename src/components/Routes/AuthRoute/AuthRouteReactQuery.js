import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
    authenticatedState,
    refreshState,
} from "../../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useQuery } from "react-query";

const AuthRouteReactQuery = ({ path, element }) => {
    const [refresh, setRefresh] = useRecoilState(refreshState);

    const { data, isLoading } = useQuery(
        ["authenticated"],
        () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = axios.get(
                "http://localhost:8080/auth/authenticated",
                {
                    params: { accessToken },
                }
            );
            return response;
        },
        {
            enabled: refresh, // true일때 한번실행되도록 함
        }
    );

    useEffect(() => {
        if (!refresh) {
            setRefresh(true);
        }
    }, [refresh]);

    if (isLoading) {
        return <div>로딩중...</div>;
    }

    const permitAll = ["/login", "/register", "/password/forgot"];
    if (!isLoading) {
        if (!data.data) {
            if (permitAll.includes(path)) {
                return element;
            }
            return <Navigate to="/login" />;
        }
        if (permitAll.includes(path)) {
            return <Navigate to="/" />;
        }

        return element;
    }
};

export default AuthRouteReactQuery;
