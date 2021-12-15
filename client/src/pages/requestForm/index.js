import React, { useState, useEffect } from "react";

import Menu from '../../components/hamburgerButton';
import Header from '../../components/header';
import SideBar from '../../components/formSideBar';
import "../../styles/requestForm.scss";

import { useHistory } from "react-router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPrint } from "react-icons/fa";
import { Button, Card, Form } from "react-bootstrap";
import Loading from "../../components/loading";
import axios from "axios";
import Swal from 'sweetalert2';

function RequestForm(props) {

  var [loading, setLoading] = useState(Loading);

  const [course, setCourse] = useState(0);

  const [message, setMessage] = useState("");

  var history = useHistory();

  var curso;

  if (course === "1") {
    curso = 1;
  } else if (course === "2") {
    curso = 2;
  } else if (course === "3") {
    curso = 3;
  } else if (course === "4") {
    curso = 4;
  }

  const [cc, setCc] = useState("");

  var centro_custos;

  if (cc === "1") {
    centro_custos = 1;
  } else if (cc === "2") {
    centro_custos = 2;
  } else if (cc === "3") {
    centro_custos = 3;
  } else if (cc === "4") {
    centro_custos = 4;
  } else if (cc === "5") {
    centro_custos = 5;
  } else if (cc === "6") {
    centro_custos = 6;
  } else if (cc === "7") {
    centro_custos = 7;
  } else if (cc === "8") {
    centro_custos = 8;
  }

  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [copy, setCopy] = useState("");

  const [typeSend, setTypeSend] = useState(0);
  const [observacao, setObservacao] = useState("");

  var modo_envio;
  var observacao_envio;

  if (typeSend === "1") {
    modo_envio = 1;
    observacao_envio = "";
  } else if (typeSend === "2") {
    modo_envio = 2;
    observacao_envio = observacao;
  }

  const [pdfFile, setPdfFile] = useState({
    raw: "",
  });
  const [pdfFileError] = useState("");

  const handleChange = (e) => {
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
    if (e.target.files.length) {
      setPdfFile({
        raw: e.target.files[0],
      });
      Toast.fire({
        icon: 'success',
        title: `Anexado com sucesso!`
      })
    }
  };

  const FormPost = () => {
    const formData = new FormData();

    formData.append("file", pdfFile.raw);
    formData.append("curso", curso);
    formData.append("centro_custos", centro_custos);

    formData.append("servicoCT", servicoCT);
    formData.append("servicoCA", servicoCA);

    formData.append("titulo_pedido", title);
    formData.append("num_paginas", pages);
    formData.append("num_copias", copy);

    formData.append("modo_envio", modo_envio);
    formData.append("observacoes", observacao_envio);


    if (centro_custos === undefined) {
      setMessage("Por favor selecione um centro de custos!")
    }
    else if (curso === undefined) {
      setMessage("Por favor selecione um curso!")
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
      axios
        .post(`${process.env.REACT_APP_REPROGRAFIA_URL}/request`, formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((result) => {
          setMessage(result.data.message);
          if (result.data.status !== "error") {
            Toast.fire({
              icon: 'success',
              title: result.data.message
            })
            history.push("/myRequests");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    FormPost();
  };

  var total = pages * copy;

  const [step, setStep] = useState(1);

  const [servicos, setServicos] = useState({
    servicosCA: [],
    servicosCT: [],
  });

  const [centroCustos, setCentroCustos] = useState({
    list: [],
    status: false
  });
  const [cursos, setCursos] = useState({
    list: [],
    status: false
  });

  var [servicoCA, setServicoCA] = useState();
  var [servicoCT, setServicoCT] = useState();
  var [messageServ, setMessageServ] = useState("");

  useEffect(() => {
    onLoad();
    return () => {
      setServicos({});
    };
  }, []);

  const formulario = () => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/centroCustos/enabled=1`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status !== "error") {
          setCentroCustos({
            list: result.data,
            status: true
          })
        }
      })
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/cursos/enabled=1`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status !== "error") {
          setCursos({
            list: result.data,
            status: true
          })
        }
      })
  }

  const onLoad = async () => {
    setLoading(true)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_REPROGRAFIA_URL}/services/enabled=1`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      await formulario();
      const response = await axios(config);
      if (response) {
        if (
          response.data.servicosCA === undefined &&
          response.data.servicosCT === undefined
        ) {
          setMessageServ(response.data.message);
        }

        else {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
          });
        }
        setLoading(false)
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <Menu admin={props.admin} />
          <Header nif={props.nif} />
          <SideBar image={props.image} name={props.name} admin={props.admin} requestForm={true} nif={props.nif} />
          <>
            <Form onSubmit={onSubmit}>
              <div className="containerForm">
                <div className="title-repro">
                  <h1>Solicitação de reprografia</h1>
                </div>
                <div className="containerWrapper">
                  <section className="card-wrapper">
                    {step === 1 && (
                      <Card className="card">
                        <Card.Title className="cardTitle">Curso</Card.Title>
                        <div className="radio-container">
                          <div className="radioName">
                            {cursos.status ? <>
                              {cursos.list.map((data) => (
                                <>
                                  <div className="container-curso">
                                    <div className="inputCurso">
                                      <Form.Check
                                        className="classRadio"
                                        type="radio"
                                        name="course"
                                        id="curso"
                                        value={data.id_curso}
                                        checked={course === `${data.id_curso}`}
                                        onChange={(e) => {
                                          setCourse(e.target.value);
                                        }}
                                        required
                                      />
                                      <Form.Check.Label htmlFor="courses" className="radio-label">
                                        {data.descricao}
                                      </Form.Check.Label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </> : <></>}
                          </div>
                        </div>
                        <Card.Title
                          className="cardTitle-CC"
                          id="centro_custos"
                          htmlFor="cost"
                        >
                          Centro de custos
                        </Card.Title>
                        <div className="select-container">
                          <Form.Select
                            className="select"
                            id="cc"
                            name="cc"
                            onChange={(e) => {
                              setCc(e.target.value);
                            }}
                            required
                          >
                            <option
                              value="0"
                              name="null"
                              id="null"
                              defaultValue={cc === "0"}
                            >
                              Nenhuma Opção Selecionada
                            </option>
                            {centroCustos.status ? <>
                              {centroCustos.list.map((data) => (
                                <>
                                  <option
                                    value={data.id_centro_custos}
                                    name="AIP"
                                    id="AIP"
                                    selected={cc === `${data.id_centro_custos}`}
                                  >
                                    {data.descricao}
                                  </option>
                                </>
                              ))}
                            </> : <></>}

                          </Form.Select>
                        </div>
                        <Button
                          className="step-btn"
                          onClick={() => {
                            setStep(2);
                          }}
                        >
                          Próximo
                        </Button>
                      </Card>
                    )}
                    {step === 2 && (
                      <Card className="card">
                        <Card.Title className="cardTitle">Item</Card.Title>
                        <label className="label" htmlFor="title">
                          Titulo
                        </label>
                        <input
                          className="input-minor"
                          type="text"
                          name="title"
                          id=""
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          required
                        />
                        <label className="label" htmlFor="page-request">
                          Número de Páginas
                        </label>
                        <input
                          type="number"
                          name="pages"
                          id="pages"
                          value={pages}
                          onChange={(e) => {
                            setPages(e.target.value);
                          }}
                          required
                        />
                        <label className="label" htmlFor="copy">
                          Número de Cópias
                        </label>
                        <input
                          type="number"
                          name="copy"
                          id="copy"
                          value={copy}
                          onChange={(e) => {
                            setCopy(e.target.value);
                          }}
                          required
                        />
                        <label className="label" htmlFor="total">
                          Total de Paginas
                        </label>
                        <span className="total-pages" name="total">
                          {total}
                        </span>
                        <Button
                          className="step-btn"
                          onClick={() => {
                            setStep(3);
                          }}
                        >
                          Próximo
                        </Button>
                        <Button
                          className="step-btn-back"
                          onClick={() => {
                            setStep(1);
                          }}
                        >
                          Anterior
                        </Button>
                      </Card>
                    )}

                    {step === 3 && (
                      <div className="card medium">
                        <Card.Title className="cardTitle">Formato e Cor</Card.Title>
                        {messageServ !== "" ? (
                          <>{messageServ}</>
                        ) : (
                          <>
                            {servicos.servicosCT.map((data) => (
                              <React.Fragment key={data.id_servico}>
                                <div className="radioName">
                                  <Form.Check
                                    className="check classRadio"
                                    type="radio"
                                    name="typePaper"
                                    id="a3pb"
                                    value={data.id_servico}
                                    checked={servicoCT === `${data.id_servico}`}
                                    onChange={(e) => {
                                      setServicoCT(e.target.value);
                                    }}
                                    required
                                  />
                                  <label className="labelName-CT" htmlFor="typePaper">
                                    {data.descricao}
                                  </label>
                                </div>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                        <Button
                          className="step-btn"
                          onClick={(e) => {
                            setStep(4);
                          }}
                        >
                          Próximo
                        </Button>
                        <Button
                          className="step-btn-back"
                          onClick={(e) => {
                            setStep(2);
                          }}
                        >
                          Anterior
                        </Button>
                      </div>
                    )}
                    {step === 4 && (
                      <Card className="card medium">
                        <Card.Title className="cardTitle">
                          Tipos de Capa e Encadernação
                        </Card.Title>
                        {messageServ !== "" ? (
                          <>{messageServ}</>
                        ) : (
                          <>
                            {servicos.servicosCA.map((data) => (
                              <React.Fragment key={data.id_servico}>
                                <div className="radioName">
                                  <Form.Check
                                    className="check classRadio"
                                    type="radio"
                                    name="typePaper"
                                    id="a3pb"
                                    value={data.id_servico}
                                    checked={servicoCA === `${data.id_servico}`}
                                    onChange={(e) => {
                                      setServicoCA(e.target.value);
                                    }}
                                    required
                                  />
                                  <label className="labelName-CA" htmlFor="typePaper">
                                    {data.descricao}
                                  </label>
                                </div>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                        <Button
                          className="step-btn"
                          onClick={() => {
                            setStep(5);
                          }}
                        >
                          Próximo
                        </Button>
                        <Button
                          className="step-btn-back"
                          onClick={() => {
                            setStep(3);
                          }}
                        >
                          Anterior
                        </Button>
                      </Card>
                    )}
                    {step === 5 && (
                      <div className="card">
                        <Card.Title className="cardTitle">Modo de envio</Card.Title>
                        <div className="radioName-Send">
                          <Form.Check
                            type="radio"
                            name="typeSend"
                            id="digital"
                            checked={typeSend === "1"}
                            value="1"
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setTypeSend(newValue);
                            }}
                            required
                          />
                          <label className="labelName-Send" htmlFor="type-paper">
                            Envio digital
                          </label>
                        </div>
                        <div className="radioName-Send">
                          <Form.Check
                            className="classRadio"
                            type="radio"
                            name="typeSend"
                            id="presencial"
                            checked={typeSend === "2"}
                            value="2"
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setTypeSend(newValue);
                            }}
                            required
                          />
                          <label className="labelName-Send" htmlFor="typePaper">
                            Envio presencial
                          </label>
                        </div>
                        {typeSend === "2" && (
                          <Form.Control
                            className="sendTextInput"
                            as="textarea"
                            id="observacoes"
                            name="observacoes"
                            placeholder="observações"
                            value={observacao}
                            onChange={(e) => {
                              setObservacao(e.target.value);
                            }}
                            required
                          />
                        )}
                        <div className="contentButton">
                          <div className="bootstrap-buttons">
                            <Button
                              className="functionButton"
                              onClick={() => {
                                setStep(4);
                              }}
                            >
                              Anterior
                            </Button>
                            {typeSend === "1" && (
                              <label className="upload-form">
                                <input
                                  type="file"
                                  name="pdfFile"
                                  onChange={handleChange}
                                  accept="application/pdf"
                                  required
                                />
                                <FaCloudUploadAlt />
                                Upload PDF
                              </label>
                            )}

                            {pdfFileError && (
                              <div className="error-msg">{pdfFileError}</div>
                            )}

                            <Button className="functionButton" type="submit">
                              Solicitar <FaPrint />
                            </Button>
                          </div>
                        </div>
                        {message}
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </Form>
          </>
        </>}
    </>
  );
}
export default RequestForm;