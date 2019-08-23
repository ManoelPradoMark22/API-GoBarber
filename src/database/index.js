import Sequelize from 'sequelize';

// importar os models
import User from '../app/models/User';

// importar as configurações do banco de dados
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  /* o método init() vai fazer a conexão com a base de dados e carregar
  os nossos models */
  init() {
    this.connection = new Sequelize(
      databaseConfig
    ); /* assim temos a
    conexão com a base de dados nessa variavel this.connection.
    Essa variável é a variavel que esta sendo esperada nos models, no
    método init(). em Users.js tem init(sequelize) , a variavel que
    irá nesse método é justamente o this.conecction daqui */

    // acessando todos os models e os metodos init() deles passando this.connection
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
