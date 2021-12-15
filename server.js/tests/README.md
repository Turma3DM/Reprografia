<h2 align="center"> ⚡ Testes ⚡ </h2>

#### [English Version](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/tests/README-en.md)

### Dependências

Para realizar e documentar os testes da nossa API, instalamos as dependências: 

* [Jest](https://jestjs.io/pt-BR/) 
* [SuperTest](https://www.npmjs.com/package/supertest)

Você pode seguir o tutorial do **[Medium](https://medium.com/beelabacademy/testes-automatizados-de-apis-com-jest-supertest-8aa6a96f61d1)**, mas basicamente os instalamos da seguinte forma:

> Execute o comando: `yarn add jest supertest`. Ou caso prefira npm: `npm install jest supertest`

### Como executar os testes

#### Configurando

 * Faça uma cópia do arquivo [`.env.sample`](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/.env.sample) da raiz do projeto, e renomeie esta cópia para `.env.test`.
 * Depois, configure o arquivo de acordo com suas necessidades e preferências.

#### Iniciando os testes

* Após configurado, precisamos criar o banco de dados e inserir seus registros para as constraints. Para isso, execute o comando: `yarn pre-test`.
* Com o banco criado e os registros já inseridos, já podemos executar os testes com o comando: `yarn test`.

**Lembrando que:** 

Setamos no package.json que a cada execução do `yarn test` ele recriasse o banco de dados de teste, executando o `yarn pre-test` antes do comando de teste. Isso é importante pois os testes seguem um ritmo já definido para testar todas as requisições.

Caso queira trocar essa opção, modifique o script de "test" do [package.json](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/package.json)
