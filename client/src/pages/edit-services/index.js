import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/edit-services.scss';
import LoginContainer from '../../components/loginContainer';
import Loading from '../../../src/components/loading';
import Swal from 'sweetalert2';

export default function AddService() {

  var history = useHistory();

  var { type, id } = useParams();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [message, setMessage] = useState();

  const EditService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.put(`${process.env.REACT_APP_REPROGRAFIA_URL}/service/${id}/type=${type}`, data, {
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
    EditService()
  }

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/service/${id}/type=${type}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (!result.data.error && result.data.status !== "error") {
          setDescricao(result.data.descricao)
          setQuantidade(result.data.quantidade)
          setCusto(result.data.valor_unitario)
          setLoading(false);
        }
      });
  }, [id, type]);


  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <LoginContainer />
          <div className="finishing">
            <form onSubmit={onSubmit}>
              <h2 id="h2" className="service-subTitle">
                Editar Serviço
              </h2>
              <h2 className="title-editService">{descricao}</h2>
              <input
                className="input-service-ED"
                name="quantidade"
                type="number"
                placeholder={quantidade}
                onChange={(e) => {
                  setQuantidade(e.target.value);
                }}
              />
              <input
                className="input-service-EDS"
                name="custo"
                type="number"
                step="any"
                placeholder={custo}
                onChange={(e) => {
                  setCusto(e.target.value);
                }}
              />
              <h3>{message}</h3>
              <div className="btns-edit-services">
                <input
                  type="submit"
                  className="nu-send-buttonEDS"
                  id="btn"
                  value="Editar"
                />
                <button
                  className="btn-back-userEDS"
                  id="btn"
                  onClick={() => history.push("/services")}>Voltar
                </button>
              </div>
            </form>
          </div>
        </>
      }
    </>
  );
}