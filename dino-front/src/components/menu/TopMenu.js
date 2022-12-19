import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

import "./TopMenu.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { API_URL, isAuth } from "../../util/Util";

export const TopMenu = () => {
  const [categories, setCategories] = useState([]);
  const [uData, setuData] = useState([]);
  const [initial, setInitial] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    getCategoriesAsync();
    const items = JSON.parse(localStorage.getItem("authData"));
    if (items) {
      setuData(items);
      setInitial(items.name[0]);
    }
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
    <Navbar
      collapseOnSelect
      id="navbar-dino"
      expand="lg"
      bg="light"
      variant="light"
      className="navbar-dino"
    >
      {isAuth() ? (
        <>
          <Container>
            <Navbar.Brand as={Link} to={"/"}>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
                <NavDropdown title="Categorias" id="collasible-nav-dropdown">
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

                <Nav.Link as={Link} to={`#list`}>
                  Mi Lista
                </Nav.Link>
                <Nav.Link as={Link} to={`/scores/`}>
                  Mis calificados
                </Nav.Link>
                <Nav.Link as={Link} to={`/movie/add`}>
                  Agregar Pelicula
                </Nav.Link>
                <Nav.Link as={Link} to={`/account/`}></Nav.Link>
                <Nav.Link id="logout" as={Link} to={`/`} onClick={logOut}>
                  Cerrar sesión
                </Nav.Link>
              </Nav>
              <div id="userContainer" className="ms-auto">
                <div id="userInitial">
                  {" "}
                  <div className="initial">{initial}</div>{" "}
                </div>
                <NavDropdown title={uData.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={logOut}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Container>
        </>
      ) : (
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );

  return bootstrapMenu();
};
