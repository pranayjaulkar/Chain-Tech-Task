import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import "./App.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {!user ? (
          <Route exact path="/register" element={<Register />} />
        ) : (
          <Route exact path="/register" element={<Navigate to="/" />} />
        )}
        {!user ? (
          <Route exact path="/login" element={<Login />} />
        ) : (
          <Route exact path="/login" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
