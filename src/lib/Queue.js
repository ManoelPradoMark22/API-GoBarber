import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /* p cada fila criamos um bee (nossa instancia q conecta com o raids
          e consegue armazenar e recuperar valores do banco de dados) e um
          handle que processa a fila  */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    /* recebe as variaves do contexto do emaiL (por exemplo,
      o appointment) atraves do job e armazena dentro da fila */
    return this.queues[queue].bee.createJob(job).save();
  }

  // processa cada um dos jobs em tempo real
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // queremos ouvir "on()" o evento de 'failed'
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
