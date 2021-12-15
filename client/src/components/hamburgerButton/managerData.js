import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { FaPaste } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';

const managerData = [
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
    title: 'Gerência de usuários',
    path: '/management',
    icon: <FaWrench />,
    cName: 'nav-text'
  },
  {
    title: 'Minhas Requisições',
    path: '/myRequests',
    icon: <FaPaste />,
    cName: 'nav-text'
  },
  {
    title: 'Cursos e Departamentos',
    path: '/deptoCursos',
    icon: <FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'Serviços',
    path: '/services',
    icon: <FaUserCog />,
    cName: 'nav-text'
  },
  {
    title: 'Estatística',
    path: '/statistics',
    icon: <FaChartLine />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/',
    icon: <FaSignOutAlt />,
    cName: 'nav-text'
  }
];

export default managerData;