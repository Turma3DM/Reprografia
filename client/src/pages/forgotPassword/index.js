import React, { useState } from 'react';
import { useHistory } from "react-router";
import LoginContainer from '../../components/loginContainer';
import '../../styles/forgotPassword.scss';
import axios from "axios";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [mensagem, setMensagem] = useState("Um link será enviado ao seu e-mail para a recuperação de senha")

  const [enviado, setEnviado] = useState();

  const history = useHistory();

  const ForgotPasswordPost = () => {
    if (email === '') {
      setMensagem("Insira um email!")
    }

    else {
      const data = { mail: email };
      axios.post(`${process.env.REACT_APP_REPROGRAFIA_URL}/forgotPassword`, data).then((response) => {
        setEnviado(true)
        setMensagem(`Se esse email pertencer a alguma conta, será enviado um email de recuperação para: ${email}`)
      });
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    ForgotPasswordPost();
  }

  return (
    <div className="content">
      <LoginContainer />
      <div className="container-login">
        <h2 id="h2" className="fp-subTitle">Insira o seu e-mail</h2>

        <form onSubmit={onSubmit}>
          <input
            id="email"
            type="email"
            className="email-input-box"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
            required
          />
          {enviado ? <button id="forgot-password-button" className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            : <> <input
              type="submit"
              id="forgot-password-button"
              className="fp-button"
              name="forgot-password-button"
              onClick={ForgotPasswordPost}
              value="Enviar"
            />
              <button className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            </>
          }
        </form>
        <h4>{mensagem}</h4>
      </div>
    </div>
  );
}