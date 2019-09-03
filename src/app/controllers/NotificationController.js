import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    // **check if req.userId is a provider:
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    /* No Mongo nao tem o findAll(), tem o find()
    createdAt fica assim, em cammelcase, e NÃO created_at */
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' }) // ordem decrescente mostrar as ultimas first
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
      /* Com o new:true, depois de atualizar, vai retornar a nova notificação
      atualizada para o usuario */
    );

    return res.json(notification);
  }
}
export default new NotificationController();
