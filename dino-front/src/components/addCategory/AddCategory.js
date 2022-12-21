import './AddCategory.css'

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { API_URL, showMessage } from "../../util/Util";


export const AddCategory = () => {

    const [token, setToken] = useState([]);
  

    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem("authData"));
    if (items) {
      setToken(items.token)
   
    }
    })

    const [categoryInputs,setCategoryInputs] = useState({
        name:"",
        description:"",
        ageMinium:0
    })

    const handleFormChange = (event) => {
        let temp = categoryInputs;
        let nameField = event.target.name;
        temp[nameField]=event.target.value;

        setCategoryInputs(temp);
    }

    const submit = () =>{
       sendPostRequest(categoryInputs);
    }



  const sendPostRequest = async (formData) => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
     let response = await fetch(API_URL + "category", requestData);
    response = await response.json();

    if(response.status!=true){
      showMessage("Error", response.message, "error", "Reintentar");
    }
    else if(response.status==true){
      showMessage("Success", response.message, "success", "Ok");
    }


    return response;
  };

    return (
        <div id="add-category-container" className="container">
            <Form>
                <div className="title-container">
                    <h1 className="title">Agregar Categoria</h1>
                    <div>
                        <div onClick={submit} className="btn btn-primary">
                            Guardar Categoria
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="inputLabel">Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre Categoria"
                                name="name"
                                onChange={(event) => handleFormChange(event)}
                            />
                        </Form.Group>
                        
                    </div>
                    <div className='col'>
                    <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="inputLabel">Edad Minima</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Edad Minima"
                                name="ageMinium"
                                min={0}
                                onChange={(event) => handleFormChange(event)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                    <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="inputLabel">Descripcion</Form.Label>
              <Form.Control
                
                placeholder=""
                name="description"
                as="textarea"
                rows={3}
                onChange={(event) => handleFormChange(event)}
              />
            </Form.Group>
                    </div>
                </div>


            </Form>
        </div>
    )
}