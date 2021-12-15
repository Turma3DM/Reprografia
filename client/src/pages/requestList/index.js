import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/requestList.scss";
import axios from "axios";
import { Table, Card } from "react-bootstrap";

import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';
import Loading from '../../../src/components/loading';

function RequestList(props) {

  const { id } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/requestDetails/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (!result.data.error && result.data.status !== "error") {
          if (result.data.message) {
            setPedidos({
              message: result.data.message
            });
          } else {
            setPedidos({
              list: [result.data],
              status: true,
            });
          }
          setLoading(false)
        }
      });
  }, [id]);

  return (
    <>
      {loading ? <Loading /> : <>
        <Menu />
        <Header nif={props.nif} />
        <SideBar image={props.image} name={props.name} admin={props.admin} />

        <div className="container-management">
          <div className="titleRL">
            <h1>Solicitação de usuário</h1>
          </div>
        </div>

        <div className="container-management">
          <>
            <div className="requestL">
              {pedidos.status ? (
                <>
                  <Table className="table-RL" striped bordered hover size="sm">
                    {pedidos.list.map((data) => (
                      <React.Fragment key={data.id_pedidos}>
                        <tbody>
                          <tr>
                            <td><strong>O pedido foi solicitado:</strong></td>
                            <td>
                              {data.realizado_qtdade < 2 ? <Card.Text>{data.realizado_qtdade} vez</Card.Text> : <Card.Text>{data.realizado_qtdade} vezes</Card.Text>}
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Curso</strong></td>
                            <td>
                              <Card.Text>{data.det_pedidos[0].id_curso}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Centro de custos</strong></td>
                            <td>
                              <Card.Text>{data.det_pedidos[0].id_centro_custos}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Título</strong></td>
                            <td>
                              <Card.Text>{data.titulo_pedido}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Páginas</strong></td>
                            <td>
                              <Card.Text>{data.det_pedidos[0].num_paginas}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Cópias</strong></td>
                            <td>
                              <Card.Text>{data.det_pedidos[0].num_copias}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Custo total</strong></td>
                            <td>
                              <Card.Text> {"R$ " + data.custo_total}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Encadernação</strong></td>
                            <td>
                              <Card.Text>{data.servico_pedidos[0].servicoCA}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Formato e Cor</strong></td>
                            <td>
                              <Card.Text>{data.servico_pedidos[0].servicoCT}</Card.Text>
                            </td>
                          </tr>
                          <tr>
                            <td><strong>Modo de Envio</strong></td>
                            <td>
                              <Card.Text>{data.id_modo_envio}</Card.Text>
                            </td>
                          </tr>

                          {data.det_pedidos[0].observacoes === "" ? <></> :
                            <tr>
                              <td><strong>Observações</strong></td>
                              <td>
                                <Card.Text>{data.det_pedidos[0].observacoes}</Card.Text>
                              </td>
                            </tr>}
                          {data.det_pedidos[0].anexo_path !== "" ? <><tr>
                            <td><strong>Anexo</strong></td>
                            <td>
                              <Card.Text>Contém anexo</Card.Text>
                            </td>
                          </tr></> : <></>}
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
            </div>
          </>
        </div>
      </>}
    </>
  );
};

export default RequestList;