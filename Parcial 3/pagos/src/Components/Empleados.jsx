import React, { useContext, useEffect, useState } from "react";
import EmpleadosForm from "./EmpleadosForm";

import SignIn from "./SignIn";

import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { UserContext } from "../providers/UserProvider";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Router } from "@reach/router";
import { faEdit, faList, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Empleados = () => {
    // Asigna un user para leer el contexto del tema actual.
    // React encontrará el Provider superior más cercano y usará su valor.
    const user = useContext(UserContext);

    const { photoURL, displayName, email } = user;
    console.log(" Usuario ProfilePage : " + displayName + " - " + email);

    const signOut = () => {
    //Notificación de inicio de sesión
        toast("Sesión cerrada", {
        type: "error",
        });
    
        <SignIn path="/"/>
        auth.signOut();
    }

    const [Empleados, setEmpleados] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const getEmpleados = async () => {
        db.collection("Empleados").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
            });
            setEmpleados(docs);
        });
    };

    const onDeleteEmpleado = async (id) => {
        if (window.confirm("¿Seguro que desea eliminar a este empleado?")) {
            await db.collection("Empleados").doc(id).delete();
            toast("Se elimino un Empleado", {type: "error"});
        }
    };

    useEffect(() => {
        getEmpleados();
    }, []);

    const addOrEditEmpleado = async (EmpleadoObject) => {
        try {
            if (currentId === "") {
                await db.collection("Empleados").doc().set(EmpleadoObject);
                toast("Se agrego un empleado", {type: "success"});
            } else {
                await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
                toast("Se actualizo un empleado", {type: "info"});
                setCurrentId("");
            }
        } catch (error) {
            toast("Error " + error, {type: "error"});
        }
    };

    //

    return (
    <>    
    {/* <nav className="navbar navbar-expand navbar-light bg-light p-1"> 
        <div className="container border">
        <div className="container border">
            <ul className ="navbar-nav mr-auto">
                <li> <label className="col col-md-5 ml-3"> {displayName}</label> </li>
                <li> <label className="col col-md-5"> {email}</label> </li>
            </ul>
        </div>
        </div>
        <div className="position-fixed" >
        <Link to="/">
        <button className="btn btn-danger" onClick={() => { signOut(); }}>
              Sign out
            </button>
            </Link>
        </div>
    </nav> */}
    <div className="position-fixed pl-3 pt-3" >
        <Link to="/">
        <button className="btn btn-danger" onClick={() => { signOut(); }}>
              Sign out
            </button>
            </Link>
        </div>
    <Router>
        <EmpleadosForm exact path="EmpleadosForm"/>
    </Router>
    <div className="container" id="empleado">
        <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
    </div>

    <hr/>
    <div className="container mt-5 ">
        <div className ="container border border-primary rounded ">
            <h2 className="text-center pt-3"> <span><FontAwesomeIcon icon={faList} /></span> Lista empleados</h2>
            <table className ="table table-hover mb-5">
                <thead>
                    <tr className="text-center table-dark">
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Horas</th>
                        <th>ISSS</th>
                        <th>AFP</th>
                        <th>Renta</th>
                        <th>Total</th>
                        <th>Neto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Empleados.map((Empleado) => (
                        <tr className="text-center table-primary" key={Empleado.id}>
                            <td>{Empleado.nombre}</td>
                            <td>{Empleado.apellido}</td>
                            <td>{Empleado.horas} h</td>
                            <td>${Empleado.isss}</td>
                            <td>${Empleado.afp}</td>
                            <td>${Empleado.renta}</td>
                            <td>${Empleado.sueldoT}</td>
                            <td>${Empleado.sueldoN}</td>
                            <td>
                                <a href="#empleado">
                                    <button className="btn btn-outline-primary" 
                                    onClick={() => setCurrentId(Empleado.id)}>Edit <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                </a>
                                <button className="btn btn-outline-danger" 
                                onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar <FontAwesomeIcon icon={faTrashAlt}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    </div>
    </>
    );
};

export default Empleados;
