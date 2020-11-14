import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "@reach/router";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faReply, faUser } from "@fortawesome/free-solid-svg-icons";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  //const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
        toast("Correo de recuperación enviado exitosamente",{type: "success"});
        setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
      })
      .catch(() => {
        toast("Por favor revisar correo", {type: "error"});
      });
  };
  return (
    <div className="container-fluid">
      <div className="container-fluid pt-2 pb-3 mb-3">
        <div className="container border border-primary rounded pt-2 pb-3">
          
          <label className="ml-4 mt-1 mb-1"><h1><span><FontAwesomeIcon icon={faLock} /></span> Recuperar contraseña</h1></label>
          <hr/>

            <form action="">
              {/* Contiene el input */}
              <div className="container pb-2">
                <label htmlFor="userEmail"><span><FontAwesomeIcon icon={faUser} /></span> Correo</label>
                <div className="form-group">
                  <input type="email" className="form-control"
                    name="userEmail"
                    id="userEmail"
                    value={email}
                    placeholder="Ingresar Correo"
                    onChange={(event) => onChangeHandler(event)} />
                </div>
              </div>
              {/* Contiene el botón */}
              <div className="container">
                <button className="btn btn-block btn-success" onClick={event => { sendResetEmail(event); }}> 
                  Enviar correo de recuperación
                </button>
              </div>
            </form>
            {/* Contiene el enlace */}
            <div className="container mt-3 pt-2 pb-2">
              <Link to="/">
                Regresar <FontAwesomeIcon icon={faReply} />
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;