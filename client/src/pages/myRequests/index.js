import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from '../../../src/components/header';
import SideBar from '../../../src/components/formSideBar';
import Menu from '../../../src/components/hamburgerButton';
import axios from 'axios';
import { Button, Card, Table } from 'react-bootstrap';
import '../../styles/myRequests.scss'
import Swal from 'sweetalert2'
import Loading from '../../../src/components/loading';

const MyRequests = (props) => {

    const history = useHistory();

    var [pedidos, setPedidos] = useState({
        status: false,
        list: [],
        message: ""
    });

    var [avaliados, setAvaliados] = useState();

    var [loading, setLoading] = useState(Loading);

    useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myRequests/rated=0`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((result) => {
                if (result.data.length > 0) {
                    setPedidos({
                        list: result.data,
                        status: true
                    })
                }
                else {
                    setPedidos({
                        message: result.data.message
                    })
                }
                setLoading(false)
            });
    }, []);

    const getAvaliados = (id) => {
        axios
            .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myRequests/rated=` + id, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                if (id === 1) {
                    setAvaliados(true);
                }
                else {
                    setAvaliados(false);
                }
                if (result.data.length > 0) {
                    setPedidos({
                        list: result.data,
                        status: true
                    })
                }
                else {
                    setPedidos({
                        message: result.data.message,
                        ativos: true
                    });
                }
            });
    }

    const solicitarNovamente = async (id, name) => {
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

        await axios.get(`${process.env.REACT_APP_REPROGRAFIA_URL}/requestAgain/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((result) => {
            if (result && result.data.status !== "error") {
                Toast.fire({
                    icon: 'success',
                    title: `Pedido "${name}" solicitado novamente com sucesso!`
                })
                getAvaliados(1);
                setTimeout(() => {
                    setPedidos({ message: `Pedido "${name}" movido para seção Não avaliados!` })
                }, 50);
                setTimeout(() => {
                    getAvaliados(1);
                }, 1500);
            }
            else {
                Toast.fire({
                    icon: 'error',
                    title: result.data.message
                })
            }
        })
    }

    return (
        <>
            {loading ? <Loading /> : <>
                <Menu />
                <div className="content">
                    <>
                        <Header nif={props.nif} />
                        <SideBar image={props.image} name={props.name} requestsNoInfo={true} nif={props.nif} admin={props.admin} />

                        <div className="container">
                            <div className="avaliacao-request">
                                {avaliados ? <>Já avaliados</> : <>Ainda não avaliados</>}
                            </div>
                            <div className="btns-request">
                                <button className="btn-request" onClick={() => getAvaliados(0)}>Não avaliados</button>
                                <button className="btn-request" onClick={() => getAvaliados(1)}>Avaliados</button>
                            </div>
                            <>
                                {pedidos.status ?
                                    <>
                                        <Table className="table-request" striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Pedido</th>
                                                    {avaliados ? <th>Atualizado</th> : <th>Realizado</th>}
                                                    <th>Status</th>
                                                    <th>Solicitado</th>
                                                    <th>⠀⠀⠀⠀⠀⠀⠀⠀⠀</th>
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
                                                                {avaliados ? <Card.Text>{data.updatedAt}</Card.Text> : <Card.Text>{data.createdAt}</Card.Text>}
                                                            </td>
                                                            <td>
                                                                <Card.Text>{data.id_avaliacao_pedido}</Card.Text>
                                                            </td>
                                                            <td>
                                                                {data.realizado_qtdade < 2 ? <Card.Text>{data.realizado_qtdade} vez</Card.Text> : <Card.Text>{data.realizado_qtdade} vezes</Card.Text>}
                                                            </td>
                                                            <td>
                                                                <div className="details-btns">
                                                                    {avaliados ? <>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => solicitarNovamente(data.id_pedido, data.titulo_pedido)}>Solicitar novamente</Button>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/requestList/" + data.id_pedido) }}>detalhes</Button>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/feedbacks/" + data.id_pedido) }}>avaliações</Button>
                                                                    </> :
                                                                        <>
                                                                            <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/review/" + data.id_pedido) }}>avaliar</Button>
                                                                            <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/requestList/" + data.id_pedido) }}>detalhes</Button>
                                                                            {data.realizado_qtdade < 2 ? <></> : <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/feedbacks/" + data.id_pedido) }}>avaliações</Button>}
                                                                        </>}
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </React.Fragment>
                                            ))}
                                        </Table>

                                    </> :
                                    <>
                                        <h1 className="text-request">{pedidos.message}</h1>
                                    </>
                                }
                            </>
                        </div>
                    </>
                </div>
            </>}
        </>
    )
}

export default MyRequests;