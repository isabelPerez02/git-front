import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TopMenu.css";

import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from 'react-bootstrap/Container';


export const TopMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const getCategoriesAsync = async () => {
    let response = await fetch("http://localhost:8080/api/category");
    response = await response.json();
    setCategories(response);
  };

  const items = [
    "Inicio",
    "Categorias",
    "Más vistas",
    "Mis listas",
    "Mis calificaciones",
    "Mi cuenta",
  ];

  const classSubMenu = () => (
    <div className="navbar">
      <Link to="/">Inicio</Link>
      <div className="subnav">
        <button className="subnavbtn">
          Categorías <i className="fa fa-caret-down"></i>
        </button>
        <div className="subnav-content">
          {categories.map((item, idx) => (
            <Link key={idx} to={`/category/${item.name}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="subnav">
        <button className="subnavbtn">
          Partners <i className="fa fa-caret-down"></i>
        </button>
        <div className="subnav-content">
          <a href="#link1">Link 1</a>
          <a href="#link2">Link 2</a>
          <a href="#link3">Link 3</a>
          <a href="#link4">Link 4</a>
        </div>
      </div>
      <a href="#contact">Contact</a>
    </div>
  );

  const oldMenu = () => (
    <div className="scrollmenu">
      {items.map((item, idx) => (
        <a key={idx} href="home">
          {item}
        </a>
      ))}
    </div>
  );

  const bootstrapMenu=()=>(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">DINO-Peliculas</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">
              <Link to="/">Inicio</Link>
          </Nav.Link>
          <NavDropdown title="Categories" id="collasible-nav-dropdown">
              {categories.map((item, idx) => (
               <NavDropdown.Item>
                <Link key={idx} to={`/category/${item.name}`}>
                {item.name}
              </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link >
              <Link to={`/category/`}> Más vistas</Link>
          </Nav.Link>
          <Nav.Link >
              <Link to={`/view/`}> Mis Listas</Link>
          </Nav.Link>
          <Nav.Link >
              <Link to={`/scores/`}> Mis calificados</Link>
          </Nav.Link>
          <Nav.Link>
             <Link to={`/account/`}> Mi cuenta</Link>
          </Nav.Link>
        </Nav>
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );

  return bootstrapMenu();
};
