import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Callback from "./study/Callback";
import PromiseStudy from "./study/PromiseStudy";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import AuthRoute from "./components/Routes/AuthRoute/AuthRoute";
import { useRecoilValue } from "recoil";
import { authenticated } from "./index";

function App() {
    return (
        <>
            <Global styles={Reset}></Global>
            <Routes>
                <Route exact path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/* <Route path="/" Component={Main}></Route> */}
                <Route
                    path="/"
                    element={
                        <AuthRoute
                            authenticated={useRecoilValue(authenticated)}
                            element={<Main />}
                        />
                    }
                />
                {/* <Route path="/callback" Component={Callback}></Route>
                <Route path="/promise" Component={PromiseStudy}></Route> */}
            </Routes>
        </>
    );
}

export default App;
