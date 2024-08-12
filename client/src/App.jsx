import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import SinglePlacePage from "./pages/SinglePlacePage";
import ShowAllPictures from "./components/ShowAllPictures";

// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://airbnb-api-iota.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Main />} index />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<AccountPage/>}  path="/account/:subpage?/:action?/:id?" />
        <Route element={<SinglePlacePage />} path="/places/:id" />
        <Route element={<div>404 Not Found</div>} path="*" />
      </Route>
        <Route element={<ShowAllPictures/>} path="/pictures/:id" />
    </Routes>
    </UserContextProvider>
  );
}

export default App;
