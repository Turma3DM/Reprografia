<div>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/README.md">Voltar</a></p>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/postman/README-en.md">English Version</a></p>
</div>

 ## Índice
 - [O que é Postman](#OQueÉPostman)
     - [Por que usar o Postman](#PorQueUsarOPostman)
     - [Collection](https://github.com/Squad-Back-End/reprography-nodejs/blob/3606d4b28179c114f7f759dc36be8609d7a6b56e/docs/rest_api_client/postman/Reprography%20System.postman_collection.json)
     - [Criando uma Collection](#CriandoUmaCollection)
 - [Importando uma Collection](#ImportandoUmaCollection)

## POSTMAN

### <a name="OQueÉPostman"></a> O que é Postman:


O Postman é uma ferramenta que dá suporte à documentação das requisições feitas pela API. Ele possui ambiente para a documentação, execução de testes de APIs e requisições em geral.

Ao utilizá-lo, você passará a trabalhar com APIs de modo mais eficiente, construindo solicitações rapidamente e, ainda, poderá guardá-las para uso posterior, além de conseguir analisar as respostas enviadas pela API.

Um bom motivo para usar essa ferramenta é que, por meio dela, é possível reduzir drasticamente o tempo necessário para testar e desenvolver APIs.

Em um exemplo prático, imagine que você queira fazer uma solicitação GET para procurar certas informações no nome da empresa.

Se fosse o caso de testar uma solicitação GET sem usar o Postman, você precisaria escrever todo um código para executar a requisição, além de uma interface visual para interagir com essa rotina.

Se fosse concedido, provavelmente você precisaria escrever tudo isso para criar um aplicativo funcional usando essa API, mas todo esse trabalho seria simplesmente para testar a sua funcionalidade, o que de fato, nesse formato, é tedioso e demorado.

### <a name="PorQueUsarOPostman"></a> Por que usar o Postman?

Além de ser um aplicativo gratuito e fácil de aprender, com pouco tempo você já estará enviando seus primeiros requests (solicitações/requisições). No mais, trata-se de uma ferramenta com um amplo suporte para todas as APIs e Schemas.

**Download Postman App:** https://www.postman.com/downloads/?utm_source=postman-home

![image](https://user-images.githubusercontent.com/71888050/142628036-780b4135-ce4b-4602-98fa-02969972ef8b.png)

### <a name="CriandoUmaCollection"></a> Criando uma Collection:

Collection(coleções) é o local onde fica guardado todos os códigos desenvolvidos.

#### 1. Para criar uma collection, basta clicar em Collection:

![image](https://user-images.githubusercontent.com/71888050/142628476-bef75124-d3d1-401d-9e9f-e4f50a182030.png)

#### 2. Coloque um nome e clique em Create:

![image](https://user-images.githubusercontent.com/71888050/142628517-ff8b1253-b4e6-4e25-ac66-0964424f1b13.png)

### Criando uma Requisição

#### 1. Para criar uma requisição, clique em New em seguida em request:

![image](https://user-images.githubusercontent.com/71888050/142628575-a4070117-45e2-4e74-b5b8-ec969ae9495c.png)

#### 2. Nomeie sua requisição, em seguida selecione a collection (Select a collection or folder to save to), e Salve na collection selecionada.

![image](https://user-images.githubusercontent.com/71888050/142628632-c4b5dd99-259b-4d43-bd36-7253558d10f8.png)

#### 3. Em seguida selecione o método HTTP desejado(GET, PUT, POST...)

![image](https://user-images.githubusercontent.com/71888050/142628688-46398c3e-1642-48ff-9f92-36d389ceeed4.png)

### <a name="ImportandoUmaCollection"></a> Importando uma Collection:

#### 1. Você pode importar pela tela inicial

![import6](https://user-images.githubusercontent.com/71890228/142638750-ae4c91fd-1fc0-45f2-9456-d5956a4569d4.png)

#### 2. Agora, basta clicar em "Import" no canto superior esquerdo da tela

![import2](https://user-images.githubusercontent.com/71890228/142635964-49db79fc-86d1-4797-8b3a-d84ccd63217c.png)

#### 3. Clique em "Upload files", ou arraste o seu arquivo que deseja fazer a importação para a área em destaque, depois clique em "Abrir"

Para vizualizar a collection do Postman, [Clique aqui](https://raw.githubusercontent.com/Squad-Back-End/reprography-nodejs/master/docs/rest_api_client/postman/Reprography%20System.postman_collection.json) e depois clique bom botão direito na página e em "salvar como".

Ou utilize a collection já disponível dentro da pasta docs/rest_api_client/postman ao clonar o repositório.

![Postman1](https://user-images.githubusercontent.com/71890228/143041768-34a89193-604f-4a69-8f61-fb2f26cbc214.png)

#### 4. Clique "Import", em seguida aparecerá no canto esquerdo as coleções disponíveis

![Postman2](https://user-images.githubusercontent.com/71890228/143042027-4df6885c-efa9-44e2-9b77-1d4dd80c8235.png)

#### 5. Ao final aparecerá uma coleção com o nome do seu arquivo onde suas requisições estarão disponíveis

![Postman3](https://user-images.githubusercontent.com/71890228/143042764-e395bc87-ccd5-4056-a3ee-71e0dd7fe2f3.png)

Assim terminamos a importação de Collection via Postman.
