import React, { useState, useEffect } from "react";
import "../../styles/statistics.scss";
import { Table, Card } from "react-bootstrap";

import Header from "../../components/header";
import SideBar from "../../components/formSideBar";
import MenuG from "../../components/hamburgerButton";
import Loading from '../../../src/components/loading';

import axios from "axios";

export default function Statistics(props) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    const mesesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const [fetchMesStatus, setFetchMesStatus] = useState();

    const [message, setMessage] = useState();

    const [unicoMes, setUnicoMes] = useState([]);

    const [firstRequest, setFirstRequest] = useState(false);

    const [ano, setAno] = useState();
    const [mes, setMes] = useState();

    const [servicoCA, setServicoCA] = useState();
    const [servicoCT, setServicoCT] = useState({ list: [] });

    const selectMesAno = (e) => {
        e.preventDefault();

        var anoInt = parseInt(ano);

        fetchMes(anoInt, mes);
    };

    const fetchMes = (ano, mes) => {
        if (mes === "0" || mes === undefined) {
            setMessage("Selecione um mês para consulta")
        }
        else if (!ano) {
            setMessage("Insira um ano para consulta!")
        }
        else if (ano < 2021) {
            setMessage("Insira um ano válido!")
        }
        else {
            axios
                .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/estatisticas/mensais/${ano}/${mes}`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                .then((result) => {
                    setUnicoMes([result.data]);
                    setServicoCA(result.data.servicoCAArray);
                    setServicoCT(result.data.servicoCTArray);
                    setFirstRequest(false)
                    setFetchMesStatus(true);
                    setMessage(null)
                });
        }
    };

    var [loading, setLoading] = useState(Loading);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/estatisticas/mensais/${anoAtual}/${mesAtual}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                setUnicoMes([result.data]);
                setServicoCA(result.data.servicoCAArray);
                setServicoCT(result.data.servicoCTArray);
                setFetchMesStatus(true);
                setFirstRequest(true);
                setLoading(false);
            });
    }, [anoAtual, mesAtual]);

    return (
        <>
            {loading ? <> <Loading /> </> :
                <>
                    <Header nif={props.nif} />
                    <MenuG />
                    <SideBar image={props.image} name={props.name} admin={props.admin} estatisticas={true} nif={props.nif} />

                    <div className="statistics-container">
                        <div className="statistics-title">
                            <h1>Estatísticas Gerais</h1>
                        </div>
                        <div className="form-container">
                            <div className="month-form">
                                <select
                                    className="input-mes"
                                    onChange={(e) => {
                                        setMes(e.target.value);
                                    }}
                                >
                                    <option value="0" name="padrão">
                                        Selecione um Mês
                                    </option>
                                    <option value="1" name="janeiro">
                                        Janeiro
                                    </option>
                                    <option value="2" name="fevereiro">
                                        Fevereiro
                                    </option>
                                    <option value="3" name="março">
                                        Março
                                    </option>
                                    <option value="4" name="abril">
                                        Abril
                                    </option>
                                    <option value="5" name="maio">
                                        Maio
                                    </option>
                                    <option value="6" name="junho">
                                        Junho
                                    </option>
                                    <option value="7" name="julho">
                                        Julho
                                    </option>
                                    <option value="8" name="agosto">
                                        Agosto
                                    </option>
                                    <option value="9" name="setembro">
                                        Setembro
                                    </option>
                                    <option value="10" name="outubro">
                                        Outubro
                                    </option>
                                    <option value="11" name="novembro">
                                        Novembro
                                    </option>
                                    <option value="12" name="dezembro">
                                        Dezembro
                                    </option>
                                </select>
                                <h2>{message}</h2>
                                <input
                                    className="input-ano"
                                    placeholder="Especifique o Ano"
                                    onChange={(e) => {
                                        setAno(e.target.value);
                                    }}
                                />
                            </div>
                            <form onSubmit={selectMesAno} className="button-form">
                                <button className="send-date" type="submit">
                                    Atualizar
                                </button>

                            </form>

                        </div>

                        {unicoMes.map((data) => (
                            <React.Fragment key={null}>
                                {firstRequest ? <><h1>Informações do mês atual ({mesesArray[mesAtual - 1]}):</h1></> : <><h1 className="">{data.mes} - {data.ano}</h1></>}
                                <div className="tables">
                                    <div className="first-line-div">
                                        <div className="first-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Pedidos</h1> : <></>}
                                            <Table striped bordered hover size="sm">
                                                <tbody>
                                                    {data.avaliacao_pedido.map((data) => (
                                                        <React.Fragment key={null}>
                                                            <tr>
                                                                <td>
                                                                    <strong>Total de Pedidos Avaliados</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>
                                                                        {
                                                                            data[1].qtdade_solicitada +
                                                                            data[2].qtdade_solicitada
                                                                        }
                                                                    </Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>Status: Atendeu</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>Status: Não Atendeu</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>

                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="first-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Estatisticas Gerais</h1> : <></>}
                                            <Table className="table-statistics" striped bordered hover size="sm">
                                                {unicoMes.map((data) => (
                                                    <React.Fragment key={null}>
                                                        <tbody>
                                                            <React.Fragment key={null}>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total de Pedidos</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.pedidos || 0}</Card.Text>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total de Folhas Impressas</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.folhas_impressas || 0}</Card.Text>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total de Copias</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.num_copias || 0}</Card.Text>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total de Paginas</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.num_paginas || 0}</Card.Text>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total de Custo</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{"R$ "}{(Math.round((data.custo_total * 1000) / 10) / 100).toFixed(2)}</Card.Text>
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        </tbody>
                                                    </React.Fragment>
                                                ))}
                                            </Table>
                                        </div>
                                        <div className="second-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Solicitações por Capa & Acabamento</h1> : <></>}
                                            <Table className="" striped bordered hover size="sm">
                                                <tbody>
                                                    {servicoCA.map((data) => (
                                                        <React.Fragment key={null}>
                                                            {data === null ? <> </> : <>
                                                                <tr>
                                                                    <td>
                                                                        <strong>{data.descricao}</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.qtdade_solicitada || 0}</Card.Text>
                                                                    </td>
                                                                </tr></>}
                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="second-line-div">
                                        <div className="first-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Solicitações por Cursos</h1> : <></>}
                                            <Table className="" striped bordered hover size="sm">
                                                {unicoMes.map((data) => (
                                                    <React.Fragment key={null}>
                                                        <tbody>
                                                            {data.cursoArray.map((data) => (
                                                                <React.Fragment key={null}>
                                                                    {data === null ? <> </> : <>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>{data.descricao}</strong>
                                                                            </td>
                                                                            <td>
                                                                                <Card.Text>{data.qtdade_solicitada || 0}</Card.Text>
                                                                            </td>
                                                                        </tr></>}
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </React.Fragment>
                                                ))}
                                            </Table>
                                        </div>
                                        <div className="second-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Solicitações por Copia & Tamanho</h1> : <></>}
                                            <Table className="" striped bordered hover size="sm">
                                                <tbody>
                                                    {servicoCT.map((data) => (
                                                        <React.Fragment key={null}>
                                                            {data === null ? <> </> : <>
                                                                <tr>
                                                                    <td>
                                                                        <strong>{data.descricao}</strong>
                                                                    </td>
                                                                    <td>
                                                                        <Card.Text>{data.qtdade_solicitada || 0}</Card.Text>
                                                                    </td>
                                                                </tr></>}
                                                        </React.Fragment>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="second-line-tables">
                                            {fetchMesStatus ? <h1 className="title-tables">Solicitações por Centro de Custos</h1> : <></>}
                                            <Table striped bordered hover size="sm">
                                                {unicoMes.map((data) => (
                                                    <React.Fragment key={null}>
                                                        <tbody>
                                                            {data.centro_custosArray.map((data) => (
                                                                <React.Fragment key={null}>
                                                                    {data === null ? <> </> : <>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>{data.descricao}</strong>
                                                                            </td>
                                                                            <td>
                                                                                <Card.Text>{data.qtdade_solicitada || 0}</Card.Text>
                                                                            </td>
                                                                        </tr></>}
                                                                </React.Fragment>
                                                            ))}
                                                        </tbody>
                                                    </React.Fragment>
                                                ))}
                                            </Table>
                                        </div>
                                    </div>
                                    {fetchMesStatus ? <></> : <h1 className="select-a-date">Selecione uma Data</h1>}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </>
            }
        </>
    );
}