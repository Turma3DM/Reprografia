import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../styles/newUser.scss";
import { Form } from 'react-bootstrap';
import ProfileContainer from "../../components/profileContainer";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loading from "../../components/loading";
import Swal from 'sweetalert2'

function NewUser(props) {

  var history = useHistory();


  const [nameUser, setNameUser] = useState("Nome do usuário");

  const [emailUser, setEmailUser] = useState("");

  const [nifUser, setNifUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [admin, setAdmin] = useState(0);

  const [mensagem, setMensagem] = useState("");

  var departamento;

  if (deptoUser === "1") {
    departamento = 1;
  } else if (deptoUser === "2") {
    departamento = 2;
  } else if (deptoUser === "3") {
    departamento = 3;
  } else if (deptoUser === "4") {
    departamento = 4;
  } else if (deptoUser === "5") {
    departamento = 5;
  } else if (deptoUser === "6") {
    departamento = 6;
  } else if (deptoUser === "7") {
    departamento = 7;
  } else if (deptoUser === "8") {
    departamento = 8;
  }

  const [image, setImage] = useState({
    raw: "",
    preview: `${process.env.REACT_APP_REPROGRAFIA_URL}/src/uploads/user-img/default/usuario.png`,
  });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image.raw);
    formData.append("nome", nameUser);
    formData.append("email", emailUser);
    formData.append("nif", nifUser);
    formData.append("cfp", cfpUser);
    formData.append("telefone", telefoneUser);
    formData.append("depto", departamento);
    formData.append("admin", admin);

    if (departamento === undefined || departamento === 0) {
      setMensagem("Por favor selecione um departamento!");
    } else {
      axios
        .post(`${process.env.REACT_APP_REPROGRAFIA_URL}/newUser`, formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((result) => {
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
            history.push("/management");
          }
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  const [deptoSelect, setDeptoSelect] = useState();
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(false);
  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/deptos/enabled=1`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status !== "error") {
          setDeptoSelect(result.data);
        }
        else {
          setMessage(result.data.message)
          setMessageStatus(true)
        }
        setLoading(false);
      })
  }, [])

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <div className="content">
            <ProfileContainer
              newUser={true}
              title="Exemplo do perfil do usuário"
              image={image.preview}
              name={nameUser}
              requestsNoInfo={true}
              nif={props.nif}
            />
            <div className="container-newUser">
              <h2 id="h2" className="nu-subTitle">
                Criar novo usuário
              </h2>
              <form onSubmit={onSubmit}>
                <h4>Onde houver "*" o preenchimento é obrigatório</h4>
                <label className="important">*
                  <input
                    className="input-boxNEW"
                    name="nameUser"
                    type="text"
                    placeholder="Nome"
                    required
                    onChange={(e) => {
                      setNameUser(e.target.value);
                    }}
                  />
                </label>
                <label className="important">*
                  <input
                    className="input-boxNEW"
                    name="emailUser"
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => {
                      setEmailUser(e.target.value);
                    }}
                  />
                </label>
                <label className="important">*
                  <input
                    className="input-boxNEW"
                    name="nifUser"
                    type="text"
                    placeholder="NIF"
                    required
                    onChange={(e) => {
                      setNifUser(e.target.value);
                    }}
                  />
                </label>
                <label className="important">*
                  <input
                    className="input-boxNEW"
                    name="cfpUser"
                    type="text"
                    placeholder="CFP"
                    required
                    onChange={(e) => {
                      setCfpUser(e.target.value);
                    }}
                  />
                </label>
                <label>
                  <input
                    className="input-boxNEW"
                    name="telefoneUser"
                    type="text"
                    placeholder="Telefone"
                    re
                    onChange={(e) => {
                      setTelefoneUser(e.target.value);
                    }}
                  />
                </label>
                <div className="radio-typeUser">
                  <Form.Check
                    className="classRadio"
                    type="radio"
                    name="admin"
                    id="admin"
                    checked={admin === 1}
                    value="1"
                    onChange={() => {
                      setAdmin(1);
                    }}
                  ></Form.Check>
                  <Form.Check.Label>
                    Criar como administrador?
                  </Form.Check.Label>
                </div>

                <div className="radio-typeUser">
                  <Form.Check
                    className="classRadio"
                    type="radio"
                    name="user"
                    id="user"
                    checked={admin === 0}
                    value="0"
                    onChange={() => {
                      setAdmin(0);
                    }}
                  ></Form.Check>
                  <Form.Check.Label>
                    Criar como usuário comum?
                  </Form.Check.Label>
                </div>

                <label className="customizeNew">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <FaCloudUploadAlt className="uploudNew" />
                  Upload
                </label>
                <h3 className="input-title">DEPARTAMENTO</h3>
                {messageStatus ? <><h1>{message}</h1></> : <>
                  <Form.Select
                    className="selectNew"
                    id="deptoUser"
                    name="deptoUser"
                    required
                    onChange={(e) => {
                      setDeptoUser(e.target.value);
                    }}
                  >
                    <option
                      value="0"
                      name="null"
                      id="null"
                      defaultValue={departamento === "0"}
                    >
                      Nenhuma Opção Selecionada
                    </option>
                    {deptoSelect.map((data) => (
                      <>
                        <option
                          value={data.id_depto}
                          name="AIP"
                          id="AIP"
                          selected={deptoUser === `${data.id_depto}`}
                        >
                          {data.descricao}
                        </option>
                      </>
                    ))}
                  </Form.Select>
                </>}
                <h4>{mensagem}</h4>
                <div className="btns">
                  <input
                    type="submit"
                    className="nu-send-button"
                    id="btn"
                    value="Enviar"
                  />
                  <button className="btn-back-user" id="btn" onClick={() => history.push("/management")}>
                    Voltar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>}
    </>
  );
}

export default NewUser;