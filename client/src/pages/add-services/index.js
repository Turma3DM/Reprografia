import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addService.scss';
import LoginContainer from '../../components/loginContainer';
import Swal from 'sweetalert2'

export default function AddService() {

  var history = useHistory();

  var { type } = useParams();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [message, setMessage] = useState();

  const AddService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.post(`${process.env.REACT_APP_REPROGRAFIA_URL}/service/type=${type}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      if (result.data.status === "error") {
        setMessage(result.data.message)
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
        history.push("/services")
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AddService();
  }


  return (
    <>
      <LoginContainer />
      <div className="finishing">
        <form onSubmit={onSubmit}>
          <h2 id="" className="service-subTitle">
            Adicionar Serviço
          </h2>
          <h4 className="import-addServices">Onde houver "*" o preenchimento é obrigatório</h4>
          <label className="important">*
            <input
              className="input-service"
              name="descricao"
              type="text"
              placeholder="descrição de capa e acabamento"
              required
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
          </label>
          <label className="important">*
            <input
              className="input-service"
              name="quantidade"
              type="number"
              placeholder="quantidade do serviço"
              required
              onChange={(e) => {
                setQuantidade(e.target.value);
              }}
            />
          </label>
          <label className="important">*
            <input
              className="input-service"
              name="custo"
              type="number"
              step="any"
              placeholder="custo unitário do serviço"
              required
              onChange={(e) => {
                setCusto(e.target.value);
              }}
            />
          </label>
          <h3>{message}</h3>
          <input
            type="submit"
            className="nu-send-button"
            id="btn"
            value="Adicionar"
          />
        </form>
        <button
          className="btn-back-user"
          id="btn"
          onClick={() => { history.push("/services") }}>Voltar</button>
      </div>
    </>
  );
}