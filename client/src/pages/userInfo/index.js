import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/userInfo.scss";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import ProfileContainer from "../../components/profileContainer";
import Loading from '../../../src/components/loading';
import Swal from 'sweetalert2';

function UserInfo(props) {
  var { id } = useParams();

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nif, setNif] = useState("");

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [edit, setEdit] = useState(false);

  const [changePass, setChangePass] = useState(false);

  const [pastPassword, setPastPassword] = useState();

  const [newPassword, setNewPassword] = useState();

  const [newPasswordConfirm, setNewPasswordConfirm] = useState();

  const [message, setMessage] = useState();

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const history = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }

    axios
      .put(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser`, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status === "error") {
          setMensagem(result.data.message);
        }
        else {
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
          setEdit(false)
        }
      });
  };

  const passwordPost = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/changePassword`,
        { senhaAntiga: pastPassword, senhaNova: newPassword, confirmSenhaNova: newPasswordConfirm },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((result) => {
        if (result.data.status === "error") {
          setMessage(result.data.message);
        } else {
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
          setChangePass(false);
        }
      });
  };

  var [myNif, setMyNif] = useState();
  var [adm, setAdm] = useState();

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/user/` + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true,
      })
      .then((result) => {
        if (result.data.status !== "error") {
          setNif(result.data.nif);
          setNameUser(result.data.nome);
          setEmailUser(result.data.email);
          setTelefoneUser(result.data.telefone);
          setDeptoUser(result.data.depto);
          setCfpUser(result.data.cfp)
          setImage({ preview: `${process.env.REACT_APP_REPROGRAFIA_URL}/` + result.data.imagem });
          setLoading(false);
        }
      });
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setMyNif(result.data.nif);
        if (props.nif) {
          setMyNif(props.nif);
        }
      });
    setAdm(props.admin);
  }, [props.admin, props.nif, id]);

  return (
    <>
      {loading ? (
        <> <Loading /> </>
      ) : (
        <>
          <div className="content">
            {adm && myNif === nif ? <>
              <ProfileContainer
                image={image.preview}
                name={nameUser}
                nif={nif}
                change={true}
                edit={() => {
                  history.push(`edit/${nif}`)
                }}
                changePassword={() => {
                  setChangePass(true);
                  setEdit(false)
                  setMessage("")
                }}
              />
            </> : <>
              {adm && myNif !== nif ?
                <>
                  <ProfileContainer
                    image={image.preview}
                    name={nameUser}
                    nif={nif}
                    change={false}
                    admin={true}
                    edit={() => {
                      history.push(`edit/${nif}`)
                    }}

                  />
                </> :
                <>
                  {myNif === nif ? (
                    <ProfileContainer
                      image={image.preview}
                      name={nameUser}
                      nif={nif}
                      change={true}
                      edit={() => {
                        setEdit(true);
                        setChangePass(false);
                        setMessage("")
                      }}
                      changePassword={() => {
                        setChangePass(true);
                        setEdit(false)
                        setMessage("")
                      }}
                      editMyUser={true}
                    />
                  ) : (
                    <ProfileContainer
                      image={image.preview}
                      name={nameUser}
                      nif={nif}
                    />
                  )}
                </>}
            </>}

            <div className="container-userInfo">
              {changePass ? (
                <>
                  {" "}
                  <h2 id="h2" className="ui-subTitle">
                    Alterar senha
                  </h2>
                  <form onSubmit={passwordPost}>
                    <div>
                      <h2 id="h2" className="ui-subTitle">
                        Senha antiga
                      </h2>
                      <input
                        required
                        type="password"
                        className="input-box"
                        placeholder="Insira sua senha antiga"
                        onChange={(e) => {
                          setPastPassword(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div>
                      <h2 id="h2" className="ui-subTitle">
                        Nova senha
                      </h2>
                      <input
                        required
                        type="password"
                        className="input-box"
                        placeholder="Insira a nova senha"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div>
                      <h2 id="h2" className="ui-subTitle">
                        Confirmar nova senha
                      </h2>
                      <input
                        required
                        type="password"
                        className="input-box"
                        placeholder="Insira a nova senha"
                        onChange={(e) => {
                          setNewPasswordConfirm(e.target.value);
                        }}
                      ></input>
                    </div>
                    <button className="nu-send-button" type="submit">
                      Enviar
                    </button>
                  </form>
                  <button
                    id="btn-back-change"
                    className="btn-back-user"
                    onClick={() => {
                      setChangePass(false);
                    }}
                  >
                    Voltar
                  </button>
                  <h4>{message}</h4>
                </>
              ) : (
                <>
                  <h2 id="h2" className="ui-subTitle">
                    Informações pessoais
                  </h2>
                  {edit ? (
                    <>
                      {" "}
                      <form onSubmit={handleUpload}>
                        <h3 className="input-title">NOME</h3>
                        <input
                          className="input-box"
                          name="nameUser"
                          type="text"
                          placeholder={nameUser}
                          onChange={(e) => {
                            setNameUser(e.target.value);
                          }}
                        />
                        <h3 className="input-title">EMAIL</h3>
                        <input
                          className="input-box"
                          name="emailUser"
                          type="email"
                          placeholder={emailUser}
                          onChange={(e) => {
                            setEmailUser(e.target.value);
                          }}
                        />
                        <h3 className="input-title">TELEFONE</h3>
                        <input
                          className="input-box"
                          name="telefoneUser"
                          type="text"
                          placeholder={telefoneUser}
                          onChange={(e) => {
                            setTelefoneUser(e.target.value);
                          }}
                        />
                        <h3 className="input-title">IMAGEM</h3>
                        <label className="customize">
                          <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                          />
                          <FaCloudUploadAlt className="uploud" />
                          Upload
                        </label>
                        <h4 className="mensagem-edit">{mensagem}</h4>
                        <input
                          type="submit"
                          className="nu-send-button"
                          id="btn"
                          value="Enviar"
                        />
                      </form>
                      <button
                        className="btn-back-user"
                        id="btn"
                        onClick={() => {
                          setEdit(false);
                          setNameUser(props.name)
                          setImage({ preview: props.image })
                        }}
                      >
                        {" "}
                        Voltar
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="input-title">NIF</h3>
                      <h2 className="userInformation">{nif}</h2>
                      <h3 className="input-title">EMAIL</h3>
                      <h2 className="userInformation">{emailUser}</h2>
                      <h3 className="input-title">TELEFONE</h3>
                      <h2 className="userInformation">{telefoneUser}</h2>
                      <h3 className="input-title">CFP</h3>
                      <h2 className="userInformation">{cfpUser}</h2>
                      <h3 className="input-title">DEPARTAMENTO</h3>
                      <h2 className="userInformation">{deptoUser}</h2>
                      <div className="btns">

                        <button
                          className="btn-back-user"
                          id="btn"
                          onClick={() => { history.goBack() }}
                        >
                          {" "}
                          Voltar
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserInfo;