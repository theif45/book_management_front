/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import LoginInput from "../../components/UI/Login/LoginInput/LoginInput";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiRename } from "react-icons/bi";
import axios from "axios";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
`;

const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 600;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 50px 20px;
    width: 400px;
`;

const authForm = css`
    width: 100%;
`;

const inputLable = css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }
`;

const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register = css`
    margin-top: 10px;
    font-weight: 600;
`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const Register = () => {
    const navigate = useNavigate();

    const [registerUser, setRegisterUser] = useState({
        email: "",
        password: "",
        name: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value });
    };

    const registeSubmit = async () => {
        const data = {
            ...registerUser,
        };

        const option = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // cors 에러
        // 포트 번호가 달라서 일어남
        // 서버에서 원하는 요청의 corsorigin을 풀어줌
        // 비동기(응답이 올때까지 기다리는게 아니고 다음 작업을 계속 실행)
        try {
            // then
            await axios.post(
                "http://localhost:8080/auth/signup",
                JSON.stringify(data),
                option
            );
            setErrorMessages({ email: "", password: "", name: "" });
            alert("회운가입 성공!");
            navigate("/login");
        } catch (error) {
            // catch
            setErrorMessages({
                email: "",
                password: "",
                name: "",
                ...error.response.data.errorData,
            });
        }
        // axios.post(
        //     "http://localhost:8080/auth/signup",
        //     JSON.stringify(data),
        //     option
        // )
        // .then((response) => {
        //     setErrorMessages({ email: "", password: "", name: "" });
        //     console.log(response);
        // })
        // .catch((error) => {
        //     setErrorMessages({
        //         email: "",
        //         password: "",
        //         name: "",
        //         ...error.response.data.errorData,
        //     });
        // });
    };

    return (
        <div css={container}>
            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>
            <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLable}>Email</label>
                    <LoginInput
                        type="email"
                        placeholder="Type your email"
                        onChange={onChangeHandle}
                        name="email"
                    >
                        <FiUser />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.email}</div>
                    <label css={inputLable}>Password</label>
                    <LoginInput
                        type="password"
                        placeholder="Type your password"
                        onChange={onChangeHandle}
                        name="password"
                    >
                        <FiLock />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.password}</div>
                    <label css={inputLable}>Name</label>
                    <LoginInput
                        type="text"
                        placeholder="Type your name"
                        onChange={onChangeHandle}
                        name="name"
                    >
                        <BiRename />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.name}</div>
                    <button css={loginButton} onClick={registeSubmit}>
                        REGISTER
                    </button>
                </div>
            </main>

            <div css={signupMessage}>Already a user?</div>

            <footer>
                <div css={register}>
                    <Link to="/login">Login</Link>
                </div>
            </footer>
        </div>
    );
};

export default Register;
