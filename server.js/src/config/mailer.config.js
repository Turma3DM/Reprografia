module.exports = {
  smtp: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    service: process.env.MAILER_SERVICE,
    secure: false,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  },
  reproEmail: process.env.MAILER_COMPANY_EMAIL,
  // HOST E PORTA QUE SERÁ ENVIADO NO EMAIL DE RECUPERAÇÃO 
  // (host e porta do front-end - OBS: sem a barra / no final.)
  hostPort: process.env.MAILER_HOST_PORT
}