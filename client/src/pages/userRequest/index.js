import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Table } from "react-bootstrap";
import "../../styles/usersRequest.scss";
import Header from "../../../src/components/header";
import Menu from "../../../src/components/hamburgerButton";
import SideBar from "../../../src/components/formSideBar";
import Loading from '../../../src/components/loading';

const UserRequest = (props) => {
  const history = useHistory();
  const { nif } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  var [avaliados, setAvaliados] = useState();

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/request/nif/${nif}/rated=0`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (result.data.length > 0) {
          setPedidos({
            list: result.data,
            status: true,
          });
        } else {
          setPedidos({
            message: result.data.message,
          });
        }
        setLoading(false)
      });

  }, [nif]);

  const getAvaliados = (id) => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/request/nif/${nif}/rated=${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (id === 1) {
          setAvaliados(true);
        } else {
          setAvaliados(false);
        }
        if (result.data.length > 0) {
          setPedidos({
            list: result.data,
            status: true,
          });
        } else {
          setPedidos({
            message: result.data.message,
            ativos: true,
          });
        }
      });
  };

  return (
    <>
      {loading ? <Loading /> : <>
        <Menu admin={props.admin} />
        <Header nif={props.nif} />
        <SideBar image={props.image} name={props.name} admin={true} />

        <div className="container-management">
          <h1 className="title-usersR">Solicitações do usuário com NIF {nif}</h1>
          <>
            <div className="avaliacao-usersR">
              {avaliados ? <>Já avaliados</> : <>Ainda não avaliados</>}
            </div>
            <div className="request">
              <div className="btns-usersR">
                <button className="btn-usersR" onClick={() => getAvaliados(0)}>
                  Não avaliados
                </button>
                <button className="btn-usersR" onClick={() => getAvaliados(1)}>
                  Avaliados
                </button>
              </div>
              {pedidos.status ? (
                <>
                  <Table
                    className="table-usersR"
                    striped
                    bordered
                    hover
                    size="sm"
                  >
                    <thead>
                      <tr>
                        <th>Pedido</th>
                        {avaliados ? <th>Atualizado</th> : <th>Realizado</th>}
                        <th>Status</th>
                        <th>Solicitado</th>
                      </tr>
                    </thead>
                    {pedidos.list.map((data) => (
                      <React.Fragment key={data.id_pedido}>
                        <tbody>
                          <tr>
                            <td>
                              <Card.Text>{data.titulo_pedido}</Card.Text>
                            </td>
                            <td>
                              {avaliados ? (
                                <Card.Text>{data.updatedAt}</Card.Text>
                              ) : (
                                <Card.Text>{data.createdAt}</Card.Text>
                              )}
                            </td>
                            <td>
                              <Card.Text>{data.id_avaliacao_pedido}</Card.Text>
                            </td>
                            <td>
                              {data.realizado_qtdade < 2 ? (<Card.Text>{data.realizado_qtdade} vez</Card.Text>) : (<Card.Text>{data.realizado_qtdade} vezes</Card.Text>)}
                            </td>
                            <td>
                              <div className="avaliations">
                                {avaliados ? <>
                                  <Button
                                    className="usersR-avaliation"
                                    variant="secondary"
                                    onClick={() => {
                                      history.push(
                                        "/requestList/" + data.id_pedido
                                      );
                                    }}
                                  >
                                    detalhes
                                  </Button>
                                  <Button className="usersR-avaliation" variant="secondary" onClick={() => { history.push("/feedbacks/" + data.id_pedido) }}>avaliações</Button>
                                </> : <>
                                  <Button
                                    className="usersR-avaliation"
                                    variant="secondary"
                                    onClick={() => {
                                      history.push(
                                        "/requestList/" + data.id_pedido
                                      );
                                    }}
                                  >
                                    detalhes
                                  </Button>
                                  {data.realizado_qtdade < 2 ? <></> : <Button className="usersR-avaliation" variant="secondary" onClick={() => { history.push("/feedbacks/" + data.id_pedido) }}>avaliações</Button>}</>}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </React.Fragment>
                    ))}
                  </Table>
                </>
              ) : (
                <>
                  <h1>{pedidos.message}</h1>
                </>
              )}
              <div className="backUsersR">
                <Button
                  className="back-usersR"
                  onClick={() => {
                    history.push(`/management`);
                  }}
                >
                  {" "}
                  Voltar{" "}
                </Button>
              </div>
            </div>
          </>
        </div>
      </>}
    </>
  );
};

export default UserRequest;