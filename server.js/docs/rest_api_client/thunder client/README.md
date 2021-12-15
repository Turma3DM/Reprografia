<div>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/README.md">Voltar</a></p>
  <p><a href="https://github.com/Squad-Back-End/reprography-nodejs/blob/master/docs/rest_api_client/thunder%20client/README-en.md">English Version</a></p>
</div>

## Índice
 - [O que é Thunder](#OQueÉThunder)
     - [Instalação](#Instalacao)
     - [Como Utilizar](#ComoUtilizar)
 - [Importando Collection](#ImportandoCollectionEEnviroments)


## Thunder

## <a name="OQueÉThunder"></a> O que é Thunder:

No mundo do desenvolvimento Web, o Postman é a ferramenta mais escolhida para realizar testes em API’s. No entanto, depender de uma ferramenta externa pode muitas vezes dificultar o desenvolvimento e testagem. Por essa razão, o Thunder Client foi desenvolvido como uma extensão para o VsCode para centralizar todo esse processo dentro de um só local.

### <a name="Instalacao"></a> Instalação:

#### 1. Como qualquer extensão do Visual Studio Code, a instalação é bem simples.

![image](https://user-images.githubusercontent.com/71888050/142630831-20114e67-5a60-4526-9381-de9b021f5404.png)

### <a name="ComoUtilizar"></a> Como Utilizar:

#### 2. Primeiramente, precisamos de uma API para fazer as chamadas. Para isso, criei uma API bem simples com o Json-Server. Em seguida, vamos clicar no ícone de raio, que acabou de aparecer no VsCode.

![image](https://user-images.githubusercontent.com/71888050/142630988-5974a77d-8a59-4875-b117-cd987faad477.png)

#### 3. Extensão Thunder Client no VSCode
Ao clicar, será aberta uma aba ao lado, nela estarão todas as requisições feitas e um botão para criar uma nova requisição. No meu caso, como ainda não fiz nenhuma requisição, só vejo o botão.

![image](https://user-images.githubusercontent.com/71888050/142631066-fa782919-137e-4b37-81a1-8f893eccad11.png)


#### 4. New Request no Thunder Client 
Agora vamos clicar em New Request. A visão é semelhante a outras clientes HTTP, como o Postman, por isso já estamos familiarizados com a ferramenta e entendemos como ela funciona.

![image](https://user-images.githubusercontent.com/71888050/142631095-6270bc2d-d8e9-48a8-8a3d-f574e3e77a68.png)


#### 5. Thunder Client
Agora, vamos colocar a URL que vai acessar nossa API na barra de busca, selecionar o método que vamos usar e clicar em Send. Feito isso, veremos a seguinte resposta:

![image](https://user-images.githubusercontent.com/71888050/142631127-b8943167-002d-4242-99fb-f915559f5608.png)


#### 6. Inserções no Thunder Client 
Para realizar inserções também é bem simples! Basta selecionar o método POST ao lado e depois clicar em body. Dessa forma, podemos adicionar todas as informações que quereremos que sejam adicionadas.

![image](https://user-images.githubusercontent.com/71888050/142631292-f82521c6-44e8-4861-92b7-e72d9c1c4419.png)


#### 7. Chamadas HTTP no Thunder Client 
Seguindo essa lógica, você é capaz de realizar qualquer chamada HTTP sem maiores problemas, pois o Thunder Client vai suportar tranquilamente e não vai te atrapalhar durante a execução.


## <a name="ImportandoCollectionEEnviroments"></a> Importando Collection

#### 1. Primeiro, clique no logo do Thunder Client em seu Visual Studio Code

![Thunder1](https://user-images.githubusercontent.com/71890228/142860674-22a3d10b-f746-4f91-be92-0fb88129ad06.png)

#### 2. Depois, clique em "Collections", e em seguida em "Import"

![Thunder2](https://user-images.githubusercontent.com/71890228/142863037-bfcdd9f0-006b-4c08-b4de-f3a4469ffb50.png)


#### 3. Agora clique no arquivo que deseja importar, que é a collection do thunder que disponibilizamos aqui: 

[Clique aqui](https://raw.githubusercontent.com/Squad-Back-End/reprography-nodejs/master/docs/rest_api_client/thunder%20client/thunder-collection_Reprography%20System.json) depois clique bom botão direito na página e em "salvar como".

Ou utilize a collection já disponível dentro da pasta docs/rest_api_client/thunder ao clonar o repositório.

![Thunder3](https://user-images.githubusercontent.com/71890228/142861560-08f5bb20-d14f-4a15-8b9f-96756d69a196.png)

#### 4. Pronto, sua Collection foi importada:

![Thunder4](https://user-images.githubusercontent.com/71890228/142863383-568635ee-32ef-4386-ab44-965e88a87c50.png)

Agora você já pode realizar as requisições na sua API! E assim terminamos a importação.

Como importar Collections e Enviroments via Thunder Client feito com o auxilio deste [Tutorial.](https://developers.refinitiv.com/en/article-catalog/article/how-to-test-http-rest-api-easily-with-visual-studio-code---thund)
