import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshState } from "../../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useQueries, useQuery } from "react-query";

const AuthRouteReactQuery = ({ path, element }) => {
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const [authenticated, principal] = useQueries([
        {
            queryKey: ["authenticated"],
            queryFn: async () => {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/auth/authenticated", {
                    params: { accessToken },
                });
                return response;
            },
            enabled: refresh,
            suspense: true,
        },
        {
            queryKey: ["principal"],
            queryFn: async () => {
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get("http://localhost:8080/auth/principal", { params: { accessToken } });
                return response;
            },
            enabled: !!localStorage.getItem("accessToken"),
            suspense: true,
        },
    ]);

    // const { data, isLoading } = useQuery(
    //     ["authenticated"],
    //     async () => {
    //         const accessToken = localStorage.getItem("accessToken");
    //         const response = await axios.get("http://localhost:8080/auth/authenticated", {
    //             params: { accessToken },
    //         });
    //         return response;
    //     },
    //     {
    //         enabled: refresh, // true일때 한번실행되도록 함
    //     }
    // );

    // const principal = useQuery(
    //     ["principal"],
    //     async () => {
    //         const accessToken = localStorage.getItem("accessToken");
    //         const response = await axios.get("http://localhost:8080/auth/principal", { params: { accessToken } });
    //         return response;
    //     },
    //     {
    //         enabled: !!localStorage.getItem("accessToken"),
    //     }
    // );

    useEffect(() => {
        if (!refresh) {
            setRefresh(true);
        }
    }, [refresh]);

    if (authenticated.isLoading) {
        return <div>로딩중...</div>;
    }

    console.log(authenticated);
    console.log(principal);
    if (principal.data !== undefined) {
        const roles = principal.data.data.authorities.split(",");
        // const hasAdminPath = path.substr(0, 6) === "/admin";
        if (path.startsWith("/admin") && !roles.includes("ROLE_ADMIN")) {
            alert("접근권한이 없습니다.");
            return <Navigate to="/" />;
        }
    }

    if (!authenticated.isLoading) {
        const permitAll = ["/login", "/register", "/password/forgot"];
        //로그인이 안되었을 때
        if (!authenticated.data.data) {
            if (permitAll.includes(path)) {
                return element;
            }
            return <Navigate to="/login" />;
        }
        // 로그인이 되었을 때
        if (permitAll.includes(path)) {
            return <Navigate to="/" />;
        }

        return element;
    }
};

export default AuthRouteReactQuery;
