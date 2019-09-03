import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// importar os models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// importar as configurações do banco de dados
import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
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
    models
      .map(model => model.init(this.connection))
      .map(
        model => model.associate && model.associate(this.connection.models)
      ); /* somente se o model.associate existir executa o q tem depois do && */
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    }); // gobarber é o nome da base de dados (pode ser qualquer nome)
  }
}

export default new Database();
