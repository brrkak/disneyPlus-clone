import "./App.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import Nav from "./components/Nav/Nav";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserSearchPage from "./pages/UserSearchPage"
import { memoLoginAuthSelector } from "./redux/Selector/memoSelectors";
import ProfileEdit from "./pages/ProfilePage/ProfileEdit";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};


function App() {
  const authSelector = useSelector(memoLoginAuthSelector);
  const navigate = useNavigate()



  useEffect(() => {
    if (authSelector === true) {
      navigate("/main")
    } else {
      navigate("/")
    }
  }, [authSelector])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="login/signup" element={<SignUpPage />} />
          <Route path="login/usersearch" element={<UserSearchPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<ProfileEdit />} />

          <Route path="/main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
