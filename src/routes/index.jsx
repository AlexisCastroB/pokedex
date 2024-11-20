import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Search from "../views/Search";
import Pokemon from "../views/Pokemon";
import Type from "../views/Type";

const RoutesComponent = () => (
 <BrowserRouter>
  <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/search/:query" element={<Search />} />
   <Route path="/pokemon/:id" element={<Pokemon />} />
   <Route path="/type/:id" element={<Type />} />
  </Routes>
 </BrowserRouter>
);

export default RoutesComponent;