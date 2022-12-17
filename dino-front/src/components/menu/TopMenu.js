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

  const logOut = () => {
    localStorage.clear();
    navigate("/");
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
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <NavDropdown title="Categories" id="collasible-nav-dropdown">
                  {categories.map((item, idx) => (
                    <NavDropdown.Item
                      as={Link}
                      key={idx}
                      to={`/category/${item.name}`}
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link as={Link} to={`/category/`}>
                  Más vistas
                </Nav.Link>
                <Nav.Link as={Link} to={`/view/`}>
                  Mis Listas
                </Nav.Link>
                <Nav.Link as={Link} to={`/scores/`}>
                  Mis calificados
                </Nav.Link>
                <Nav.Link as={Link} to={`/account/`}>
                  Mi cuenta
                </Nav.Link>
                <Nav.Link onClick={logOut}>Cerrar sesión</Nav.Link>
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
