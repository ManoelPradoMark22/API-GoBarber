module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // qual tabela?
      'avatar_id', // qual o nome dessa coluna?
      {
        type: Sequelize.INTEGER, // Integer pq vamos referenciar apenas o id da img
        references: {
          model: 'files',
          key: 'id',
        },
        onUpdate: 'CASCADE', // se o arq for alterado, altere na tabela tb
        onDelete: 'SET NULL', // caso o arq seja deletado na tabela, set como NULL
        allowNull: true,
      }
    );
  },
  /* Todo avatar_id da tabela useeers
        vai ser tambem um id contido na tabela files */
  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
