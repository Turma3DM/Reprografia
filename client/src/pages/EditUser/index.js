import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { Form } from 'react-bootstrap';
import ProfileContainer from "../../components/profileContainer";
import Loading from "../../components/loading";
import "../../styles/editUser.scss";
import Swal from 'sweetalert2';

function EditUser() {

  const { nif } = useParams();

  const [myNif, setMyNif] = useState();

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [adminUser, setAdminUser] = useState({
    list: []
  });

  const [senhaUser, setSenhaUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("0");

  const [admin, setAdmin] = useState("");

  const [mensagem, setMensagem] = useState("");

  const [deptoSelect, setDeptoSelect] = useState();
  const [messageStatus, setMessageStatus] = useState();
  const [message, setMessage] = useState();

  var id_depto = deptoUser;

  if (deptoUser === "1") {
    id_depto = "Aprendizagem Industrial Presencial";
  } else if (deptoUser === "2") {
    id_depto = "Técnico de Nível Médio Presencial";
  } else if (deptoUser === "3") {
    id_depto = "Graduação Tecnológica Presencial";
  } else if (deptoUser === "4") {
    id_depto = "Pós-Graduação Presencial";
  } else if (deptoUser === "5") {
    id_depto = "Extensão Presencial";
  } else if (deptoUser === "6") {
    id_depto = "Iniciação Profissional Presencial";
  } else if (deptoUser === "7") {
    id_depto = "Qualificação Profissional Presencial";
  } else if (deptoUser === "8") {
    id_depto = "Aperfeiç./Especializ. Profis. Presencial";
  }

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
    var departamento;

    if (deptoUser === "0") {
      departamento = "0";
    } else if (deptoUser === "1") {
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

    if (departamento === undefined) {
      departamento = "0"
    }

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    if (senhaUser !== "") {
      formData.append("senha", senhaUser);
    }
    if (cfpUser !== "") {
      formData.append("cfp", cfpUser);
    }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }
    if (deptoUser !== "") {
      formData.append("depto", departamento);
    }
    if (admin !== "") {
      formData.append("admin", admin);
    }

    axios
      .put(`${process.env.REACT_APP_REPROGRAFIA_URL}/user/` + nif, formData, {
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
          history.push("/management");
        }
      });
  };
  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/user/` + nif, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (!result.data.error && result.data.status !== "error") {
          setAdminUser({
            list: result.data.roles
          });
          setNameUser(result.data.nome);
          setEmailUser(result.data.email);
          setCfpUser(result.data.cfp);
          setTelefoneUser(result.data.telefone);
          setDeptoUser(result.data.id_depto);
          setImage({ preview: `${process.env.REACT_APP_REPROGRAFIA_URL}/` + result.data.imagem });

        }
      });
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setMyNif(result.data.nif)
      })
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
  }, [nif]);



  return (
    <div className="content">
      {loading ? <> <Loading /> </> :
        <>
          <ProfileContainer
            title={"Exemplo do perfil do usuário com nif: " + nif}
            image={image.preview}
            name={nameUser}
            nif={nif}
            newUser={true}
          />
          <div className="container-editUser">
            <h2 className="ui-subTitleEDIT">Informações pessoais</h2>
            <h3 className="input-title">NOME</h3>
            <form onSubmit={handleUpload}>
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
              <h3 className="input-title">SENHA</h3>
              <input
                className="input-box"
                name="senhaUser"
                type="password"
                placeholder="Insira a Nova Senha"
                onChange={(e) => {
                  setSenhaUser(e.target.value);
                }}
              />
              <h3 className="input-title">CFP</h3>
              <input
                className="input-box"
                name="cfpUser"
                type="text"
                placeholder={cfpUser}
                onChange={(e) => {
                  setCfpUser(e.target.value);
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
                  className="input-box"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <FaCloudUploadAlt className="uploud" />
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
                    defaultValue={deptoUser === "0"}
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
              {`${nif}` !== `${myNif}` && `${nif}` !== "1" ? <>
                {adminUser.list.map((data) => (
                  <React.Fragment key={null}>
                    {data.descricao === "user" ?
                      <>
                        <Form.Check
                          className="radioOpcoes"
                          type="radio"
                          name="admin"
                          id="admin"
                          checked={admin === "1"}
                          onChange={() => {
                            setAdmin("1")
                          }}
                        />
                        <h2 className="opcoes">Alterar para usuário administrador?</h2>
                      </>
                      :
                      <>
                        <Form.Check
                          className="radioOpcoes"
                          type="radio"
                          name="admin"
                          id="admin2"
                          checked={admin === "0"}
                          onChange={() => {
                            setAdmin("0")
                          }}
                        />
                        <h2 className="opcoes">Alterar para usuário comum?</h2>
                      </>
                    }
                  </React.Fragment>
                ))}
              </> : <> </>}

              <h4 className="mensagem-edit">{mensagem}</h4>
              <input
                type="submit"
                className="nu-send-button"
                id="btn"
                value="Enviar"
              />
            </form>
            <button
              className="btn-goBack"
              onClick={() => history.goBack()}
            >
              Voltar
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default EditUser;