import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../../styles/deptoCurso.scss";
import Header from "../../../src/components/header";
import SideBar from "../../../src/components/formSideBar";
import { Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Menu from "../../components/hamburgerButton";
import Loading from '../../../src/components/loading';

function DeptoCursos(props) {

  var history = useHistory();

  const [cursos, setCursos] = useState({
    list: [],
    status: false,
    habilitados: true
  });

  const [cursoDepto, setCursoDepto] = useState({
    list: [],
    status: false
  })

  const [departamento, setDepartamento] = useState({
    list: [],
    status: false
  });
  const [centroCusto, setCentroCusto] = useState({
    list: [],
    status: false
  });

  const [ativos, setAtivos] = useState({
    curso: false,
    depto: false,
    centroCustos: false
  });

  const [message, setMessage] = useState();

  const [type, setType] = useState();

  const [loading, setLoading] = useState(Loading);

  const [status, setStatus] = useState({
    curso: false,
    depto: false,
    centroCustos: false
  });


  useEffect(() => {
    onLoad();
  }, [])

  const centroCustoFetch = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/centroCustos/enabled=${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (id === "1") {
          setStatus({
            centroCustos: true
          })
        }
        else {
          setStatus({
            centroCustos: false
          })
        }
        if (result.data.status !== "error") {
          setCentroCusto({
            list: result.data,
            status: true
          })
          setCursos({ status: false })
          setDepartamento({ status: false })
          setMessage("")
        }
        else {
          setMessage(result.data.message)
          setType("ct")
        }
        setAtivos({ curso: false, depto: false, centroCustos: true })
      })
  }

  const deptoFetch = async ({ id, type }) => {
    await axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/deptos/enabled=${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (id === "1") {
          setStatus({
            depto: true
          })
        }
        else {
          setStatus({
            depto: false
          })
        }
        if (result.data.status !== "error") {
          if (type === "1") {
            setDepartamento({
              list: result.data,
              status: true
            })
            setCentroCusto({ status: false })
            setCursos({ status: false })
            setMessage("")
          }
          else {
            setCursoDepto({
              list: result.data,
              status: true
            })
            setMessage("")
          }
        }
        else {
          setMessage(result.data.message);
          setType("dp")
        }
        setAtivos({ curso: false, depto: true, centroCustos: false })
      })
  }

  const cursosFetch = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/cursos/enabled=${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (id === "1") {
          setStatus({
            curso: true
          })
        }
        else {
          setStatus({
            curso: false
          })
        }
        if (result.data.status !== "error") {
          setCursos({
            list: result.data,
            status: true
          })
          setMessage("")
          setDepartamento({ status: false })
          setCentroCusto({ status: false })
        }
        else {
          setMessage(result.data.message);
          setType("cs")
        }
        setAtivos({ curso: true, depto: false, centroCustos: false })
      })
  }

  const enableOrDisable = ({ id, enable, type }) => {
    if (type === "curso") {
      var link = `${process.env.REACT_APP_REPROGRAFIA_URL}/curso/${id}/enable=${enable}`
    }
    else if (type === "depto") {
      link = `${process.env.REACT_APP_REPROGRAFIA_URL}/depto/${id}/enable=${enable}`
    }
    else {
      link = `${process.env.REACT_APP_REPROGRAFIA_URL}/centroCusto/${id}/enable=${enable}`
    }

    var config = {
      method: "put",
      url: link,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (type === "curso" && enable === '0') {
          cursosFetch("1")
        }
        else if (type === "curso" && enable === "1") {
          cursosFetch("0")
        }
        else if (type === "depto" && enable === "0") {
          deptoFetch({ type: "1", id: "1" })
        }
        else if (type === "depto" && enable === "1") {
          deptoFetch({ type: "1", id: "0" })
        }
        else if (enable === "0") {
          centroCustoFetch("1")
        }
        else {
          centroCustoFetch("0")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onLoad = async () => {
    setLoading(true)
    try {
      //Utilizado para carregar os departamentos na pagina de cursos
      await deptoFetch({ id: "1" });

      //Utilizado para listar todos os departamentos
      await deptoFetch({ id: "1", type: "1"});
      
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

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
            deptoCursos={true}
            nif={props.nif}
          />
          <div className="deptoAcoes">
            <div className="title-deptoCurso">{message}</div>
          </div>
          <div className="deptoCurso-card">
            <div className="btn-tables">
              <Button className="btn-boot" onClick={() => deptoFetch({ id: "1", type: "1" })}>Departamento</Button>
              <Button className="btn-boot" onClick={() => cursosFetch("1")}>Cursos</Button>
              <Button className="btn-boot" onClick={() => centroCustoFetch("1")}>Centro de Custos</Button>
            </div>
            {message !== "" ? <>
              <div className="btns-deptoCurso">
                {type === "cs" ? <><Button className="btn-deptoCurso" onClick={() => history.push("/addCurso")}>Adicionar Curso</Button></> : <></>}
                {type === "dp" ? <><Button className="btn-deptoCurso" onClick={() => history.push("/addOthers/depto")}>Adicionar Departamento</Button></> : <></>}
                {type === "ct" ? <><Button className="btn-deptoCurso" onClick={() => history.push("/addOthers/centroCustos")}>Adicionar Centro de custos</Button></> : <></>}
              </div>

              {ativos.curso ? <>
                <div className="table-deptoCurso">
                  <Button className="btn-deptoCurso" onClick={() => cursosFetch("1")}>Habilitados</Button>
                  <Button className="btn-deptoCurso" onClick={() => cursosFetch("0")}>Desabilitados</Button>
                </div>
              </> : <></>}

              {ativos.depto ? <>
                <div className="table-deptoCurso">
                  <Button className="btn-deptoCurso" onClick={() => deptoFetch({ type: "1", id: "1" })}>Habilitados</Button>
                  <Button className="btn-deptoCurso" onClick={() => deptoFetch({ type: "1", id: "0" })}>Desabilitados</Button>
                </div>
              </> : <></>}
              {ativos.centroCustos ? <>
                <div className="table-depto-curso">
                  <Button className="btn-deptoCurso" onClick={() => centroCustoFetch("1")}>Habilitados</Button>
                  <Button className="btn-deptoCurso" onClick={() => centroCustoFetch("0")}>Desabilitados</Button>
                </div>
              </> : <></>}

              <div className="title-deptoCurso">
              {ativos.curso ? <>
                {status.curso ? <> Cursos habilitados</> : <>Cursos desabilitados</>}
              </> : <>
                {ativos.centroCustos ? <>
                  {status.centroCustos ? <>Centro de custos habilitados</> : <>Centro de custos  desabilitados</>}
                </> : <>
                {ativos.depto ? <>
                  {status.depto ? <> Departamentos habilitados</> : <>Departamentos desabilitados</>}
                </>: <></>}
                </>}
              </>}
              </div>
            </>
              : <>
                <div className="table-div">
                  {cursos.status ? <>
                    <div className="table-depto-curso">
                      <Button className="btn-deptoCurso" onClick={() => cursosFetch("1")}>Habilitados</Button>
                      <Button className="btn-deptoCurso" onClick={() => cursosFetch("0")}>Desabilitados</Button>
                    </div>
                    <div className="title-deptoCurso">
                      {status.curso ?
                        <>
                          Cursos habilitados
                        </> :
                        <>Cursos desabilitados</>}
                    </div>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Cursos</th>
                          <th>Pertence ao Departamento</th>
                          <th> </th>
                        </tr>
                      </thead>
                      {cursos.list.map((data) => (
                        <>
                          <tbody>
                            <tr>
                              <td>
                                {data.descricao}
                              </td>
                              <td>
                                {cursoDepto.status ? <>
                                  {cursoDepto.list.map((data2) => (
                                    <>
                                      {data.id_depto === data2.id_depto ? <>{data2.descricao !== null ? data2.descricao : <>Departamento desabilitado</>}</> : <></>}
                                    </>
                                  ))}
                                </> : <></>}
                              </td>
                              {status.curso ? <>
                                <Button
                                  className="btn-disable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_curso, enable: "0", type: "curso" })
                                  }
                                >
                                  Desabilitar
                                </Button></> : <>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_curso, enable: "1", type: "curso" })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </>}
                            </tr>
                          </tbody>
                        </>
                      ))}
                    </Table>
                    <Button className="btn-depto" onClick={() => history.push("/addCurso")}>Adicionar Curso</Button>
                  </> : <></>}
                  {departamento.status ? <>
                    <div className="table-depto-curso">
                      <Button className="btn-deptoCurso" onClick={() => deptoFetch({ type: "1", id: "1" })}>Habilitados</Button>
                      <Button className="btn-deptoCurso" onClick={() => deptoFetch({ type: "1", id: "0" })}>Desabilitados</Button>
                    </div>
                    {status.depto ? <>
                    </> : <></>}
                    <div className="title-deptoCurso">
                      {status.depto ?
                        <>
                          Departamentos habilitados
                        </> :
                        <>Departamentos desabilitados</>}
                    </div>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Departamento</th>
                          <th> </th>
                        </tr>
                      </thead>
                      {departamento.list.map((data) => (
                        <>
                          <tbody>
                            <tr>
                              <td>
                                {data.descricao}
                              </td>
                              {status.depto ? <>
                                <Button
                                  className="btn-disable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_depto, enable: "0", type: "depto" })
                                  }
                                >
                                  Desabilitar
                                </Button>
                              </> : <>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_depto, enable: "1", type: "depto" })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </>}
                            </tr>
                          </tbody>
                        </>
                      ))}
                    </Table>
                    <h2 className="mensagem-deptoCurso">OBS: AO DESABILITAR UM DEPARTAMENTO, ESTARÁ DESABILITANDO OS CURSOS RELACIONADOS A ELE</h2>
                    <Button className="btn-depto" onClick={() => history.push("/addOthers/depto")}>Adicionar Departamento</Button>
                  </> : <></>}
                  {centroCusto.status ? <>
                    <div className="table-depto-curso">
                      <Button className="btn-deptoCurso" onClick={() => centroCustoFetch("1")}>Habilitados</Button>
                      <Button className="btn-deptoCurso" onClick={() => centroCustoFetch("0")}>Desabilitados</Button>
                    </div>
                    <div className="title-deptoCurso">{status.centroCustos ?
                      <>
                        Centro de custos habilitados
                      </> :
                      <>Centro de custos desabilitados</>}</div>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Centro de custos</th>
                          <th> </th>
                        </tr>
                      </thead>
                      {centroCusto.list.map((data) => (
                        <>
                          <tbody>
                            <tr>
                              <td>
                                {data.descricao}
                              </td>
                              {status.centroCustos ? <>
                                <Button
                                  className="btn-disable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_centro_custos, enable: "0" })
                                  }
                                >
                                  Desabilitar
                                </Button>
                              </> : <>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableOrDisable({ id: data.id_centro_custos, enable: "1" })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </>}
                            </tr>
                          </tbody>
                        </>
                      ))}
                    </Table>
                    <Button className="btn-depto" onClick={() => history.push("/addOthers/centroCustos")}>Adicionar Centro de custos</Button>
                  </> : <></>
                  }
                </div>
              </>
            }
          </div>
        </>
      }
    </>
  );
}

export default DeptoCursos;