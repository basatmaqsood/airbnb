import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Main />} index />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<LoginPage />} path="/register" />
        
      </Route>
    </Routes>
  );
}

export default App;
