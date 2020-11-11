import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../firebase";
import { toast } from 'react-toastify';
import { signInWithGoogle } from "../firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEnvelope, faLock, faLockOpen, faReply, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event) => {

    event.preventDefault(); // POST , GET , PHP, JAVA , ASP, ETC

    setError("");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
      toast("Usuario creado exitosamente", {type: "success"});
    }
    catch (error) {
      // setError('Error , Por favor intentar de nuevo : ' + error);
      toast("Por favor intenta nuevamente " + error ,{type: "error"});
      // toast("Por favor revisar credenciales", {
      //   type: "error",
      //   //autoClose: 2000
      // });
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid pt-2 pb-3 mb-3">
        <div className="container border border-primary rounded pt-2 pb-3">
          <form className="">
            <label className="ml-4"><h1><span><FontAwesomeIcon icon={faUserCircle} /></span> Crear cuenta</h1></label>
            
            {/* Contiene los input */}
            <div className="container">
            <label htmlFor="displayName"><span><FontAwesomeIcon icon={faUser} /></span> Nombre</label>
            <div className="form-group">            
              <input type="text" className="form-control"
                name="displayName"
                placeholder="Ingresar Nombre"
                onChange={(event) => onChangeHandler(event)} />
            </div>         

            <label htmlFor="userEmail"><span><FontAwesomeIcon icon={faEnvelope} /></span> Correo</label>
            <div className="form-group">            
              <input type="email" className="form-control"
                name="userEmail"
                id="userEmail"
                value={email}
                placeholder="Ingresar Correo"
                onChange={(event) => onChangeHandler(event)} />
            </div>      

            <label htmlFor="userPassword"><span><FontAwesomeIcon icon={faLock} /></span> Contraseña</label>
            <div className="form-group pb-2">            
              <input type="password" className="form-control"
                name="userPassword"
                id="userEmail"
                value={password}
                placeholder="Ingresar Contraseña"
                onChange={(event) => onChangeHandler(event)} />
            </div> 
            </div> 
          </form>

          {/* Contiene los botones */}
          <div className="container pt-2">
            <button className="btn btn-success btn-block" 
              onClick={event => {
                createUserWithEmailAndPasswordHandler(event);}}>
              Guardar <FontAwesomeIcon icon={faAddressBook} /> 
            </button>

            <div className="container-fluid text-center pt-2">
            <label>O</label>
            </div>

            <button className="btn btn-info btn-block  mt-2 mb-2"
              onClick={() => { signInWithGoogle(); }} > 
              Ingresar con Google <FontAwesomeIcon icon={faGoogle} />
            </button>
          </div>
          
            {" "}
          {/* Contiene los enlaces */}
          <div className="container mt-3 pt-2 pb-2">
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              ¿Ya posees una cuenta?
            </Link>{" "} <FontAwesomeIcon icon={faReply} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
