import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        provider_id: Sequelize.INTEGER,
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            // true (se o horario ja passou), false (se ainda nao passou)
            return isBefore(this.date, new Date());
          },
        },
        // retorna se o agendamento é cancelável ou não
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            /* se a data atual é anterior a 2 horas do horario de agendamento */
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    /* Como esta tendo um relacionamento duplo com a mesma tabela,
    precisamos sim utilizar os apelidos em cada relacionamento (as: ....) */
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
