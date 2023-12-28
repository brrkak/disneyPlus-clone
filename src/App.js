import "./App.css";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import Nav from "./components/Nav/Nav";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "./redux/Slice/loginSlice";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { memoLoginAuthSelector } from "./redux/Selector/memoSelectors";
import { useGetUserInfoMutation } from "./api/apiSlice";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};


function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="login/signup" element={<SignUpPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
