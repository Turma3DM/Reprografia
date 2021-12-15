import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addOthers.scss';
import LoginContainer from '../../components/loginContainer';
import Swal from 'sweetalert2';

export default function AddOthers() {

  var history = useHistory();

  var { type } = useParams();

  const [message, setMessage] = useState();

  const [descricao, setDescricao] = useState("");

  const addOthers = () => {
    let data = {
      descricao: descricao,
    }
    if (type === "depto") {
      var link = "/depto"
    }
    else {
      link = "/centroCustos"
    }
    axios.post(`${process.env.REACT_APP_REPROGRAFIA_URL}${link}`, data, {
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
        history.push("/deptoCursos")
      }
    })

  }

  const onSubmit = (e) => {
    e.preventDefault();
    addOthers();
  }


  return (
    <>
      <LoginContainer />
      <div className="finishing">
        <form onSubmit={onSubmit}>
          <h2 id="" className="service-subTitle">
            {type === "depto" ? "Departamento" : "Centro de custos"}
          </h2>
          <label className="important">
            <input
              className="input-service"
              name="descricao"
              type="text"
              placeholder=""
              required
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
          </label>
          <h3 className='mensagem'>{message}</h3>
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
          onClick={() => { history.push("/deptoCursos") }}>Voltar</button>
      </div>
    </>
  );
}