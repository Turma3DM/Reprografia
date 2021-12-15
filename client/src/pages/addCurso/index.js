import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addOthers.scss';
import LoginContainer from '../../components/loginContainer';
import Loading from "../../components/loading";
import Swal from 'sweetalert2';

export default function AddCurso() {

  var history = useHistory();

  const [loading, setLoading] = useState();

  const [deptoSelect, setDeptoSelect] = useState({
    list: [],
    status: false
  });

  const [deptoUser, setDeptoUser] = useState();

  const [message, setMessage] = useState();

  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/deptos/enabled=1`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status !== "error") {
          setDeptoSelect({
            list: result.data,
            status: true
          });
        }
        else {
          setMessage(result.data.message)
        }
        setLoading(false);
      })
  }, [])

  const addCurso = () => {

    if (deptoUser === undefined || deptoUser === null || deptoUser === 0) {
      setMessage("Selecione um departamento!")
    }
    else {
      let data = {
        descricao: descricao,
        id_depto: deptoUser
      }
      axios.post(`${process.env.REACT_APP_REPROGRAFIA_URL}/curso`, data, {
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
  }


  const onSubmit = (e) => {
    e.preventDefault();
    addCurso();
  }

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <LoginContainer />
          <div className="finishing">
            <form onSubmit={onSubmit}>
              <h2 id="" className="service-subTitle">
                CURSO
              </h2>
              <h4 className="import-addServices">Onde houver "*" o preenchimento é obrigatório</h4>
              <label className="important">*
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
              <h3 className="input-title">DEPARTAMENTO</h3>
              <select
                className="selectNew"
                id="deptoUser"
                name="deptoUser"
                required
                onChange={(e) => {
                  setDeptoUser(e.target.value);
                }}
              >
                <option
                  value="0"
                  name="null"
                  id="null"
                  defaultValue={deptoUser === "0"}
                >
                  Nenhuma Opção Selecionada
                </option>
                {deptoSelect.status ? <>
                  {deptoSelect.list.map((data) => (
                    <>
                      <option
                        value={data.id_depto}
                        name="AIP"
                        id="AIP"
                        selected={deptoUser === `${data.id_depto}`}
                      >
                        {data.descricao}
                      </option>
                    </>
                  ))}
                </> : <></>}
              </select>
              <h3 className='mensagem'>{message}</h3>
              <input className="nu-send-button" type="submit" value="Enviar"></input>
            </form>
            <button
              className="btn-back-user"
              id="btn"
              onClick={() => { history.push("/deptoCursos") }}>Voltar</button>
          </div>
        </>
      }
    </>
  );
}