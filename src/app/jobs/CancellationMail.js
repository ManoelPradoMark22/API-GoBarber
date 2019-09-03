import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  /* usar o get, qnd importarmos essa class em outro file, vamos poder usar o
  .key e acessar essa propriedade sem chamar o metodo */
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // a tarefa q será executa qnd este processo for executado
    const { appointment } = data;

    // console.log('A fila executou!');

    /* usamos o parseISO no appointment.data para ficar como objeto
    (para nao transformar em string qnd passar para a Queue) */
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new CancellationMail();
