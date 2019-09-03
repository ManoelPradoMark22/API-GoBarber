import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // chmando o init da classe pai Model com super
    /* 1 param refere-se às colunas da database (colocamos, de preferencia,
      as q vao ser inseridas pelo usuario)
      2 param passa o objeto com o sequelize (podia fazer outras configuracoes
        tambem, como mudar o nome da tabela etc) */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // nunca vai existir na database! sé aqui no cod
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /* Hooks sao trechos de código q são executados de forma automatica
    baseado em ações que acontecem no nosso model
    por exemplo, o 'beforSave' -> antes de qualquer usuário ser salvo
    na database, o trecho de código passado vai ser executado de forma
    automatica.
    Recebemos o user como parâmetro e podemos fazer alterações nele */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // se existe
        /* hash de senha sera gerado somente qnd estiver informando um novo
        password para o usuario
        crypt.hash(user.password, numero de seguranca na criptografia: 0-100) */
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id', // na coluna 'avatar_id'
      as: 'avatar', // codinome
    }); /* teremos um id de arquivo armazenado
    dentro da tabela de usuario  */
  }

  checkPassword(password) {
    /* bcrypt.compare retorna true caso as senhas sejam iguais */
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
