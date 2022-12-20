import { Link } from "react-router-dom";
import "./AddMovie.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { API_URL,showMessage } from "../../util/Util";

export const AddMovie = ({
  id,
  name,
  synopsis,
  description,
  image,
  staffList,
  backgroundURL,
}) => {
  const [genres, setGenres] = useState([]);

  const [staffInputField, setStaffInputFields] = useState([
    { name: "", lastName: "", rol: "" },
  ]);

  const [movieInputField, setMovieInputField] = useState({
    name: "",
    releaseDate: "",
    synopsis: "",
    categoryList: [],
    link: "",
    imageLink: "",
    staffList: [],
  });

  const [genre, setGenre] = useState([
    { id: "", name: "", description: "", ageMinium: 0 },
  ]);


  const [token, setToken] = useState([]);
  


  const sendPostRequest = async (formData) => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
     let response = await fetch(API_URL + "movie", requestData);
    response = await response.json();
    if(response.status==true){
      showMessage("Pelicula Agregada", response.message, "success", "OK");
    }
    else if(response.status==false){
      showMessage("Error", response.message, "error", "Reintentar");
    }


    return response;
  };
  

  const getGenres = () => {
    fetch(API_URL + "category")
      .then((response) => response.json())
      .then((response) => {
        setGenres(response);
      });
  };

  //) { name: "", releaseDate: "",synopsis:"", categorySel:"",link:"",imageLink:"",staffList:staffInputField},

  const handleFormChange = (index, event) => {
    let data = [...staffInputField];
    data[index][event.target.name] = event.target.value;
    setStaffInputFields(data);
  };

  const handleFormMovieChange = (event) => {
    let temp = movieInputField;
    let nameField = event.target.name;
    temp[nameField] = event.target.value;

    setMovieInputField(temp);
  };

  const handleSelectGenre = (event) => {

    let result = genres.filter((obj) => {
      return obj.id === event.target.value;
    });
    setGenre(result);
  };
  const addFields = () => {
    let newfield = { name: "", lastName: "", rol: "" };
    setStaffInputFields([...staffInputField, newfield]);
  };

  useEffect(() => {
   
    getGenres();
    const items = JSON.parse(localStorage.getItem("authData"));
    if (items) {
      setToken(items.token)
   
    }

  }, []);

const err = (msg) =>{
  showMessage("Error", msg, "error", "Reintentar");
}

  const submit = (e) => {
    let test = [{ id: "", name: "", description: "", ageMinium: 0 }];

    if(movieInputField.name===""){
       err("Ingrese el nombre de la pelicula")
    }
    else if(JSON.stringify(genre)===JSON.stringify(test)){
      err("Seleccione por lo menos una categoria")
    }
    else{
        let temp = movieInputField;

        temp.staffList.push(...staffInputField);
    
        temp.categoryList.push(...genre);
    
        setMovieInputField(temp);
    
        e.preventDefault();
       sendPostRequest(movieInputField); 
    
    } 

    
  };

  return (
    <div id="addMovieContainer" className="container">
      <Form>
        <div className="title-container">
          <h1 className="title">Agregar Pelicula</h1>
          <div>
            <div onClick={submit} className="btn btn-primary">
              Guardar Pelicula
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titulo Pelicula"
                name="name"
                onKeyUp={handleFormMovieChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Fecha Lanzamiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="AAAA"
                name="releaseDate"
                onChange={(event) => handleFormMovieChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Descripcion</Form.Label>
              <Form.Control
                onChange={(event) => handleFormMovieChange(event)}
                placeholder=""
                name="synopsis"
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Categoria</Form.Label>

              <Form.Select
                onChange={(event) => handleSelectGenre(event)}
                name="categoryList"
                multiple
                aria-label="Default select example"
              >
                {genres.map((genre, idx) => (
                  //Temp

                  <option key={idx} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Link Youtube</Form.Label>
              <Form.Control
                onChange={(event) => handleFormMovieChange(event)}
                type="text"
                placeholder=""
                name="link"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Link Miniatura</Form.Label>
              <Form.Control
                onChange={(event) => handleFormMovieChange(event)}
                type="text"
                placeholder=""
                name="imageLink"
              />
            </Form.Group>
          </div>
        </div>

        <hr />

        <h2 className="productionSection">Produccion</h2>

        {staffInputField.map((input, index) => {
          return (
            <div className="row" key={index}>
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="inputLabel">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="name"
                    value={input.name}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="inputLabel">Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="lastName"
                    value={input.lastName}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="inputLabel">Rol</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="rol"
                    value={input.rol}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Form.Group>
              </div>
            </div>
          );
        })}
        <div className="btn btn-primary" onClick={addFields}>
          Agregar otro miembro
        </div>
        
      </Form>
    </div>
  );
};
