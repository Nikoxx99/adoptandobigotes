import mysql from 'mysql2/promise';
export default defineNuxtPlugin(async ({ $config: { dbpassword } }) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbpassword,
    database: 'censo_bigotes',
  });
  return {
    provide: {
      mysql: connection
    }
  }
})
