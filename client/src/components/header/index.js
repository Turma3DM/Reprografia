import React, { useState, useEffect } from 'react';
import './styles.scss';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router';
import axios from 'axios';


import Logo from '../img/logo';

function Header(props) {

  const [nif, setNif] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      }).then((result) => {
        setNif(result.data.nif)
      })
  }, [nif])

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push('/')
  };

  return (
    <header>
      <Logo />
      <div className="icons">
        <FaHome className="icon" onClick={() => history.push(`/requestForm`)} />
        <FaUserAlt className="icon" onClick={() => history.push(`/user/${nif}`)} />
        <FaSignOutAlt className="icon" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
