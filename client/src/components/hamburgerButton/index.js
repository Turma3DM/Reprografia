import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import managerData from './managerData';
import userData from './userData'
import { IconContext } from 'react-icons';
import axios from 'axios'
import './styles.scss';

function Menu(props) {
  const [sidebar, setSidebar] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [nif, setNif] = useState("");

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/myUser/`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.roles[0].descricao === "admin") {
          setAdmin(true)
        }
        else {
          setAdmin(false)
        }
        if (props.admin) {
          setAdmin(props.admin)
        }

        setNif(result.data.nif)

      })
  }, [props.admin])


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbarH">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <img className="logo" src="../../../assets/img/logo.jpg" alt="logo" />
            {admin ?
              <> {managerData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    {item.path === '/' ?
                      <Link to={item.path} onClick={(e) => e.target.value = localStorage.removeItem("accessToken")} >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                      :
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                        && item.path === 'user/' ?
                        <Link to={item.path + nif}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                        :
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                    }
                  </li>
                );
              })}
              </>
              :
              <> {userData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    {item.path === '/' ?
                      <Link to={item.path} onClick={(e) => e.target.value = localStorage.removeItem("accessToken")} >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                      :
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                        && item.path === 'user/' ?
                        <Link to={item.path + nif}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                        :
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                    }
                  </li>
                );
              })}</>}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
export default Menu;