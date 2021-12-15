import React from 'react';
import './styles/notFound.scss';

function NotFound() {
  return (
    <>
      <div id="not">
        <h1 className="error-title">Error 401 não autorizado!!!</h1>

        <p className="error-text">Você não tem acesso a essa página</p>

        <section className="error-container">
          <span><span>4</span></span>
          <span>0</span>
          <span><span>1</span></span>
        </section>

        <a id="backLogin" href="/">Volte para a página de login</a>
      </div>
    </>
  );
}

export default NotFound;