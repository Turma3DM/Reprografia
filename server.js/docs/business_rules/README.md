<div>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/README.md">Voltar</a></p>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/business_rules/README-en.md">English Version</a></p>
</div>

## Regras de Negócio: 

- Um usuário só poderá solicitar uma reprografia se estiver autenticado (logado).
- Somente um usuário identificado como ADMIN poderá registrar usuários.
- Usuário que não são ADMIN só podem vizualizar as reprografias feitas pela sua própria conta.
- Todos os usuários (sendo ADMIN ou usuário Normal) só podem avaliar os pedidos feitos pela sua própria conta.
- Todos os serviços tem quantidades pré-estabelecidas e quando chegarem a 0, não será possível solicitar a reprografia que contém aquele serviço (exemplo: A3 & Preto e Branco).
- Só serão registrados usuários com NIFS e E-mails diferentes.
- Só poderá ser feito upload de arquivos cuja extensão seja de imagem (.jpeg, .jpg, .png...) para a imagem de perfil de usuário. E para o anexo só serão aceitos arquivos como: .PDF, .DOCX e .XLSX.
- É preciso de dois Serviços da tabela "servicos" para realizar um pedido. E também é necessário que nenhum desses dois serviços estejam com a sua quantidade esgotada ( <= 0).
- Só poderá ser feito um pedido se a multiplicação do número de copias com o número de páginas inseridos pelo usuário for menor (<) que a quantidade dos dois serviços.
- Um pedido só poderá ser avaliado se ele existir e não tiver sido avaliado ainda.
- Um usuário só pode logar se estiver com a sua conta ativada.
- Todo usuário no seu primeiro acesso precisa inserir uma nova senha para a sua conta, atualizando a senha padrão do sistema para usuários criados pela gerência (senai115).


___

#### USUARIO:

Pode:

- Logar;
- Requisitar uma nova senha caso tenha esquecido (será enviado por e-mail);
- Vizualizar suas informações (Perfil de usuário);
- Atualizar suas informações (somente nome, email, telefone e sua imagem de perfil);
- Atualizar sua senha (inserindo sua senha antiga e a nova);
- Solicitar uma reprografia (será enviado para empresa responsável a solicitação com todas as escolhas desse usuário);
- Vizualizar todos os seus pedidos/solicitações de reprografia;
- Enviar um FeedBack sobre a reprografia que solicitou (colocará se Atendeu ou Não Atendeu e suas observações);
- Desativar sua conta.


___

#### Gerente/ADMIN

Pode:

... Todas as permissões de usuário 

 _+_

- Registrar Usuários;
- Vizualizar todos os usuários;
- Vizualizar qualquer outro usuário por Nome, NIF...;
- Atualizar qualquer outro usuário por NIF;
- Ativar ou desativar um usuário;
- Vizualizar todos os Pedidos;
- Vizualizar todos os pedidos por id do pedido, titulo do pedido, pelo nif do usuário que solicitou o pedido...;
- Criar um Serviço;
- Vizualizar todos os serviços;
- Atualizar um serviço;
- Ativar um desativar um Serviço.
