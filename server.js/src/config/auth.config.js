module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : "do-not-save-it-here",
    header: process.env.HEADER_KEY ? process.env.HEADER_KEY : "token",
    saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10
  },
  adminAccount: {
    email: process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL : "admin@senaisp.edu.br",
    pass: process.env.ADMIN_PASS ? process.env.ADMIN_PASS : "admin",
    defaultImage: "src/uploads/user-img/default/usuario.png"
  }
}