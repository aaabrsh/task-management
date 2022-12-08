import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Layout from "./layout";
import Home from "./layout/pages/Home";
import NewBoard from "./layout/pages/NewBoard";
import PageNotFound from "./layout/pages/PageNotFound";
import Board from "./layout/pages/Board";
import About from "./layout/pages/About";
import Profile from "./layout/pages/Profile";
import Login from "./layout/pages/Login";
import Signup from "./layout/pages/Signup";
import BoardsList from "./layout/pages/BoardsList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="boards" element={<BoardsList />} />
          <Route path="boards/new" element={<NewBoard />} />
          <Route path="boards/:id" element={<Board />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
