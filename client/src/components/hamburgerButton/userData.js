import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';

const userData = [
  {
    title: 'Usuário',
    path: `user/`,
    icon: <FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Solicitar impressão',
    path: '/requestForm',
    icon: <FaTelegram />,
    cName: 'nav-text'
  },
  {
    title: 'Minhas Requisições',
    path: '/myRequests',
    icon: <FaBookReader />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/',
    icon: <FaSignOutAlt />,
    cName: 'nav-text'
  }
];

export default userData;