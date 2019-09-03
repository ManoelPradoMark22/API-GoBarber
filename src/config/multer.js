import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
/* extname retorna qual a extensao, baseado no nome do arquivo ou imagem
resolve percorre um caminho na nossa aplicação */

export default {
  /* aqui poderia armazenar em locais em CDNs (content delivery network) que
  são servidores online feitos para armazenamento de arquivos físicos
  como o Amazon S3 ou o Digital Ocean Spaces.
  Mas nesse caso vamos guardar as imagens dentro dos arquivos da aplicação,
  na pasta tmp/uploads */
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      /* é como vamos formatar o nome do arquiva da nossa imagem
      o cb (callback) é a função que devemos executar passando o nome do arquivo
      (se deu td ok) ou com o erro (se nao deu certo) */
      crypto.randomBytes(16, (err, res) => {
        // se deu erro:
        if (err) return cb(err);

        // se deu tudo certo:
        // primeiro param null pq nao deu erro
        return cb(null, res.toString('hex') + extname(file.originalname));
        // exemplo: ac1cc2b3f4ee.png
      });
    },
  }),
};
