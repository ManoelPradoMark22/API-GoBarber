export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // tem q inserir esse campo
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Gobarber <noreply@gobarber.com>',
  },
};
