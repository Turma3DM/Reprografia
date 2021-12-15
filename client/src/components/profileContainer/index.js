import React, { useState, useEffect } from 'react';
import './styles.scss';
import '../img/profile.scss';
import { useHistory } from 'react-router';
import axios from 'axios';
import Loading from '../../../src/components/loading';

function ProfileContainer(props) {

    const [name, setName] = useState("");
    const [nif, setNif] = useState("");
    const [image, setImage] = useState("");

    var [loading, setLoading] = useState(Loading);

    useEffect(() => {
        if (props.newUser) {
            setImage(`${process.env.REACT_APP_REPROGRAFIA_URL}/src/uploads/user-img/default/usuario.png`)
            setLoading(false)
            if (props.name) {
                setName(props.name)
            }
            if (props.image) {
                setImage(`${props.image}`)
            }

        }
        else if (props.editMyUser) {
            axios
                .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }).then((result) => {
                    setName(result.data.nome)
                    setNif(result.data.nif)
                    setImage(`${process.env.REACT_APP_REPROGRAFIA_URL}/${result.data.imagem}`)
                    if (props.nif) {
                        setNif(props.nif)
                    }
                    if (props.image) {
                        setImage(`${props.image}`)
                    }
                    if (props.name) {
                        setName(props.name)
                    }
                    setLoading(false)
                })
        }
        else {
            setLoading(true)
            axios
                .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }).then((result) => {
                    setName(result.data.nome)
                    setNif(result.data.nif)
                    setImage(`${process.env.REACT_APP_REPROGRAFIA_URL}/${result.data.imagem}`)
                    if (props.nif) {
                        setNif(props.nif)
                    }
                    if (props.image) {
                        setImage(`${props.image}`)
                    }
                    if (props.name) {
                        setName(props.name)
                    }
                    setLoading(false)
                })
        }
    }, [props.nif, props.image, props.name, props.newUser, props.editMyUser])

    var history = useHistory();

    return (
        <>
            {loading ? <Loading /> : <>
                <div className="left-container" >
                    {props.title ? <h2 id="propsTitle">{props.title}</h2> : null}
                    <div className="icon-container" >
                        <div className="profile-div">
                            {props.newUser ?
                                <div className="profile-div">
                                    <img className="profile-image" src={image} id="profile-image" name="profile-image" alt="imagem de perfil" />
                                </div>
                                :
                                <div onClick={() => { history.push(`/user/${nif}`) }} className="profile-div">
                                    <img className="profile-image" src={image} id="profile-image" name="profile-image" alt="imagem de perfil" />
                                </div>
                            }
                        </div>
                    </div>
                    {props.newUser ? <h2 className="subTitle">{name}</h2> : <h2 className="subTitle" onClick={() => { history.push(`/user/${nif}`) }}>{name}</h2>}
                    <div className="profile-links" >
                        {props.change ? <>
                            <button className="button-edit" onClick={props.edit}>
                                Editar Perfil
                            </button>
                            <button className="button-edit" onClick={props.changePassword}>
                                Alterar Senha
                            </button>
                        </> : <>
                            {props.admin ?
                                <>
                                    <button className="button-edit" onClick={props.edit}>
                                        Editar Perfil
                                    </button>
                                </>
                                : <></>}
                        </>
                        }
                    </div>
                </div>
            </>}
        </>
    );
}

export default ProfileContainer;