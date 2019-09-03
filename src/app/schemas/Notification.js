import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      // se a notificação foi lida ou não
      type: Boolean,
      required: true,
      default: false, // inicia a notificao com o padrao de não lida
    },
  },
  {
    /* tb queremos os campos created_at e updated_at por padrao em
    todos os registros */
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
