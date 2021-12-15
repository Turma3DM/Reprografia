import React, { useState, useEffect } from 'react';
import '../../styles/management.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

import Menu from '../../../src/components/hamburgerButton';
import Header from '../../../src/components/header';
import SideBar from '../../../src/components/formSideBar';
import Loading from '../../../src/components/loading';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Management(props) {
  var history = useHistory();

  var [myNif, setMyNif] = useState();

  var [users, setUsers] = useState({
    status: false,
    list: [],
    message: "",
  });

  var [ativos, setAtivos] = useState(true);

  const usuariosAtivos = (id) => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/users/enabled=` + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (result.data.length > 0) {
          setUsers({
            list: result.data,
            status: true
          })
        }
        else {
          setUsers({
            message: result.data.message,
            status: false
          })
        }
        if (id === 1) {
          setAtivos(true);
        }
        else {
          setAtivos(false);
        }
      });
  }

  const enableUser = ({ nif, enable }) => {

    if (enable === 1) {
      var id = 0
    }
    else {
      id = 1
    }

    var config = {
      method: 'put',
      url: `${process.env.REACT_APP_REPROGRAFIA_URL}/user/${nif}/enable=${id}`,
      headers: {
        'accessToken': localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (id === 1) { usuariosAtivos(0); }
        else if (id === 0) { usuariosAtivos(1); }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/users/enabled=1`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (result.data.length > 0) {
          setUsers({
            list: result.data,
            status: true
          })
        }
        else {
          setUsers({
            message: result.data.message,
            status: false
          })
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
        setLoading(false);
      });
  }, [props.nif]);


  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <Menu admin={props.admin} />
          <Header nif={props.nif} />
          <SideBar image={props.image} name={props.name} admin={props.admin} management={true} nif={props.nif} />

          <div className="container-management">
            <div className="management">
              <h1 className="management-title">Gerência de Usuários</h1>
              <div className="div-search">
                <label htmlFor="search">
                  <input
                    className="search-management"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Pesquisar usuário"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <FaSearch />
                </label>
              </div>
            </div>

            <div className="btns-boot">
              <Button className="btn-boot" onClick={() => usuariosAtivos(1)}>Usuários ativos</Button>
              <Button className="btn-boot" onClick={() => usuariosAtivos(0)}>Usuários inativos</Button>
            </div>

            {ativos ? <h1 className="title-enable-disable">Usuários Ativos:</h1> : <h1 className="title-enable-disable">Usuários Inativos:</h1>}
            {users.status ?
              <>
                <div className="section">
                  <Table className="tableBootstrap" striped bordered hover responsive size="sm" >
                    <thead>
                      <tr>
                        <th>Perfil</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CFP</th>
                        <th>Telefone</th>
                        <th>Departamento</th>
                        <th>Cargo</th>
                        <th> </th>
                      </tr>
                    </thead>
                    {users.list.filter((data) => {
                      if (searchTerm === "") {
                        return data;
                      } else if (data.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return data;
                      }
                      return null;
                    }).map((data) => (
                      <React.Fragment key={data.nif}>
                        {data.nif === myNif ? null : <>
                          <tbody>
                            <tr>
                              <td onClick={() => { history.push(`/user/${data.nif}`) }}><img className="img-user-upload" src={`${process.env.REACT_APP_REPROGRAFIA_URL}/${data.imagem}`} alt="imagem do usuário" /></td>
                              <td>{data.nome}</td>
                              <td>{data.email}</td>
                              <td>{data.cfp}</td>
                              <td>{data.telefone}</td>
                              <td>{data.depto}</td>
                              <td>{data.roles[0].descricao}</td>
                              <td className="btns-bootM">
                                <Button className="btn-bootM" color="primary" size="lg" onClick={() => { history.push(`/users-requests/${data.nif}`) }}>
                                  Solicitações
                                </Button>{' '}
                                <Button className="btn-bootM" color="primary" size="lg" onClick={() => { history.push(`/user/edit/${data.nif}`) }}>
                                  Editar
                                </Button>{' '}
                                {data.ativado ? <>
                                  <Button className="btn-disable" variant="primary" size="lg" onClick={() => enableUser({ nif: data.nif, enable: data.ativado })}>
                                    Desabilitar
                                  </Button>{' '}</> : <>
                                  <Button className="btn-enable" variant="primary" size="lg" onClick={() => enableUser({ nif: data.nif, enable: data.ativado })}>
                                    Habilitar
                                  </Button>{' '}
                                </>}
                              </td>
                            </tr>
                          </tbody>
                        </>}
                      </React.Fragment>
                    ))}
                  </Table>
                </div>
              </> :
              <>
                <h3>{users.message}</h3>
              </>
            }
            <div className="btnD-newUser">
              <Button className="btn-newUser" variant="primary" size="lg" onClick={() => { history.push("/newUser/") }}>
                Cadastrar Usuário
              </Button>{' '}
            </div>
          </div>
        </>
      }
    </>
  );
}

export default Management;