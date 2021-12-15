import React from 'react';
import './styles.scss';

function NewUserContainer () {
    return(
        <div className="left-container" >
            <div className="icon-container" >
            <img className="profile-image" src="../../assets/img/usuario.png" id="profile-image" name="profile-image" alt="imagem de perfil"/>
            </div>
            <h2 className="subTitle">Novo Usuário</h2>
        </div>
    );
}

export default NewUserContainer;