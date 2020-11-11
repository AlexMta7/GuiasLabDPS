import React, { useContext, useEffect, useState } from "react";
import EmpleadosForm from "./EmpleadosForm";

import SignIn from "./SignIn";

import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { UserContext } from "../providers/UserProvider";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "@reach/router";

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
        if (window.confirm("¿Seguro que desea eliminar a este empelado?")) {
            await db.collection("Empleados").doc(id).delete();
            toast("Se elimino un Empleado", {type: "info"});
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

    return (
    <>    

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-header">
            <label >Usuario <h2> {displayName} </h2></label>
        </div>
        <div class="collapse navbar-collapse">
            <button className="btn btn-danger my-2 my-sm-0" onClick={() => { signOut(); }}>
              <Link to="/">Sign out</Link>
            </button>
        </div>
    </nav>
        <div className="col-md-4 p-2">
            <h2>Agregar Alumnos</h2>
            <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
        </div>

        <div className="col-md-8 p-2">
            <div class="container">
                <h2>Lista Alumnos</h2>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Edad</th>
                            <th>Aciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Empleados.map((Empleado) => (
                            <tr key={Empleado.id}>
                            <td>{Empleado.codigo}</td>
                            <td>{Empleado.nombre}</td>
                            <td>{Empleado.horas}</td>
                            <td>
                                <button className="btn btn-outline-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                                &nbsp;
                                &nbsp;
                                <button className="btn btn-outline-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
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
