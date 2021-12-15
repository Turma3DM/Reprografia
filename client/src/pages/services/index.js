import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../../styles/services.scss";
import Header from "../../../src/components/header";
import SideBar from "../../../src/components/formSideBar";
import { Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Menu from "../../components/hamburgerButton";
import Loading from '../../../src/components/loading';

export default function Services(props) {
  var history = useHistory();

  const [servicos, setServicos] = useState({
    servicosCA: [],
    servicosCT: [],
    status: false,
  });

  var [loading, setLoading] = useState(Loading);

  var [ativos, setAtivos] = useState();

  var [semRegistros, setSemRegistros] = useState();


  useEffect(() => {
    onLoad();
    return () => {
      setServicos({});
    };
  }, []);

  const servicosAtivos = (id) => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/services/enabled=` + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (id === 1) {
          setAtivos(true);
        } else {
          setAtivos(false);
        }

        if (response.data.message) {
          setSemRegistros(1);
        } else {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
          });
          setSemRegistros(0);
        }
      });
  };

  const onLoad = async () => {
    setLoading(true);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_REPROGRAFIA_URL}/services/enabled=1`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios(config);
      if (response) {
        if (response.data.message) {
          setSemRegistros(1);
        } else {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
            status: true,
          });
        }
        setAtivos(true);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const enableUser = ({ id, type, enable }) => {
    var atvr = 1;

    if (enable === 1) {
      atvr = 0;
    }

    var config = {
      method: "put",
      url: `${process.env.REACT_APP_REPROGRAFIA_URL}/service/${id}/type=${type}/enable=${atvr}`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (atvr === 1) {
          servicosAtivos(0);
        } else if (atvr === 0) {
          servicosAtivos(1);
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <Menu />
          <Header nif={props.nif} />
          <SideBar
            image={props.image}
            name={props.name}
            admin={props.admin}
            services={true}
            nif={props.nif}
          />
          <div className="container-Services">
            <Button className="btn-boot" onClick={() => servicosAtivos(1)}>
              Serviços Ativos
            </Button>
            <Button className="btn-boot" onClick={() => servicosAtivos(0)}>
              Serviços Inativos
            </Button>
          </div>
          <div className="servicesAcoes">
            {ativos ? (
              <h1 className="title-services">Serviços Ativos:</h1>
            ) : (
              <h1 className="title-services">Serviços Inativos:</h1>
            )}
          </div>
          <div className="services-card">
            <div className="ct-table-div">
              <h1 className="title-services">Capa &#38; Acabamento</h1>
              {semRegistros ? (
                <p>Sem registros...</p>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>DESCRIÇÃO</th>
                        <th>QUANTIDADE</th>
                        <th>CUSTO</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicos.servicosCA.map((data) => (
                        <React.Fragment key={data.id_servico}>
                          <tr>
                            <td>{data.descricao}</td>
                            <td>{data.quantidade}</td>
                            <td>{"R$ " + data.valor_unitario}</td>
                            {data.ativado ? (
                              <>
                                <td>
                                  <Button
                                    className="btn-edit"
                                    onClick={() => {
                                      history.push(`/edit-services/${data.id_servico}/ca`);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn-disable"
                                    onClick={() =>
                                      enableUser({
                                        id: data.id_servico,
                                        type: "ca",
                                        enable: data.ativado,
                                      })
                                    }
                                  >
                                    Desabilitar
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <td>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableUser({
                                      id: data.id_servico,
                                      type: "ca",
                                      enable: data.ativado,
                                    })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </td>
                            )}
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ca");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>

            <div className="ca-table-div">
              <h1 className="title-services">Copia &#38; Tamanho</h1>
              {semRegistros ? (
                <p>Sem registros...</p>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>DESCRIÇÃO</th>
                        <th>QUANTIDADE</th>
                        <th>CUSTO</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicos.servicosCT.map((data) => (
                        <React.Fragment key={data.id_servico}>
                          <tr>
                            <td>{data.descricao}</td>
                            <td>{data.quantidade}</td>
                            <td>{"R$ " + data.valor_unitario}</td>
                            {data.ativado ? (
                              <>
                                <td>
                                  <Button
                                    className="btn-edit"
                                    onClick={() => {
                                      history.push(`/edit-services/${data.id_servico}/ct`);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn-disable"
                                    onClick={() =>
                                      enableUser({
                                        id: data.id_servico,
                                        type: "ct",
                                        enable: data.ativado,
                                      })
                                    }
                                  >
                                    Desabilitar
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <td>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableUser({
                                      id: data.id_servico,
                                      type: "ct",
                                      enable: data.ativado,
                                    })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </td>
                            )}
                          </tr>

                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ct");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </>
      }
    </>
  );
}