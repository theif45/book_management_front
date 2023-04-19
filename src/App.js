import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Callback from "./study/Callback";
import PromiseStudy from "./study/PromiseStudy";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route path="/callback" Component={Callback}></Route>
        <Route path="/promise" Component={PromiseStudy}></Route>
      </Routes>
    </>
  );
}

export default App;
