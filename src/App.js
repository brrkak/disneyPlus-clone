import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import Nav from "./components/Nav/Nav";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";



const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};


function App() {
  // const authSelector = useSelector(memoLoginAuthSelector);
  // const navigate = useNavigate()
  // const dispatch = useDispatch();
  // const [errorMg, setErrorMg] = useState("");




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
