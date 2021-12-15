import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/feedbacks.scss";
import axios from "axios";
import { Table } from "react-bootstrap";

import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';
import Swal from 'sweetalert2'
import Button from "@restart/ui/esm/Button";
import Loading from "../../components/loading";

function Feedback(props) {

    const { id } = useParams();

    var [feedbacks, setFeedBacks] = useState({
        status: false,
        list: [],
        message: "",
    });

    const Details = (feedbackId) => {
        axios
            .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/feedback/id/${feedbackId}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                if (result.data.status === "error" || result.status === 500 || result.status === 403) {
                    Swal.fire(
                        `ERROR!`,
                        result.data.message
                    )
                }
                else {
                    Swal.fire(
                        `Detalhes da avaliação Nº${feedbackId}`,
                        `Solicitada pelo usuário com nif <strong>${result.data.userId}</strong> no pedido <strong>Nº${result.data.pedidoId}</strong> <br></br> <h3><strong>Avaliação:</strong></h3> ${result.data.avaliacao_obs}`,
                        'warning'
                    )
                }
            });
    }
    var [loading, setLoading] = useState(Loading);

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/feedbacks/${id}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                if (result.data.status === "error") {
                    setFeedBacks({
                        message: result.data.message
                    });
                } else {
                    setFeedBacks({
                        list: result.data,
                        status: true,
                    });
                }
                setLoading(false)
            });
    }, [id]);

    return (
        <>
            {loading ? <Loading /> :
                <>
                    <Menu />
                    <Header nif={props.nif} />
                    <SideBar image={props.image} name={props.name} admin={props.admin} />

                    <div className="container-feedbacks">
                        <div className="titleFDB">
                            <h1>Avaliações do pedido Nº{id}</h1>
                        </div>
                    </div>

                    <div className="container-feedbacks">
                        <>
                            {feedbacks.status ? (
                                <>
                                    <Table className="table-feedbacks" striped bordered hover size="sm">
                                        <thead>
                                            <th> Realizado por (nif): </th>
                                            <th>
                                                Realizado em:
                                            </th>
                                            <th>Status</th>
                                            <th>
                                                Detalhes
                                            </th>
                                        </thead>
                                        {feedbacks.list.map((data) => (
                                            <>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h1>{data.userId}</h1>
                                                        </td>

                                                        <td>
                                                            <h1>{data.createdAt}</h1>
                                                        </td>

                                                        <td>
                                                            {data.avaliacaoId === 1 ? <h1>Atendeu!</h1> : <h1>Não atendeu!</h1>}
                                                        </td>

                                                        <td>
                                                            <Button className="btn-details" onClick={() => { Details(data.feedbackId) }}>detalhes</Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </>
                                        ))}
                                    </Table>
                                </>
                            ) : (
                                <>
                                    <h1>{feedbacks.message}</h1>
                                </>
                            )}
                        </>
                    </div>
                </>
            }
        </>
    );
};

export default Feedback;