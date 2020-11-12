import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


//Notificaciones Toastify
import { toast } from "react-toastify";
import SignUp from "./SignUp";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faAddressCard, faFingerprint, faLock, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const signInWithEmailAndPasswordHandler = (event) => {

    event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC

    console.log(" SignIn - signInWithEmailAndPasswordHandler ");
    const user = auth.signInWithEmailAndPassword(email, password).then(() => {
      toast("Sesión iniciada correctamente", {type: "success"});
    }).catch(error => {
        toast("Por favor revisar credenciales " + error, {
          type: "error"
        });
      });
      console.log(" SignIn - signInWithEmailAndPassword ");  
      console.log(" const user :  " + user);  
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid pt-2 pb-3 mb-3">
        <div className="container border border-primary rounded pt-2 pb-3">
          <form>
 
            <label className="ml-4 mt-1 mb-1"><h1> <span><FontAwesomeIcon icon={faUserCircle} /></span> Sign In</h1></label>
            <hr/>

            {/* Contiene los input */}
            <div className="container">
              <div className="form-group pb-1">
              <label><span><FontAwesomeIcon icon={faUser} /></span> Email</label>
                <input type="email" className="form-control"
                  name="userEmail"
                  placeholder="Ingresar correo"
                  onChange={(event) => onChangeHandler(event)} />
              </div>

              <div className="form-group pb-2">
                <label><span><FontAwesomeIcon icon={faLock} /></span> Contraseña</label>
                <input type="password" className="form-control"
                  name="userPassword"
                  placeholder="Ingresar contraseña"
                  onChange={(event) => onChangeHandler(event)} />
              </div>
            </div>
          </form>  
          {/* Contiene los botones */}
          <div className="container pt-2">
            <button type="submit" className="btn btn-success btn-block"
              onClick={(event) => { signInWithEmailAndPasswordHandler(event) }} >
              Ingresar <FontAwesomeIcon icon={faAddressBook} /> 
            </button>
              {" "}
          
            <button className="btn btn-info btn-block  mt-2 mb-2"
              onClick={() => { signInWithGoogle(); }} > 
              Ingresar con Google <FontAwesomeIcon icon={faGoogle} />
            </button>
          </div>

          {/* Contiene los enlaces */}
          <div className="container mt-3 pt-2 pb-2">
            <Link to="signUp" className=" text-blue-500 hover:text-blue-600">
              Crear una cuenta 
            </Link> <FontAwesomeIcon icon={faAddressCard} /> {" "}
            <br />{" "}
            <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
              Contraseña olvidada
            </Link> <FontAwesomeIcon icon={faFingerprint} />
          </div>
        </div>   
      </div>
    </div>
    

  );
};

export default SignIn;
