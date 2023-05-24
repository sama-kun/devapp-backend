export default () => ({
  port: process.env.PORT,
  db_port: process.env.POSTGRESS_PORT,
  db_name: process.env.POSTGRES_DB,
  db_password: process.env.POSTGRESS_PASSWORD,
  db_user: process.env.POSTGRESS_USER,
  db_host: process.env.POSTGRESS_HOST,

  secret_jwt: process.env.JWT_SECRET_KEY,
  expire_jwt: process.env.JWT_SECRET_EXPIRES,
});
