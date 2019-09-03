import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date); // ou parseInt(), resulta no mesmo

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    // vai retornar as datas disponíveis para o usuário
    const available = schedule.map(time => {
      // dividindo o time em horas (antes de :) e minutos (depois de :)
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          // 1. pegar os horarios depois desse hoario apenas
          isAfter(value, new Date()) &&
          // 2. verificar se o horário já está marcado (se ss, nao ta disponivel)
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      }; // ex: 2019-08-29T00:00:00-03:00
    });

    return res.json(available);
  }
}

export default new AvailableController();
