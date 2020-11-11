import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; //Base de datos de Firebase
//import { toast } from "react-toastify";

//Se inicializa el componente
const EmpleadosForm = (props) => {

    const initialStateValues = {
      nombre: "",
      apellido: "",
      horas: "",
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        props.addOrEditEmpleado(values);
        setValues({ ...initialStateValues });
    };

    const getEmpleadoById = async (id) => {
        const doc = await db.collection("Empleados").doc(id).get();
        setValues({ ...doc.data() });
    };

    useEffect(() => {
        if (props.currentId === "") {
          setValues({ ...initialStateValues });
        } else {
          //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
          if (props.currentId !== null && props.currentId !== undefined) {
            getEmpleadoById(props.currentId);
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId]);

    return (  
<>
    {/* Contiene al formulario */}
    <div className="container-fluid border">
        <div className="container-fluid pt-2 pb-3 mb-3">
            <div className="container border border-primary rounded pt-2 pb-3">
                <form onSubmit={handleSubmit}>
                    <label className="ml-4"><h1> <span><FontAwesomeIcon icon={faUserCircle} /></span> Empleados</h1></label>
                    {/* Contiene los input */}
                    <div className="container">
                        <div className="form-group">
                            <label><span><FontAwesomeIcon icon={faUser} /></span> Nombre</label>
                            <input type="text" className="form-control" placeholder="Ingrese nombre" 
                            value={values.nombre} name="nombre" onChange={handleInputChange}/>
                        </div>
                        
                        <div className="form-group">
                            <label><span><FontAwesomeIcon icon={faUser} /></span> Apellido</label>
                            <input type="text" value={values.apellido} name="apellido" placeholder="Ingrese apellido" className="form-control" onChange={handleInputChange}/>
                        </div>
                        <div className="form-group input-group">
                            <input type="text" value={values.horas} name="edad" placeholder="Ingrese horas trabajadas" 
                            className="form-control" onChange={handleInputChange}/>
                        </div>
                    </div>
                    {/* Contiene el boton */}
                    <div className="container">
                        <button className="btn btn-outline-success btn-block">
                        {props.currentId === "" ? "Guardar" : "Actualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</>
);
}

export default EmpleadosForm;