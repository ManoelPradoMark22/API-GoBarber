import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    // mét index utilizado para listagem
    /* Vamos retornar TODOS USUARIOS QUE SEJAM PROVIDERS! */
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
