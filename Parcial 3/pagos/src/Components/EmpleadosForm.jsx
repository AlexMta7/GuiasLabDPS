import { text } from "@fortawesome/fontawesome-svg-core";
import { faHourglass, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase"; //Base de datos de Firebase
//import { toast } from "react-toastify";

//Se inicializa el componente
const EmpleadosForm = (props) => {

    const initialStateValues = {
      nombre: "",
      apellido: "",
      horas: "",
      isss: "",
      afp: "",
      renta: "",
      sueldoT: "",
      sueldoN: ""
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
           
        e.preventDefault();

        if (values.horas != "" && values.nombre != ""){
            descuentos(values.horas);
            props.addOrEditEmpleado(values);
            setValues({ ...initialStateValues });
        }
        else{
            toast("Las casillas nombre y horas no pueden quedar vacías", {type:"error"});
        }
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

    const descuentos = (horas) => {
        if(horas >= 0){
            if(horas <= 160){
                toast("horas menores o iguales a 160", {type: "info"});
                cientoSesenta(horas);
            }
            else if(horas <= 200){
                toast("horas entre 161 y 200", {type: "info"});
                horas = horas - 160;
                doscientos(horas);
            }
            else if(horas <= 250){
                toast("horas entre 201 y 250", {type: "info"});
                horas = horas - 200;
                doscientosCincuenta(horas);
            }
            else{
                toast("El máximo de horas es 250 h", {type: "error"});
            }
        }
        else{
            toast("Ingrese un número positivo", {type: "error"});
        }
    };

    //Calcula los pagos cuando horas <= 160
    const cientoSesenta = (horas) => {
        values.sueldoT = (horas * 9.75).toFixed(2);
        values.isss = (values.sueldoT * 0.0525).toFixed(2);
        values.afp = (values.sueldoT * 0.0688).toFixed(2);
        values.renta = (values.sueldoT * 0.1).toFixed(2);
        values.sueldoN = (values.sueldoT - values.isss - values.afp - values.renta).toFixed(2);
    };

    //Calcula los pagos cuando horas <= 200
    const doscientos = (horas) =>{
        //Para 160 horas
        let sueldoT160 = parseFloat((160 * 9.75).toFixed(2));
        let isss160 = parseFloat((sueldoT160 * 0.0525).toFixed(2));
        let afp160 = parseFloat((sueldoT160 * 0.0688).toFixed(2));
        let renta160 = parseFloat((sueldoT160 * 0.1).toFixed(2));
        let sueldoN160 = parseFloat((sueldoT160 - isss160 - afp160 - renta160).toFixed(2));

        //Para las horas extra después de las 160
        let sueldoT200 = parseFloat((horas * 11.50).toFixed(2));
        let isss200 = parseFloat((sueldoT200 * 0.0525).toFixed(2));
        let afp200 = parseFloat((sueldoT200 * 0.0688).toFixed(2));
        let renta200 = parseFloat((sueldoT200 * 0.1).toFixed(2));
        let sueldoN200 = parseFloat((sueldoT200 - isss200 - afp200 - renta200).toFixed(2));

        //Suma de los 2 pagos
        values.sueldoT = sueldoT160 + sueldoT200;
        values.isss = isss160 + isss200;
        values.afp = afp160 + afp200;
        values.renta = renta160 + renta200;
        values.sueldoN = sueldoN160 + sueldoN200;
    };

    //Calcula los pagos cuando horas <= 250
    const doscientosCincuenta = (horas) => {

         //Para 160 horas
        let sueldoT160 = parseFloat((160 * 9.75).toFixed(2));
        let isss160 = parseFloat((sueldoT160 * 0.0525).toFixed(2));
        let afp160 = parseFloat((sueldoT160 * 0.0688).toFixed(2));
        let renta160 = parseFloat((sueldoT160 * 0.1).toFixed(2));
        let sueldoN160 = parseFloat((sueldoT160 - isss160 - afp160 - renta160).toFixed(2));

        //Para las horas extra después de las 161
        let sueldoT200 = parseFloat((horas * 11.50).toFixed(2));
        let isss200 = parseFloat((sueldoT200 * 0.0525).toFixed(2));
        let afp200 = parseFloat((sueldoT200 * 0.0688).toFixed(2));
        let renta200 = parseFloat((sueldoT200 * 0.1).toFixed(2));
        let sueldoN200 = parseFloat((sueldoT200 - isss200 - afp200 - renta200).toFixed(2));

        //Para las horas extra despues de las 201
        let sueldoT250 = parseFloat((horas * 12.50).toFixed(2));
        let isss250 = parseFloat((sueldoT250 * 0.0525).toFixed(2));
        let afp250 = parseFloat((sueldoT250 * 0.0688).toFixed(2));
        let renta250 = parseFloat((sueldoT250 * 0.1).toFixed(2));
        let sueldoN250 = parseFloat((sueldoT250 - isss250 - afp250 - renta250).toFixed(2));

        //Suma de los 3 pagos
        values.sueldoT = sueldoT160 + sueldoT200 + sueldoT250;
        values.isss = isss160 + isss200 + isss250;
        values.afp = afp160 + afp200 + afp250;
        values.renta = renta160 + renta200 + renta250;
        values.sueldoN = sueldoN160 + sueldoN200 + sueldoN250;
    };

    return (  
<>
    {/* Contiene al formulario */}
    <div className="container-fluid mb-4">
        <div className="container-fluid pt-2 pb-3 mb-3">
            <div className="container border border-primary rounded pt-2 pb-3">
                <form onSubmit={handleSubmit}>
                    <label className="ml-4 mt-2 mb-1"><h1> <span><FontAwesomeIcon icon={faUserCircle} /></span> Empleados</h1></label>
                    <hr/>
                    {/* Contiene los input */}
                    <div className="container">
                        <div className="form-group">
                            <label><span><FontAwesomeIcon icon={faUser} /></span> Nombre</label>
                            <input type="text" className="form-control" placeholder="Ingrese nombre" 
                            value={values.nombre} name="nombre" onChange={handleInputChange}/>
                        </div>

                        <div className="form-group">
                            <label><span><FontAwesomeIcon icon={faUser} /></span> Apellido</label>
                            <input type="text" value={values.apellido} name="apellido" placeholder="Ingrese apellido" 
                            className="form-control" onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label><span><FontAwesomeIcon icon={faHourglass} /></span> Horas</label>
                            <input type="number" pattern="^[0-9]{0,12}" value={values.horas} name="horas" placeholder="Ingrese horas trabajadas" 
                            className="form-control" onChange={handleInputChange}/>
                        </div>
                    </div>
                    {/* Contiene el boton */}
                    <div className="container mt-4 mb-2">
                        <button className="btn btn-outline-primary btn-block">
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