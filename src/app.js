import express from 'express';
import routes from './routes';

import './database'; // nao preciso passar o index.js pois ele vai pegar automat.

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server; // exportando o server
