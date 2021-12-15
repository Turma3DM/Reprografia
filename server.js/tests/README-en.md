<h2 align="center"> ⚡ Tests ⚡ </h2>

#### [Portuguese version](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/tests)

### Dependencies

To perform and document our API tests, we install the dependencies:

* [Jest](https://jestjs.io/pt-BR/) 
* [SuperTest](https://www.npmjs.com/package/supertest)

You can follow the tutorial of the **[Medium](https://medium.com/beelabacademy/testes-automatizados-de-apis-com-jest-supertest-8aa6a96f61d1)**, but basically we installed them as follows:

> Run the command: `yarn add jest supertest`. Or if you prefer npm: `npm install jest supertest`

### How to run tests

#### Configuring

 * Make a copy of the file [`.env.sample`](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/.env.sample) from the root of the project, and rename this copy to `.env.test`.
 * Then configure the file according to your needs and preferences.

#### Starting testing

* Once configured, we need to create the database and enter its records for constraints. To do this, run the command: `yarn pre-test`.
* With the bank created and the records already entered, we can already run the tests with the: `yarn test`.

**Remember:** 

We set in package.json that with each run of the `yarn test` he recreated the test database by running the `yarn pre-test` before the test command. This is important because tests follow a pace already set to test all requests.

If you want to change this option, modify the "test" script of [package.json](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/package.json)
