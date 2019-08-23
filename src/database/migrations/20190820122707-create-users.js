module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // não pode ter emails repetidos
      },
      password_hash: {
        // CRIPTOGRAFADO
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        /* atenção, na nossa app, o usuario pode ser o cliente
      ou o prestador de serviço (dono do salao). Entao o provier
      vai ser FALSE qnd for cliente, e TRUE qnd for prestador do serviço */
        type: Sequelize.BOOLEAN,
        defaultValue: false, // por padrão, todo usuario cliente, depois separa
        allowNull: false,
      },
      created_at: {
        // armazena automaticamente a data de criação de cada registro
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        // armazena automaticamente a data de edição de cada registro
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
