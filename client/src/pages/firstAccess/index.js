import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import LoginContainer from "../../components/loginContainer";
import { FaSignOutAlt } from 'react-icons/fa';
import '../../styles/firstAccess.scss';
import { AuthContext } from "./../../helpers/AuthContext";
import Swal from 'sweetalert2';

function FirstAccess(props) {
    var history = useHistory();

    const [senha, setSenha] = useState('');

    const [confirmSenha, setConfirmSenha] = useState('');

    const [message, setMessage] = useState();

    const { setAuthState } = useContext(AuthContext);

    const atualizarSenha = () => {
        axios.put(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/firstAccess`, { senha: senha, confirmSenha: confirmSenha }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((result) => {
            if (result.data.status === "ok") {
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
                setTimeout(() => {
                    setAuthState({
                        firstAccess: false, admin: props.admin
                    })
                }, 1000);
                setTimeout(() => {
                    history.push(`/requestForm`)
                }, 1200)
            }
            else if (result.data.message === "Esse não é o seu primeiro acesso!") {
                setMessage(result.data.message)
                setTimeout(() => {
                    logout();
                }, 1000);
            }
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        atualizarSenha();
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        history.push('/')
    };

    return (
        <>
            <div className="content">
                <LoginContainer />
                <div className="container-login">
                    <h2 className="title-firstAccess">
                        Insira sua nova senha
                    </h2>
                    <form onSubmit={onSubmit}>
                        <input
                            className="pass-first"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            required
                            onChange={(e) => {
                                setSenha(e.target.value);
                            }}
                        />
                        <input
                            className="pass-first"
                            name="password"
                            type="password"
                            placeholder="Confirmar senha"
                            required
                            onChange={(e) => {
                                setConfirmSenha(e.target.value);
                            }}
                        />
                        <div className="btns">
                            <input
                                className="env-first"
                                type="submit"
                                value="Enviar"
                            />
                        </div>
                    </form>
                    <h4>{message}</h4>
                    <div className="exit-access">
                        <FaSignOutAlt className="exit-firstAccess" onClick={logout} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstAccess;