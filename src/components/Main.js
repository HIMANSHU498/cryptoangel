import React from "react";
import Fundraisers from "./Fundraisers";
import Home from "./Main/Home";
import { Routes, Route } from "react-router-dom";
import Create from "./Main/Create";
import Aboutus from "./Main/Aboutus";
import Detail from "./[address]";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="fundraisers" element={<Fundraisers />} />
      <Route exact path="/create" element={<Create />} />
      <Route exact path="/aboutus" element={<Aboutus />} />
      <Route exact path="/detail" element={<Detail />} />
    </Routes>
  );
};

export default Main;
