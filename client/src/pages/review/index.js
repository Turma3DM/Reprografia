import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../../styles/review.scss';
import Header from '../../components/header';
import Menu from '../../components/hamburgerButton';
import SideBar from '../../components/formSideBar';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Review(props) {

  var history = useHistory();

  var { id } = useParams();

  var [feedBack, setFeedBack] = useState();

  var [atendInput, setAtendInput] = useState();

  var [mensagem, setMensagem] = useState();

  const avaliaPost = (e) => {
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_REPROGRAFIA_URL}/rating/` + id, { avaliacao_obs: feedBack, id_avaliacao_pedido: atendInput }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      if (result.data.status !== "error") {
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
        history.push("/myRequests")
      }
      else{
        setMensagem(result.data.message)
      }
    })
  }

  return (
    <>
      <Menu />
      <Header nif={props.nif} />
      <SideBar image={props.image} admin={props.admin} name={props.name} nif={props.nif} />

      <div id="main-container">

        <form id="review-container" onSubmit={avaliaPost}>
          <div id="review-title">
            <h3>Avaliação de Reprografia</h3>
          </div>

          <div id="review-content">
            <div id="feedback-radio">
              <div className="radio">
                <label className="title-review" htmlFor="nao-atendeu">Atendeu</label>
                <Form.Check
                  type="radio"
                  name="radio-option"
                  id="nao-atendeu"
                  className="checkbox-avaliacao"
                  checked={atendInput === 1}
                  onChange={() => {
                    setAtendInput(1)
                  }}
                />
              </div>

              <div className="radio">
                <label className="title-review" htmlFor="superou">Não Atendeu</label>
                <Form.Check
                  type="radio"
                  name="radio-option"
                  id="superou"
                  className="checkbox-avaliacao"
                  checked={atendInput === 2}
                  onChange={() => {
                    setAtendInput(2)
                  }}

                />
              </div>
            </div>

            <div id="feedback-text">
              <textarea placeholder=" digite seu feedback" onChange={(e) => {
                setFeedBack(e.target.value);
              }}></textarea>
            </div>
          </div>
          <div id="button-review">
            <button id="review-button" type="submit"> Enviar Avaliação</button>
          </div>
          <h4>{mensagem}</h4>
        </form>
      </div>
    </>
  );
}

export default Review;
