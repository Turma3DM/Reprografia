 

<div>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/README.md">Voltar</a></p>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/requirements/README-en.md">English Version</a></p>
</div>

<h3 align="center">📌 Requisitos Funcionais</h3>

<table>
  <tr align="center">
    <th>#</th>
    <th>Requisito</th>
    <th>Descrição</th>
    <th>Tipo</th>
    <th>Prioridade</th>
  </tr>
  <tr align="center">
    <td>1</td>
    <td align="left">Gerencia de usuários</td>
    <td align="left">Usuários administradores da aplicação devem ter a possibilidade de cadastrar, atualizar e deletar outros usuários.</td>
    <td>Funcional</td>
    <td>Obrigatório</td>
  </tr>
  <tr align="left">
    <td>2</td>
    <td align="left">Login</td>
    <td align="left">Após usuários terem um cadastro com todas informações necessárias, os mesmos, conseguem fazer login e logoff da aplicação.</td>
    <td>Funcional</td>
    <td>Obrigatório</td>
  </tr>
    <td>3</td>
     <td align="left">Informações de Usuários</td>
    <td align="left">Após o cadastro realizados corretamente, os usuários podem visualizar e editar suas próprias informações.</td>
    <td>Funcional</td>
    <td>Importante</td>
  </tr>
  </tr>
  <td>4</td>
    <td align="left">Solicitações de Impressão</td>
    <td align="left">O sistema deve cadastrar todos pedidos (requisição) feitas por usuários, onde todos pedidos serão avaliados por usuários administradores.</td>
    <td>Funcional</td>
    <td>Obrigatório</td>
  </tr>
  </tr>
    <td>5</td>
    <td align="left">Histórico de Solicitações</td>
    <td align="left">Os usuários contarão com um histórico de suas próprias solicitações realizadas até o momento.</td>
    <td>Funcional</td>
    <td>Importante</td>
  </tr>
  </tr>
    <td>6</td>
    <td align="left">Gerencia de serviços/pedidos</td>
    <td align="left">Serviços internos fornecidos pela empresa contratada, podem ser cadastrados, alterados e deletados.</td>
    <td>Funcional</td>
    <td>Obrigatório</td>
  </tr>
  </tr>
    <td>7</td>
    <td align="left">Envio de emails</td>
    <td align="left">Para determinadas funcionalidades, como recuperação de senha, realizar um pedido e feedbacks, um email será enviado para o usuário/empresa contratada, com determinadas informações sobre a função utilizada.</td>
    <td>Funcional</td>
    <td>Importante</td>
  </tr>
</table>

<br><br> <h3 align="center">📌 Requisitos Não Funcionais</h3>

<table>
  <tr align="center">
    <th>#</th>
    <th>Requisito</th>
    <th>Descrição</th>
    <th>Tipo</th>
    <th>Prioridade</th>
  </tr>
  <tr align="center">
   <tr>
    <td>1</td>
    <td align="left">Disponibilidade do Sitema</td>
    <td align="left">O sistema deve ter garantida uma disponibilidade maior que 98.05%</td>
    <td>Não Funcional</td>
    <td>Obrigatório</td>
  </tr>
   <tr>
    <td>2</td>
    <td align="left">Sistema multiplataforma</td>
    <td align="left">A compatibilidade do sistemas e todas suas funcionalidades devem ser compatíveis em outros sistemas, como Linux e MacOS.</td>
    <td>Não Funcional</td>
    <td>Importante</td>
  </tr>
  <tr>
    <td>3</td>
    <td align="left">Rotas</td>
    <td align="left">As rotas devem ser autentificadas e seguras para a navegação do usuário durante o período de uso da aplicação.</td>
   <td>Não Funcional</td>
    <td>Obrigatório</td>
  </tr>
    <tr>
    <td>4</td>
    <td align="left">Senhas</td>
    <td align="left">Todas senhas devem ser criptografadas pelo sistema e database.</td>
    <td>Não Funcional</td>
    <td>Obrigatório</td>
  </tr>
  </tr>
    <td>5</td>
    <td align="left">Login (Autentificação)</td>
    <td align="left">Só é possível realizar login caso o usuário seja autenticado no banco de dados.</td>
    <td>Não Funcional</td>
    <td>Obrigatório</td>
  </tr>
  <tr>
    <td>6</td>
    <td align="left">Login (Recuperação)</td>
    <td align="left">Caso o usuário esqueça sua senha, é possível recuperar através do email enviado para recuperação.</td>
    <td>Não Funcional</td>
    <td>Importante</td>
    </tr>
    <tr>
    <td>7</td>
    <td align="left">Serviços</td>
    <td align="left">Todos serviços devem ser delimitados, não podendo ultrapassar o limite disponibilizado pela empresa contratada.</td>
   <td>Não Funcional</td>
    <td>Obrigatório</td>
  </tr>
    <tr>
</table>
