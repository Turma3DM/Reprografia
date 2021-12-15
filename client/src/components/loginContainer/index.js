import React from 'react';
import './styles.scss';

const LoginContainer = () => {
    return (
        <>
            <div className="left-container-login" >
                <div className="icon-container" >
                    <img className="iconImg" src="../../assets/img/repo.png" alt="Ícone de uma impressora" title="icon" />
                </div>
                <h2 className="subTitle">Sistema Reprográfico</h2>
                <img className="senaiLogo" src="../../assets/img/logo.jpg" alt="Logo do SENAI" title="logo" />
            </div>
        </>
    );
}

export default LoginContainer;
