import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/Account";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Main />} index />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<AccountPage/>}  path="/account" />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
