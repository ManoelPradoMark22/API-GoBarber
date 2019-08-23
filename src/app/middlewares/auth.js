// verificar se o usuario está logado
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
// pega uma fç de callback e transforma em uma q possa utilizar async/await

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  /* retorna o Bearer (antes o espaco) na primeira posicao do array
  e o token (depois do espaco) na segunda posicao do array
  [, token] dessa forma que usamos a desestruturação, descartamos o bearer
  e ficamos somente com o token no array */

  try {
    /* promisify(jwt.verify) retorna uma funcao , por isso
    retornamos essa funcao logo apos entre parenteses, passando os param:
    promisify(jwt.verify)(token, authCongig.secret) */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // console.log(decoded);
    req.userId =
      decoded.id; /* ATENÇÃO! incluindo o id do usuario no req para ser
    usado la no update do usuario! */

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Inválido' });
  }
};
