import React from "react";
// 👇️ import Routes instead of Switch 👇️
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import { Category } from "./components/category/Category";

import { Content } from "./components/content/Content";

//import { Footer } from './components/footer/Footer';
import Footer from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Login } from "./components/login/Login";
import { Movie } from "./components/movie/Movie";
import { NotFound } from "./components/notFound/NotFound";
import { Register } from "./components/register/Register";
import { Sidebar } from "./components/sidebar/Sidebar";
import { AddMovie } from "./components/addMovie/AddMovie";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/category/:name" element={<Category />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/movies" element={<Content />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/movie/add" element={<AddMovie/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
