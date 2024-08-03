import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Main />} index />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        
      </Route>
    </Routes>
  );
}

export default App;
