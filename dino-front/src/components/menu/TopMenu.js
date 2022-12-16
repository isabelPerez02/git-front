import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopMenu.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { API_URL, isAuth } from "../../util/Util";

export const TopMenu = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const getCategoriesAsync = async () => {
    let response = await fetch(API_URL + "category");
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

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderLogout = () => {
    if (localStorage.getItem("authData")) {
      return <a onClick={logOut}> cerrar sesión</a>;
    }
  };

  const bootstrapMenu = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {isAuth() ? (
        <>
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
                    <NavDropdown.Item key={idx}>
                      <Link key={idx} to={`/category/${item.name}`}>
                        {item.name}
                      </Link>
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link>
                  <Link to={`/category/`}> Más vistas</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={`/view/`}> Mis Listas</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={`/scores/`}> Mis calificados</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={`/account/`}> Mi cuenta</Link>
                </Nav.Link>
                <Nav.Link href="#link">{renderLogout()}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </>
      ) : (
        ""
      )}
    </Navbar>
  );

  return bootstrapMenu();
};
