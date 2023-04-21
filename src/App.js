import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import AuthRoute from "./components/Routes/AuthRoute/AuthRoute";
import AuthRouteReactQuery from "./components/Routes/AuthRoute/AuthRouteReactQuery";

function App() {
    return (
        <>
            <Global styles={Reset}></Global>
            <Routes>
                <Route
                    exact
                    path="/login"
                    element={
                        <AuthRouteReactQuery
                            path="/login"
                            element={<Login />}
                        />
                    }
                ></Route>
                <Route
                    path="/register"
                    element={
                        <AuthRouteReactQuery
                            path="/register"
                            element={<Register />}
                        />
                    }
                ></Route>
                <Route
                    path="/"
                    element={
                        <AuthRouteReactQuery path="/" element={<Main />} />
                    }
                />
                {/* <Route path="/callback" Component={Callback}></Route>
                <Route path="/promise" Component={PromiseStudy}></Route> */}
            </Routes>
        </>
    );
}

export default App;
