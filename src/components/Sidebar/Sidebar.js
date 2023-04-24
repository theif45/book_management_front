/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import ListButton from "./ListButton/ListButton";
import { BiHome, BiLike, BiListUl, BiLogOut } from "react-icons/bi";
import { useQuery } from "react-query";
import axios from "axios";

const sidebar = (isOpen) => css`
    position: absolute;
    left: ${isOpen ? "10px" : "-240px"};
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 250px;
    background-color: white;
    box-shadow: -1px 0px 5px #dbdbdb;
    transition: left 1s ease;
    ${isOpen ? "" : `cursor: pointer;`}
    ${isOpen ? "" : `&:hover {left: -230px;}`}
`;

const header = css`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
`;

const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;
    width: 45px;
    height: 45px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
    font-weight: 600;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const userName = css`
    padding: 5px;
    padding-top: 0px;
    font-size: 18px;
    font-weight: 600;
`;

const userEmail = css`
    font-size: 12px;
`;

const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    padding-left: 0.3px;
    width: 18px;
    height: 18px;
    font-size: 12px;
    cursor: pointer;
    &:active {
        background-color: #dbdbdb;
    }
`;

const main = css`
    padding: 10px;
    border-bottom: 1px solid #dbdbdb;
`;

const footer = css`
    padding: 10px;
`;

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    //react query는 이전 데이터에서 바뀌지 않으면 상태도 그대로, 데이터가 바뀌면 상태를 바꿈
    const { data, isLoading } = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
            "http://localhost:8080/auth/principal",
            { params: { accessToken } },
            {
                enabled: accessToken,
            }
        );
        return response;
    });

    const sidebarOpenClickHandle = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const sidebarCloseClickHandle = () => {
        setIsOpen(false);
    };

    const logoutClickHandle = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
        }
    };

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!isLoading)
        return (
            <div css={sidebar(isOpen)} onClick={sidebarOpenClickHandle}>
                <header css={header}>
                    <div css={userIcon}>{data.data.name.substr(0, 1)}</div>
                    <div css={userInfo}>
                        <h1 css={userName}>{data.data.name}</h1>
                        <p css={userEmail}>{data.data.email}</p>
                    </div>
                    <div css={closeButton} onClick={sidebarCloseClickHandle}>
                        <GrFormClose />
                    </div>
                </header>
                <main css={main}>
                    <ListButton title="Dashboard">
                        <BiHome />
                    </ListButton>
                    <ListButton title="Likes">
                        <BiLike />
                    </ListButton>
                    <ListButton title="Rental">
                        <BiListUl />
                    </ListButton>
                </main>
                <footer css={footer}>
                    <ListButton title="Logout" onClick={logoutClickHandle}>
                        <BiLogOut />
                    </ListButton>
                </footer>
            </div>
        );
};

export default Sidebar;
