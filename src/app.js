import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database'; // nao preciso passar o index.js pois ele vai pegar automat.

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    /* setando o cors, sem especificar, permite o acesso da nossa api de qualquer
    aplicacao. Pra ambiente de desenvolvimento isso é tranquilo */
    this.server.use(cors());
    /* quando estivermos em ambiente de produção, podemos permitir quando
    aplicacoes desses endereços acessar nossa aplicacao, ai em produção usamos:
     exemplo: this.server.use(cors({ origin: 'https://rocketseat.com.br' })); */
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    /* vamos criar um middleware de tratamento de exceção
    quando um middlware recebe 4 parâmetros, ele é de tratamento de exceções */
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server; // exportando o server
