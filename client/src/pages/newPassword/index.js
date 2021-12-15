import React, { useState, useEffect } from 'react';
import '../../styles/newPassword.scss';
import { useLocation, useHistory } from 'react-router-dom'
import axios from "axios";
import queryString from 'query-string'

import LoginContainer from '../../components/loginContainer';
import Swal from 'sweetalert2';

export default function NewPassword() {

  const pathName = useLocation().search;

  const [senhaInput, setSenhaInput] = useState("");
  const [senhaInput2, setSenhaInput2] = useState("");

  const [values, setValues] = useState({
    token: "",
    email: ""
  })

  const [enviado, setEnviado] = useState();

  const [mensagem, setMensagem] = useState("")

  const history = useHistory();

  function NewPasswordPost() {
    if (senhaInput !== senhaInput2) {
      setMensagem(`As senhas inseridas não coincidem!`)
    }
    else {
      const data = { senha: senhaInput, senha2: senhaInput2, token: values.token, email: values.email };
      axios.post(`${process.env.REACT_APP_REPROGRAFIA_URL}/resetPassword`, data).then((result) => {
        setMensagem(result.data.message)
        if(result.data.status !== "error"){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: result.data.message
          })
          history.push("/");
        }
        setEnviado(true)
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    NewPasswordPost();
  }

  useEffect(() => {
    const values = queryString.parse(pathName)

    setValues({
      token: values.token,
      email: values.email
    })
  },
    [pathName]);

  return (
    <div className="content">
      <LoginContainer />
      <div className="container-login">
        <h2 id="h2" className="np-subTitle">Digite a sua nova senha</h2>

        <form onSubmit={onSubmit}>
          <input
            id="new-senha"
            className="password-input-box"
            type="password"
            name="password1"
            onChange={(e) => {
              setSenhaInput(e.target.value);
            }}
            placeholder="Senha"
            required
          />
          <input
            id="new-senha2"
            className="password-input-box"
            type="password"
            name="password2"
            onChange={(e) => {
              setSenhaInput2(e.target.value);
            }}
            placeholder="Senha"
            required
          />

          <div className="link-box">
          </div>
          {enviado ?
            <>
              <button id="forgot-password-button" className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            </>
            :
            <>
              <input
                id="new-password-button"
                className="np-button"
                name="new-password-button"
                type="submit"
                value="Enviar" />
            </>
          }
          <h4>{mensagem}</h4>

        </form>

      </div>
    </div>
  );
}